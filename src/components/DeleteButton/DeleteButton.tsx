'use client'

import { useState } from "react"
import { deletePerson, deleteGift, deleteGroup } from "@/app/actions"
import styles from './DeleteButton.module.css'
import TrashIcon from "../icons/TrashIcon"

type DeleteButtonProps = {
    itemName: string
    itemType: 'person' | 'gift' | 'group'
    giftId?: string
    personId?: string
    groupId?: string
}

export default function DeleteButton({
    itemName,
    itemType,
    giftId,
    personId,
    groupId
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)


    const handleDelete = async () => {
        let confirmMessage

        switch (itemType) {
            case 'person':
                confirmMessage = `Are you sure you want to delete ${itemName} and all their gifts?`
                break
            case 'gift':
                confirmMessage = `Are you sure you want to delete "${itemName}"?`
                break
            case 'group':
                confirmMessage = `Are you sure you want to delete "${itemName}"? (Note: all the people in the group will NOT be deleted.)`
        }

        if(!confirm(confirmMessage)) {
            return
        }

        setIsDeleting(true)

        let result

        switch (itemType) {
            case 'person':
                result = await deletePerson(personId!)
                break
            case 'gift':
                result = await deleteGift(giftId!, personId!)
                break
            case 'group':
                result = await deleteGroup(groupId!)
                break
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
                <span className={styles.tooltip}>Delete {itemType}</span>
            )}
        </div>
    )
}