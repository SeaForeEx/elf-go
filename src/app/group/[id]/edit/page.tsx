import styles from './page.module.css'
import { updateGroup } from '@/lib/actions/groups'
import GroupForm from '@/components/forms/GroupForm/GroupForm'
import { getGroup } from '@/lib/queries/groups'
import { GroupFormData } from '@/lib/types/types'

export default async function EditGroup({
    params
}: {
    params: Promise<{id: string}>
}) {
    const { id } = await params
    const { group } = await getGroup(id)

    async function handleSubmit(data: GroupFormData) {
        'use server'
        await updateGroup(id, data)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Edit {group.name}
            </h1>
            <GroupForm 
                groupId={group.id}
                initialData={group}
                onSubmit={handleSubmit}
            />
        </div>
    )
}