import { updateGift } from "@/app/actions"
import GiftForm from "@/components/GiftForm/GiftForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function EditGift({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: gift } = await supabase
        .from('gifts')
        .select('*')
        .eq('id', id)
        .single()

    if (!gift) {
        return <div>Gift not found</div>
    }

    async function handleSubmit(data: { name: string, status: string}) {
        'use server'
        await updateGift(id, data)
        redirect(`/person/${id}`)
    }

    return (
        <div>
            <h1>
                Edit Person
            </h1>
            <GiftForm 
                initialData={gift}
                onSubmit={handleSubmit}
            />
        </div>
    )
}