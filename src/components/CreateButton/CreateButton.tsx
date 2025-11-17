'use client'

import Link from 'next/link'
import styles from './CreateButton.module.css'

type CreateButtonProps = {
    itemType: 'person' | 'gift'
    personId?: string 
}

export default function CreateButton({ 
    itemType,
    personId
}: CreateButtonProps) {

    const editHref = itemType === 'person'
        ? `/people/new`
        : `/gifts/new?personId=${personId}`

    return (
        <Link 
            href={editHref}
            className={styles.createButton}
        >
            New {itemType === 'person' ? 'Person' : 'Gift'}
        </Link>
    )
}
