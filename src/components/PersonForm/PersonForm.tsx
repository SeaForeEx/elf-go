'use client'

import { useState } from "react"
import styles from './PersonForm.module.css'
import Link from "next/link"

type PersonFormProps = {
    initialData?: {
        name: string
        hobbies: string | null
    }
    onSubmit: (data: { name: string; hobbies: string}) => Promise<void>
}

export default function PersonForm({
    initialData,
    onSubmit
}: PersonFormProps) {
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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </form>
            <h1>
                <Link href={`/`}>
                    Back to Home
                </Link>
            </h1>
        </>
    )
}
