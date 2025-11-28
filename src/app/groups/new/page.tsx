import { createGroup } from '@/app/actions';
import styles from './page.module.css';
import { redirect } from 'next/navigation';
import GroupForm from '@/components/GroupForm/GroupForm';

export default function NewGroup() {
    async function handleSubmit(data: { name: string }) {
        'use server'
        const result = await createGroup(data)

        if (result.success && result.groupId) {
            redirect(`/group/${result.groupId}`)
        } else {
            console.error(result.error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Add New Group</h1>
                <GroupForm 
                    onSubmit={handleSubmit}
                />
        </div>
    )
}