'use server'

import { createClient } from "@/lib/supabase/server"

export async function getGifts() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: gifts, error } = await supabase
        .from('gifts')
        .select('price, status')

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, gifts, user }
}