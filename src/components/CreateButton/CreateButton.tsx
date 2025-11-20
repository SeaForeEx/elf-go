'use client'

import styles from './CreateButton.module.css'
import { useRouter } from 'next/navigation'

type CreateButtonProps = {
    itemType: 'person' | 'gift'
    personId?: string 
}

export default function CreateButton({ 
    itemType,
    personId
}: CreateButtonProps) {
    const router = useRouter()

    const handleSubmit = async () => {
        if (itemType === 'person') {
            router.push(`/people/new`)
        } else {
            router.push(`/gifts/new?personId=${personId}`)
        }
    }

    return (
        <button 
            onClick={handleSubmit}
            className={styles.createButton}
        >
            New {itemType === 'person' ? 'Person' : 'Gift'}
        </button>
    )
}
