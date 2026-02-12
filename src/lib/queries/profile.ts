'use server'

import { createClient } from "@/lib/supabase/server"

export async function getProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: profile, error } = await supabase 
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, profile, user }
}