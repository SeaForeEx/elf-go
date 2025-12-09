import { createClient } from "@/lib/supabase/server"
import styles from './page.module.css'
import Link from "next/link"
import EditButton from "@/components/EditButton/EditButton"
import DeleteButton from "@/components/DeleteButton/DeleteButton"

export default async function Gift({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: gift, error } = await supabase
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
    
    const capitalizedGiftStatus = gift.status !== 'not purchased' ? 
        gift.status.charAt(0).toUpperCase() + gift.status.slice(1) :
        'Not Purchased'

    if (error || !gift) {
        return <div>Gift not found</div>
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>
                {gift.name}
                <EditButton 
                    itemType='gift'
                    giftId={gift.id} 
                />
                <DeleteButton 
                    itemName={gift.name}
                    itemType='gift'
                    giftId={gift.id}
                />
            </h2>
            <h3>
                Price: {' '}
                ${gift.price ? Number(gift.price).toFixed(2) : '0.00'}
                <br /><br />
                Occasion: {' '}
                {gift.occasion}
                <br /><br />
                Status: {' '}
                {capitalizedGiftStatus}
            </h3>
            <h1>
                <Link href={`/person/${gift.people.id}`} className={styles.backLink}>
                    Back to {gift.people.name}
                </Link>
            </h1>
        </div>
    )
}