'use client'

import Link from 'next/link'
import styles from './EditButton.module.css'

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

    const editHref = itemType === 'person'
        ? `/person/${personId}/edit`
        : `/gift/${giftId}/edit`

    return (
        <Link 
            href={editHref}
            className={styles.editButton}
        >
            Edit
        </Link>
    )
}
