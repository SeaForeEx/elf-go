import styles from './page.module.css'
import Link from "next/link"
import EditButton from "@/components/EditButton/EditButton"
import DeleteButton from "@/components/DeleteButton/DeleteButton"
import { getGift } from "@/lib/queries/gifts"

export default async function Gift({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    const { gift } = await getGift(id)
    
    const capitalizedGiftStatus = gift.status !== 'not purchased' ? 
        gift.status.charAt(0).toUpperCase() + gift.status.slice(1) :
        'Not Purchased'

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