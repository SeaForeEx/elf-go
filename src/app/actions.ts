'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

// PERSON ACTIONS

export async function createPerson(data: { name: string; hobbies: string; groupId: string | null }) {
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
            group_id: data.groupId,
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
    data: { name: string; hobbies: string; groupId: string | null }
)   
{
    const supabase = await createClient()
    
    const { error } = await supabase
        .from('people')
        .update({
            name: data.name,
            hobbies: data.hobbies,
            group_id: data.groupId
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
    data: { name: string; price: number; status: string }
) { 
    const supabase = await createClient()

    const { data: newGift, error } = await supabase
        .from('gifts')
        .insert({
            person_id: personId,
            name: data.name,
            price: data.price,
            status: data.status
        })
        .select()
        .single()

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/person/${personId}`)
    return { success: true }
}

export async function updateGift(
    giftId: string,
    data: { name: string; price: number; status: string }
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('gifts')
        .update({
            name: data.name,
            price: data.price,
            status: data.status
        })
        .eq('id', giftId)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/gift/${giftId}`)
    return { success: true }
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

// GROUP ACTIONS

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
        return { success: false, error: error.message }
    }

    revalidatePath('/')
    return { success: true, groupId: newGroup.id}
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
        return { success: false, error: error.message }
    }

    revalidatePath(`/person/${groupId}`)
    revalidatePath('/')

    return { success: true }
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
    redirect('/')
}

// PROFILE ACTIONS

export async function getProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated'}
    }

    const { data: profile, error } = await supabase 
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, profile }
}

export async function updateProfile(data: { name: string; budget: number }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            name: data.name,
            budget: data.budget,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'id'
        })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/profile')
    return { success: true }
}