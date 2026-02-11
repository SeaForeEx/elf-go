'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function updateProfile(data: { name: string; budget: number }, redirectTo: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            name: data.name,
            budget: data.budget,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'id'
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    revalidatePath('/profile')
    redirect(redirectTo)
}