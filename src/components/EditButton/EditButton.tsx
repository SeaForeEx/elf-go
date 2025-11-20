'use client'

import { useRouter } from 'next/navigation'
import styles from './EditButton.module.css'
import PencilIcon from '../icons/PencilIcon'
import { useState } from 'react'

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
    const [showTooltip, setShowTooltip] = useState(false)

    const handleEdit = async () => {
        if (itemType === 'person') {
            router.push(`/person/${personId}/edit`)
        } else {
            router.push(`/gift/${giftId}/edit`)
        }
    }

    return (
        <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button 
                onClick={handleEdit}
                className={styles.editButton}
            >
                <PencilIcon className={styles.icon} />
            </button>
            {showTooltip && (
                <span className={styles.tooltip}>Edit {itemType === 'person' ? 'person' : 'gift'}</span>
            )}
        </div>
    )
}
