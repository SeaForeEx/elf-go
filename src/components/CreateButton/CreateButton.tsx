'use client'

import { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import styles from './CreateButton.module.css'
import { useRouter } from 'next/navigation'

type CreateButtonProps = {
    itemType: 'person' | 'gift' | 'group'
    personId?: string 
}

export default function CreateButton({ 
    itemType,
    personId
}: CreateButtonProps) {
    const router = useRouter()
    const [showTooltip, setShowTooltip] = useState(false)
    

    const handleSubmit = async () => {
        switch(itemType) {
            case 'person':
                router.push(`/person/new`)
                break
            case 'gift':
                router.push(`/gift/new?personId=${personId}`)
                break
            case 'group':
                router.push(`/group/new`)
                break
            default:
                router.push('/')
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
                <span className={styles.tooltip}>Add new {itemType}</span>
            )}
        </div>
    )
}
