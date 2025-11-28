'use client'

import { useRouter } from 'next/navigation'
import styles from './EditButton.module.css'
import PencilIcon from '../icons/PencilIcon'
import { useState } from 'react'

type EditButtonProps = {
    itemType: 'person' | 'gift' | 'group'
    personId?: string
    giftId?: string
    groupId?: string
}

export default function EditButton({ 
    itemType,
    personId,
    giftId,
    groupId 
}: EditButtonProps) {
    const router = useRouter()
    const [showTooltip, setShowTooltip] = useState(false)

    const handleEdit = async () => {
        switch (itemType) {
            case 'person':
                router.push(`/person/${personId}/edit`)
                break
            case 'gift':
                router.push(`/gift/${giftId}/edit`)
                break
            case 'group':
                router.push(`/group/${groupId}/edit`)
                break
            default: 
                router.push('/')
                break
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
                <span className={styles.tooltip}>Edit {itemType}</span>
            )}
        </div>
    )
}
