import styles from './page.module.css';
import { createPerson } from '@/lib/actions/people';
import PersonForm from '@/components/forms/PersonForm/PersonForm';
import { PersonFormData } from '@/lib/types/types';
import { getGroups } from '@/lib/queries/groups';

export default async function NewPerson() {
    const { groups } = await getGroups()

    async function handleSubmit(data: PersonFormData) {
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