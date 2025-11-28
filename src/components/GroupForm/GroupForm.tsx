'use client'

import { useRouter } from 'next/navigation'
import styles from './GroupForm.module.css'
import { useState } from 'react'

type GroupFormProps = {
    groupId?: string
    initialData?: {
        name: string
    }
    onSubmit: (data: { name: string }) => Promise<void>
}

export default function GroupForm({
    groupId,
    initialData,
    onSubmit
}: GroupFormProps) {
    const router = useRouter()

    const [name, setName] = useState(initialData?.name || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ name })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label>Name:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>

                    <button 
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => groupId ? router.push(`/group/${groupId}`) : router.push('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}