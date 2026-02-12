'use server'

import { createClient } from "@/lib/supabase/server"

export async function getGroups() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: groups, error } = await supabase
        .from('groups')
        .select('id, name')
        .order('name')

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, groups, user }
}