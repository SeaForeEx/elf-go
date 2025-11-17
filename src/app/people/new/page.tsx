import styles from './page.module.css';
import { createPerson } from "@/app/actions";
import PersonForm from '@/components/PersonForm/PersonForm';
import { redirect } from "next/navigation";


export default function NewPerson() {
    async function handleSubmit(data: { name: string; hobbies: string }) {
        'use server'
        await createPerson(data)
        redirect('/')
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