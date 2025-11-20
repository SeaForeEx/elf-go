import { updateGift } from "@/app/actions"
import GiftForm from "@/components/GiftForm/GiftForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import styles from './page.module.css'

export default async function EditGift({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: gift } = await supabase
        .from('gifts')
        .select(`
            *,
            people (
                name,
                id
            )
        `)
        .eq('id', id)
        .single()

    if (!gift) {
        return <div>Gift not found</div>
    }

    async function handleSubmit(data: { name: string, status: string}) {
        'use server'
        await updateGift(id, data)
        redirect(`/gift/${id}`)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Edit Gift
            </h1>
            <GiftForm 
                personId={gift.people.id}
                personName={gift.people.name}
                initialData={gift}
                onSubmit={handleSubmit}
            />
        </div>
    )
}