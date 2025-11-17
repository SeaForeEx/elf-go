'use client'

import Link from 'next/link'
import styles from './CreateButton.module.css'

type CreateButtonProps = {
    itemType: 'person' | 'gift'
}

export default function CreateButton({ 
    itemType,
}: CreateButtonProps) {

    const editHref = itemType === 'person'
        ? `/people/new`
        : `/gifts/new`

    return (
        <Link 
            href={editHref}
            className={styles.createButton}
        >
            New {itemType === 'person' ? 'Person' : 'Gift'}
        </Link>
    )
}
