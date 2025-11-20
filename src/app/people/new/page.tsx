import styles from './page.module.css';
import { createPerson } from "@/app/actions";
import PersonForm from '@/components/PersonForm/PersonForm';
import { redirect } from "next/navigation";


export default function NewPerson() {
    async function handleSubmit(data: { name: string; hobbies: string }) {
        'use server'
        const result = await createPerson(data)
        
        if (result.success && result.personId) {
            redirect(`/person/${result.personId}`)
        } else {
            console.error(result.error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Add New Person</h1>
                <PersonForm 
                    onSubmit={handleSubmit}
                />
        </div>
    )
}