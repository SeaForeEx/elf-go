'use server'

import { createClient } from "@/lib/supabase/server"
import { PersonWithGiftsAndGroup } from "../types/types"
import { User } from "@supabase/supabase-js"

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

export async function getPersonAndGifts(id: string): Promise<{
    success: boolean
    person: PersonWithGiftsAndGroup | null
    user: User | null
    error?: string
}> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { 
            success: false, 
            error: 'Not authenticated',
            person: null,
            user: null
        }
    }

    const { data: person, error } = await supabase
        .from('people')
        .select(`
            *,
            gifts (*),
            groups (id, name)
        `)
        .eq('id', id)
        .single()

        if (error) {
            return { 
                success: false, 
                error: error.message,
                person: null,
                user: null
            }
        }

    return { success: true, person, user, error: undefined }
}