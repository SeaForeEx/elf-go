'use client'

import { useState } from "react"
import { deletePerson, deleteGift } from "@/app/actions"
import styles from './DeleteButton.module.css'

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
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${styles.deleteButton}`}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
