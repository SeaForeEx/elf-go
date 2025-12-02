import { createGroup } from '@/app/actions';
import styles from './page.module.css';
import GroupForm from '@/components/forms/GroupForm/GroupForm';

export default function NewGroup() {
    async function handleSubmit(data: { name: string }) {
        'use server'
        await createGroup(data)
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