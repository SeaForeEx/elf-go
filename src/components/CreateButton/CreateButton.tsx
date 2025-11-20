'use client'

import { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
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
    const [showTooltip, setShowTooltip] = useState(false)
    

    const handleSubmit = async () => {
        if (itemType === 'person') {
            router.push(`/people/new`)
        } else {
            router.push(`/gifts/new?personId=${personId}`)
        }
    }

    return (
        <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button 
                onClick={handleSubmit}
                className={styles.createButton}
            >
                <PlusIcon className={styles.icon} />
            </button>
            {showTooltip && (
                <span className={styles.tooltip}>Add new {itemType === 'person' ? 'person' : 'gift'}</span>
            )}
        </div>
    )
}
