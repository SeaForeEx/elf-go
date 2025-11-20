'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

// PERSON ACTIONS

export async function createPerson(data: { name: string; hobbies: string }) {
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
            user_id: user.id
        })
        .select()
        .single()
    
    if (error) {
        return { success: false, error: error.message }
    }
    
    revalidatePath('/')
    return { success: true, personId: newPerson.id }
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

// GIFT ACTIONS

export async function createGift(
    personId: string,
    data: { name: string; status: string }
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('gifts')
        .insert({
            person_id: personId,
            name: data.name,
            status: data.status
        })

    if (error) {
        return { success: false, error: error.message }
    }
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
    
    return { success: true }
}