'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { GiftFormData } from "../types/types";

export async function createGift(
    personId: string,
    data: GiftFormData
) { 
    const supabase = await createClient()

    const { data: newGift, error } = await supabase
        .from('gifts')
        .insert({
            person_id: personId,
            name: data.name,
            occasion: data.occasion,
            price: data.price,
            status: data.status
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/person/${personId}`)
    redirect(`/gift/${newGift.id}`)
}

export async function updateGift(
    giftId: string,
    data: GiftFormData
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('gifts')
        .update({
            name: data.name,
            occasion: data.occasion,
            price: data.price,
            status: data.status
        })
        .eq('id', giftId)

    if (error) {
        throw new Error(error.message)
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
        throw new Error(error.message)
    }

    revalidatePath(`/person/${personId}`)
    return { success: true }

}