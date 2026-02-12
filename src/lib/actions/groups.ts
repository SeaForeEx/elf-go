'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function createGroup(data: { name: string }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const { data: newGroup, error } = await supabase
        .from('groups')
        .insert({
            name: data.name,
            user_id: user.id
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    redirect(`/group/${newGroup.id}`)
}

export async function updateGroup(
    groupId: string,
    data: { name: string }
)
{
    const supabase = await createClient()

    const { error } = await supabase
        .from('groups')
        .update({
            name: data.name
        })
        .eq('id', groupId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/person/${groupId}`)
    revalidatePath('/')
    redirect(`/group/${groupId}`)
}

export async function deleteGroup(groupId: string) {
    const supabase = await createClient()

    const { error } = await supabase    
        .from('groups')
        .delete()
        .eq('id', groupId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/')
    return { success: true }
}

export async function addMembersToGroup(groupId: string, personIds: string[]) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('people')
        .update({ group_id: groupId })
        .in('id', personIds)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/group/${groupId}`)
    redirect(`/group/${groupId}`)
}
