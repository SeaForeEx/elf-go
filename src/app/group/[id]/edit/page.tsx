import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'
import { updateGroup } from '@/app/actions'
import { redirect } from 'next/navigation'
import GroupForm from '@/components/forms/GroupForm/GroupForm'

export default async function EditGroup({
    params
}: {
    params: Promise<{id: string}>
}) {
    const { id } = await params
    const supabase = await createClient()
    
    const { data: group } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single()

    if (!group) {
        return <div>Group not found</div>
    }

    async function handleSubmit(data: { name: string }) {
        'use server'
        await updateGroup(id, data)
        redirect(`/group/${id}`)
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