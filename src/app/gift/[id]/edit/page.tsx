import { updateGift } from "@/lib/actions/gifts"
import GiftForm from "@/components/forms/GiftForm/GiftForm"
import styles from './page.module.css'
import { getGift } from "@/lib/queries/gifts"
import { GiftFormData } from "@/lib/types/types"

export default async function EditGift({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const { gift } = await getGift(id)

    async function handleSubmit(data: GiftFormData) {
        'use server'
        await updateGift(id, data)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Edit Gift
            </h1>
            <GiftForm 
                personId={gift.people.id}
                initialData={gift}
                onSubmit={handleSubmit}
            />
        </div>
    )
}