'use client'

import { useState } from "react"
import styles from './PersonForm.module.css'
import { useRouter } from "next/navigation"

type PersonFormProps = {
    personId?: string
    initialData?: {
        name: string
        hobbies: string | null
    }
    onSubmit: (data: { name: string; hobbies: string}) => Promise<void>
}

export default function PersonForm({
    personId,
    initialData,
    onSubmit
}: PersonFormProps) {
    const router = useRouter()
    
    const [name, setName] = useState(initialData?.name || '')
    const [hobbies, setHobbies] = useState(initialData?.hobbies || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ name, hobbies })
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
                    />
                </div>

                <div className={styles.field}>
                    <label>Hobbies:</label>
                    <input 
                        type="text"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
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
                        onClick={() => personId ? router.push(`/person/${personId}`) : router.push('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}
