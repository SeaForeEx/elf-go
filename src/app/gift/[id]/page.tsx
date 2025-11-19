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
        .select('*')
        .eq('id', id)
        .single()

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
                Status - {gift.status}
            </h3>
            <h1>
                <Link href={`/`} className={styles.backLink}>
                    Back to Home
                </Link>
            </h1>
        </div>
    )
}