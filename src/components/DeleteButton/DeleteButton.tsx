'use client'

import { useState } from "react"
import { deletePerson, deleteGift } from "@/app/actions"
import styles from './DeleteButton.module.css'
import TrashIcon from "../icons/TrashIcon"

type DeleteButtonProps = {
    itemName: string
    itemType: 'person' | 'gift'
    giftId?: string
    personId?: string
}

export default function DeleteButton({
    itemName,
    itemType,
    giftId,
    personId,
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)


    const handleDelete = async () => {
        const confirmMessage = itemType === 'person' 
            ? `Are you sure you want to delete ${itemName} and all their gifts?`
            : `Are you sure you want to delete "${itemName}"?`

        if(!confirm(confirmMessage)) {
            return
        }

        setIsDeleting(true)

        let result
        if (itemType === 'person') {
            result = await deletePerson(personId!)
        } else {
            result = await deleteGift(giftId!, personId!)
        }

        if (!result.success) {
            alert(`Error: ${result.error}`)
            setIsDeleting(false)
        }
    }

    return (
        <div 
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={styles.deleteButton}
            >
                <TrashIcon className={styles.icon} />
            </button>
            {showTooltip && !isDeleting && (
                <span className={styles.tooltip}>Delete {itemType === 'person' ? 'person' : 'gift'}</span>
            )}
        </div>
    )
}