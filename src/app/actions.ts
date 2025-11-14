'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updatePerson(
    personId: string, 
    data: { name: string; hobbies: string }
    )   
{
    const supabase = await createClient()
    
    const { error } = await supabase
    .from('people')
    .update({
        name: data.name,
        hobbies: data.hobbies
    })
    .eq('id', personId)
    
    if (error) {
    return { success: false, error: error.message }
    }
    
    revalidatePath(`/person/${personId}`)
    revalidatePath('/')
    
    return { success: true }
}

export async function deletePerson(personId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('people')
        .delete()
        .eq('id', personId)

    if (error) {
        return { success: false, error: error.message}
    }

    revalidatePath('/')
    return { success: true }
}

export async function deleteGift(giftId: string, personId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', giftId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/person/${personId}`)
    return { success: true }
}