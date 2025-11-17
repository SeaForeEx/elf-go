'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";


export async function createPerson(data: { name: string; hobbies: string }) {
    const supabase = await createClient()
    
    const { error } = await supabase
        .from('people')
        .insert({
            name: data.name,
            hobbies: data.hobbies
    })
    
    if (error) {
        return { success: false, error: error.message }
    }
    
    revalidatePath('/')
    return { success: true }
}

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
    redirect('/')
}

export async function updateGift(
    giftId: string,
    data: { name: string; status: string }
) 
{
    const supabase = await createClient()

    const { error } = await supabase
    .from('gifts')
    .update({
        name: data.name,
        status: data.status
    })
    .eq('id', giftId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/gift/${giftId}`)
    redirect(`/gift/${giftId}`)
}

export async function deleteGift(giftId: string, personId?: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', giftId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/person/${personId}`)
    redirect(`/person/${personId}`)
}