import styles from './page.module.css';
import { createPerson } from "@/app/actions";
import PersonForm from '@/components/forms/PersonForm/PersonForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";


export default async function NewPerson() {
    const supabase = await createClient()

    const { data: groups } = await supabase
        .from('groups')
        .select('id, name')
        .order('name')

    async function handleSubmit(data: { name: string; hobbies: string; groupId: string | null }) {
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
                    groups={groups || []} 
                />
        </div>
    )
}