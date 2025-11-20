'use client'

import { useRouter } from 'next/navigation'
import styles from './EditButton.module.css'

type EditButtonProps = {
    itemType: 'person' | 'gift'
    personId?: string
    giftId?: string
}

export default function EditButton({ 
    itemType,
    personId,
    giftId 
}: EditButtonProps) {
    const router = useRouter()

    const handleEdit = async () => {
        if (itemType === 'person') {
            router.push(`/person/${personId}/edit`)
        } else {
            router.push(`/gift/${giftId}/edit`)
        }
    }

    return (
        <button 
            onClick={handleEdit}
            className={styles.editButton}
        >
            Edit
        </button>
    )
}
