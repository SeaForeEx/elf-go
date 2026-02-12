import styles from './page.module.css';
import { createPerson } from '@/lib/actions/people';
import PersonForm from '@/components/forms/PersonForm/PersonForm';
import { createClient } from '@/lib/supabase/server';

export default async function NewPerson() {
    const supabase = await createClient()

    const { data: groups } = await supabase
        .from('groups')
        .select('id, name')
        .order('name')

    async function handleSubmit(data: { name: string; hobbies: string; address: string | null; groupId: string | null }) {
        'use server'
        await createPerson(data)
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