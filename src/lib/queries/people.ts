'use server'

import { createClient } from "@/lib/supabase/server"

export async function getPeople() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: people, error } = await supabase
        .from('people')
        .select('id, name, group_id')
        .order('name')

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, people, user }
}

export async function getPerson(personId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    const { data: person, error } = await supabase
        .from('people')
        .select('*')
        .eq('id', personId)
        .single()

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, person, user }
}