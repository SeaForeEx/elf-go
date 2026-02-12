'use client'

import { useRouter } from 'next/navigation'
import styles from './AddMemberForm.module.css'
import { useState } from 'react'
import { addMembersToGroup } from '@/lib/actions/groups'
import { AddMemberFormProps } from '@/lib/types/types'

export default function AddMemberForm({
    groupId,
    people
}: AddMemberFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedPeople, setSelectedPeople] = useState<string[]>([])

    const handleToggle = (personId: string) => {
        setSelectedPeople(prev => 
            prev.includes(personId)
                ? prev.filter(id => id !== personId)
                : [...prev, personId]
        )
    }

    const handleAddMember = async () => {
        setIsSubmitting(true)

        try {
            await addMembersToGroup(groupId!, selectedPeople)
        } catch (error) {
            console.error('Error adding members:', error)
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            {people && people.length > 0 ? (
                <>
                    <div className={styles.personList}>
                        {people.map((person) => (
                            <div
                                key={person.id}
                                className={`${styles.personListItem} 
                                    ${selectedPeople.includes(person.id) ? styles.selected : ''}`}
                                onClick={() => handleToggle(person.id)}
                            >
                                {person.name}
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting || selectedPeople.length === 0}
                            onClick={handleAddMember}
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
                </>
                ) : (
                    <p>No people to add</p>
                )
            }
        </div>
    )
}
