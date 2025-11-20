'use client'

import { useState } from "react"
import styles from './GiftForm.module.css'
import { useRouter } from "next/navigation"

type GiftFormProps = {
    personId: string
    personName: string
    initialData?: {
        name: string
        status: string | null
    }
    onSubmit: (data: { name: string; status: string }) => Promise<void>
}

export default function GiftForm({
    personId,
    personName,
    initialData,
    onSubmit
}: GiftFormProps) {
    const router = useRouter();

    const [name, setName] = useState(initialData?.name || '')
    const [status, setStatus] = useState(initialData?.status || 'not purchased')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ name, status })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label>Name:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label>Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        className={styles.select}
                    >
                        <option value="not purchased">Not Purchased</option>
                        <option value="purchased">Purchased</option>
                        <option value="wrapped">Wrapped</option>
                    </select>
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
                        onClick={() => personId ? router.push(`/person/${personId}`) : router.push('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}