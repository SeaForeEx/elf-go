'use server'

import { createClient } from "@/lib/supabase/server"
import { GroupWithMembers } from "../types/types"
import { User } from "@supabase/supabase-js"


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

export async function getGroup(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: group, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, group, user }
}

export async function getMembers(id: string): Promise<{
    success: boolean
    group: GroupWithMembers | null
    user: User | null
    error?: string
}> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { 
            success: false, 
            error: 'Not authenticated',
            group: null,
            user: null
        }
    }

    const { data: group, error } = await supabase
        .from('groups')
        .select(`
            *,
            people!group_id (*)
        `)
        .eq('id', id)
        .single()

    if (error) {
        return { 
            success: false, 
            error: error.message,
            group: null,
            user: null 
        }
    }

    return { success: true, group, user, error: undefined }
}

export async function getUngroupedPeople() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: people, error } = await supabase
        .from('people')
        .select('id, name')
        .is('group_id', null)
        .order('name')

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, people, user }
}