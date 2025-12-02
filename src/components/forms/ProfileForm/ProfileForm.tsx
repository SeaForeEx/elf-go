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
    const [budget, setBudget] = useState(initialData?.budget?.toString() || '0')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isSetup = !initialData?.name && initialData?.budget == null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const budgetValue = parseFloat(budget)

        await onSubmit({ 
            name, 
            budget: isNaN(budgetValue) ? 0 : budgetValue
        })
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
                        type="text"
                        value={budget}
                        onChange={(e) => {
                            const value = e.target.value
                            // Allow empty, numbers, and one decimal point
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                setBudget(value)
                            }
                        }}
                        inputMode="decimal"
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

                    {!isSetup && (
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => router.push('/profile')}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </>
    )
}