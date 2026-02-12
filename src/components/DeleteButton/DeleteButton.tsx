'use client'

import { useState } from "react"
import { deleteGift } from "@/lib/actions/gifts"
import { deleteGroup } from "@/lib/actions/groups"
import { deletePerson } from "@/lib/actions/people"
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

        try {
            switch (itemType) {
                case 'person':
                    await deletePerson(personId!)
                    break
                case 'gift':
                    await deleteGift(giftId!, personId!)
                    break
                case 'group':
                    await deleteGroup(groupId!)
                    break
            }
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Failed to delete'}`)
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