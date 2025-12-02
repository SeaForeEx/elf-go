'use client'

import styles from './UserPlusButton.module.css'
import UserPlusIcon from '../icons/UserPlusIcon'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UserPlusButtonProps = {
    groupId?: string
}

export default function UserPlusButton({ 
    groupId 
}: UserPlusButtonProps) {
    const router = useRouter()
    const [showTooltip, setShowTooltip] = useState(false)

    const handleUserPlus = () => {
        router.push(`/group/${groupId}/add-members`)
    }

    return (
        <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button 
                onClick={handleUserPlus}
                className={styles.editButton}
            >
                <UserPlusIcon className={styles.icon} />
            </button>
            {showTooltip && (
                <span className={styles.tooltip}>Add people</span>
            )}
        </div>
    )
}
