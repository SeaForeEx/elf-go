'use client'

import Link from 'next/link'
import styles from './EditButton.module.css'

type EditButtonProps = {
  personId: string
}

export default function EditButton({ personId }: EditButtonProps) {
  return (
    <Link 
      href={`/person/${personId}/edit`}
      className={styles.editButton}
    >
      Edit
    </Link>
  )
}
