import { createClient } from "@/lib/supabase/server"
import styles from './page.module.css'
import AddMemberForm from "@/components/forms/AddMemberForm/AddMemberForm"


export default async function AddMembers({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: group, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single()

    const { data: people } = await supabase
        .from('people')
        .select('id, name')
        .is('group_id', null)
        .order('name')

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>
                Add Members to {group.name}
            </h2>
            <AddMemberForm
                groupId={group.id}
                people={people || []}
            />
        </div>
    )
}