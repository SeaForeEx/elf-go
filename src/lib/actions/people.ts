'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function createPerson(data: { name: string; hobbies: string; address: string | null; groupId: string | null }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }
    
    const { data: newPerson, error } = await supabase
        .from('people')
        .insert({
            name: data.name,
            hobbies: data.hobbies,
            address: data.address,
            group_id: data.groupId,
            user_id: user.id
        })
        .select()
        .single()
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath('/')
    redirect(`/person/${newPerson.id}`)
}

export async function updatePerson(
    personId: string, 
    data: { name: string; hobbies: string; address: string | null; groupId: string | null }
)   
{
    const supabase = await createClient()
    
    const { error } = await supabase
        .from('people')
        .update({
            name: data.name,
            hobbies: data.hobbies,
            address: data.address,
            group_id: data.groupId
        })
        .eq('id', personId)
    
    if (error) {
        throw new Error(error.message)
    }
    
    revalidatePath(`/person/${personId}`)
    revalidatePath('/')
    redirect(`/person/${personId}`)
}

export async function deletePerson(personId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('people')
        .delete()
        .eq('id', personId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    redirect('/')
}