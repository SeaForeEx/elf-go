import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * MIDDLEWARE: Runs BEFORE every page loads
 * Purpose: Check authentication, profile completeness, and redirect users accordingly
 * - Protects routes from unauthenticated users
 * - Prevents logged-in users from seeing login/signup pages
 * - Ensures users complete their profile before accessing the app
 */
export async function middleware(request: NextRequest) {
    // Create initial response object that will continue to the requested page
    // This gets modified if we need to redirect
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    /**
     * Create Supabase client for middleware
     * This is different from the client/server versions because:
     * - It runs in the Edge Runtime (Vercel's CDN)
     * - It needs special cookie handling for the request/response cycle
     */
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                /**
                 * getAll(): Read all cookies from the incoming request
                 * Supabase needs this to check if user has an auth session
                 */
                getAll() {
                    return request.cookies.getAll()
                },
                
                /**
                 * setAll(): Write cookies to the response
                 * Supabase may need to:
                 * - Refresh the auth token
                 * - Update session cookies
                 * - Clear expired cookies
                 * 
                 * We set cookies in TWO places:
                 * 1. On the request (for this middleware to see them)
                 * 2. On the response (to send back to the browser)
                 */
                setAll(cookiesToSet) {
                    // Set cookies on the REQUEST (so subsequent code can read them)
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    
                    // Recreate the response with updated request cookies
                    response = NextResponse.next({
                        request,
                    })
                    
                    // Set cookies on the RESPONSE (so browser receives them)
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    /**
     * Check authentication status
     * This reads the auth cookie and validates it with Supabase
     * - If valid: user object contains user data
     * - If invalid/missing: user is null
     */
    const { data: { user } } = await supabase.auth.getUser()

    /**
     * PROTECTION RULE #1: Redirect unauthenticated users
     * 
     * If user is NOT logged in AND trying to access a protected page:
     * - Redirect them to /login
     * 
     * We exclude /login and /signup from this check because:
     * - Otherwise they'd be stuck in an infinite redirect loop
     * - These pages SHOULD be accessible without auth
     */
    if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    /**
     * PROTECTION RULE #2: Redirect authenticated users from auth pages
     * 
     * If user IS logged in AND trying to access /login or /signup:
     * - Redirect them to home page (/)
     * 
     * This prevents weird UX like:
     * - Logged-in user seeing the login form
     * - User creating duplicate accounts
     */
    if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    /**
     * PROTECTION RULE #3: Ensure profile is complete
     * 
     * If user IS logged in but hasn't completed their profile:
     * - Check if they have name and budget set
     * - If not, redirect to /profile/setup
     * 
     * We exclude /profile/setup and /profile/edit from this check to avoid redirect loops
     */
    if (user && !request.nextUrl.pathname.startsWith('/profile/setup') && !request.nextUrl.pathname.startsWith('/profile/edit')) {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('name, budget')
            .eq('id', user.id)
            .single()

        // If profile doesn't exist OR is incomplete, redirect to setup
        if (error || !profile || !profile.name || !profile.budget) {
            return NextResponse.redirect(new URL('/profile/setup', request.url))
        }
    }

    /**
     * If no redirects are needed:
     * - Return the response (possibly with updated auth cookies)
     * - Let the page load normally
     */
    return response
}

/**
 * MATCHER CONFIG: Which routes should this middleware run on?
 * 
 * This regex matches ALL routes EXCEPT:
 * - /_next/static/* (Next.js static files like JS/CSS)
 * - /_next/image/* (Next.js optimized images)
 * - /favicon.ico (browser icon)
 * - Any files ending in: .svg, .png, .jpg, .jpeg, .gif, .webp
 * 
 * Why exclude these?
 * - They don't need auth checks
 * - Running middleware on them would slow down your site
 * - Static files can't set cookies anyway
 */
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}