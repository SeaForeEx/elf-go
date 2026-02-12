import styles from './page.module.css';
import { createGift } from '@/lib/actions/gifts';
import GiftForm from '@/components/forms/GiftForm/GiftForm';
import { getPerson } from '@/lib/queries/people';
import { GiftFormData } from '@/lib/types/types';

export default async function NewGift({
    searchParams
}: {
    searchParams: Promise<{ personId?: string }>
}) {
    const { personId } = await searchParams

    if (!personId) {
        return <div className={styles.container}>Missing person ID</div>
    }
    
    const { person } = await getPerson(personId)

    async function handleSubmit(data: GiftFormData) {
        'use server'
        await createGift(personId!, data)
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