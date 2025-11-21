'use client'

import { useState } from "react"
import styles from './ProfileForm.module.css'
import { useRouter } from "next/navigation"

type ProfileFormProps = {
    initialData?: {
        name: string | null
        budget: number | null
    }
    onSubmit: (data: { name: string; budget: number}) => Promise<void>
}

export default function ProfileForm({
    initialData,
    onSubmit
}: ProfileFormProps) {
    const router = useRouter()

    const [name, setName] = useState(initialData?.name || '')
    const [budget, setBudget] = useState(initialData?.budget || 0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ name, budget })
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
                    <label>Budget:</label>
                    <input 
                        type="number"
                        step="1"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
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
                        onClick={() => router.push('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}