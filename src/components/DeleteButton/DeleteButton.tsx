'use client'

import { useState } from "react"
import { deletePerson, deleteGift } from "@/app/actions"
import styles from './DeleteButton.module.css'

type DeleteButtonProps = {
    itemName: string
    itemType: 'person' | 'gift'
    itemId: string
    personId?: string
    className?: string
}

export default function DeleteButton({
    itemName,
    itemType,
    itemId,
    personId,
    className
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)

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
            result = await deletePerson(itemId)
        } else {
            result = await deleteGift(itemId, personId!)
        }

        if (!result.success) {
            alert(`Error: ${result.error}`)
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${styles.deleteButton} ${className || ''}`}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
