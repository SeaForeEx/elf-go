import styles from './page.module.css';
import { createGift } from "@/app/actions";
import GiftForm from '@/components/forms/GiftForm/GiftForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";

export default async function NewGift({
    searchParams
}: {
    searchParams: Promise<{ personId?: string }>
}) {
    const { personId } = await searchParams
    
    if (!personId) {
        return <div>Person ID is required</div>
    }
    
    const supabase = await createClient()

    const { data: person } = await supabase
        .from('people')
        .select('*')
        .eq('id', personId)
        .single()

    if (!person) {
        return <div>Person not found</div>
    }

    async function handleSubmit(data: { name: string; price: number; status: string }) {
        'use server'
        await createGift(personId!, data)
        redirect(`/person/${personId}`)
    }

    return (
        <div className={styles.container}>
            <h1>Add New Gift for {person.name}</h1>
            <GiftForm
                personId={personId}
                onSubmit={handleSubmit}
            />
        </div>
    )
}