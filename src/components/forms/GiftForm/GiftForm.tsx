'use client'

import { useState } from "react"
import styles from './GiftForm.module.css'
import { useRouter } from "next/navigation"

type GiftFormProps = {
    personId: string
    initialData?: {
        name: string
        price: number | null
        status: string | null
    }
    onSubmit: (data: { name: string; price: number, status: string }) => Promise<void>
}

export default function GiftForm({
    personId,
    initialData,
    onSubmit
}: GiftFormProps) {
    const router = useRouter();

    const [name, setName] = useState(initialData?.name || '')
    const [price, setPrice] = useState(initialData?.price?.toString() || '0') 
    const [status, setStatus] = useState(initialData?.status || 'not purchased')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ 
            name, 
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