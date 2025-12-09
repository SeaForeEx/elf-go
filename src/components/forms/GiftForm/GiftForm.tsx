'use client'

import { useState } from "react"
import styles from './GiftForm.module.css'
import { useRouter } from "next/navigation"

type GiftFormProps = {
    personId: string
    initialData?: {
        name: string
        occasion: string
        price: number | null
        status: string | null
    }
    onSubmit: (data: { name: string; occasion: string; price: number, status: string }) => Promise<void>
}

export default function GiftForm({
    personId,
    initialData,
    onSubmit
}: GiftFormProps) {
    const router = useRouter();

    const [name, setName] = useState(initialData?.name || '')
    const [occasion, setOccasion] = useState(initialData?.occasion || 'Other')
    const [price, setPrice] = useState(initialData?.price?.toString() || '0') 
    const [status, setStatus] = useState(initialData?.status || 'Not Purchased')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ 
            name, 
            occasion,
            price: parseFloat(price) || 0,
            status 
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
                    <label>Occasion:</label>
                    <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className={styles.select}
                    >
                        <option value="Christmas">Christmas</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Hannukah">Hannukah</option>
                        <option value="Mother's Day">Mother's Day</option>
                        <option value="Father's Day">Father's Day</option>
                        <option value="Valentine's Day">Valentine's Day</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Baby Shower">Baby Shower</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Easter">Easter</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => {
                            const value = e.target.value
                            // Allow empty, numbers, and one decimal point
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                setPrice(value)
                            }
                        }}
                        inputMode="decimal"                    
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