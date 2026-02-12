import { createGroup } from '@/lib/actions/groups';
import styles from './page.module.css';
import GroupForm from '@/components/forms/GroupForm/GroupForm';
import { GroupFormData } from '@/lib/types/types';

export default function NewGroup() {
    async function handleSubmit(data: GroupFormData) {
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