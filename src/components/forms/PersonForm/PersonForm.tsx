'use client'

import { useState } from "react"
import styles from './PersonForm.module.css'
import { useRouter } from "next/navigation"
import AddressAutocomplete from "../AddressAutocomplete/AddressAutocomplete"

type PersonFormProps = {
    personId?: string
    initialData?: {
        name: string
        hobbies: string | null
        address: string | null
        group_id: string | null
    }
    groups?: Array<{ id: string; name: string }>
    onSubmit: (data: { name: string; hobbies: string; address: string | null; groupId: string | null }) => Promise<void>
}

export default function PersonForm({
    personId,
    initialData,
    groups,
    onSubmit
}: PersonFormProps) {
    const router = useRouter()
    
    const [name, setName] = useState(initialData?.name || '')
    const [hobbies, setHobbies] = useState(initialData?.hobbies || '')
    const [address, setAddress] = useState(initialData?.address || '')
    const [group, setGroup] = useState(initialData?.group_id || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ 
            name, 
            hobbies,
            address, 
            groupId: group || null
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
                        placeholder="John Smith"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label>Hobbies:</label>
                    <input 
                        type="text"
                        value={hobbies}
                        placeholder="Books, games, etc."
                        onChange={(e) => setHobbies(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label>Address:</label>
                    <AddressAutocomplete 
                        onSelect={(data: string) => setAddress(data)}
                        initialValue={initialData?.address || ''} 
                    />
                </div>

                {groups && groups.length > 0 ? (
                    <div className={styles.field}>
                        <label>Group:</label>
                        <select 
                            value={group} 
                            onChange={(e) => setGroup(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Not in a group</option>
                            {groups?.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : ( 
                    ''
                )}

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
