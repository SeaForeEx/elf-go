'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { ProfileFormData } from "../types/types";

export async function updateProfile(data: ProfileFormData, redirectTo: string) {
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

export async function deleteProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

    if (error) {
        throw new Error(error.message)
    }

    await supabase.auth.signOut()

    revalidatePath('/')
    return { success: true }
}