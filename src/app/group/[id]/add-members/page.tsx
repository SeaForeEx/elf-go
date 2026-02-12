import styles from './page.module.css'
import AddMemberForm from "@/components/forms/AddMemberForm/AddMemberForm"
import { getGroup, getUngroupedPeople } from "@/lib/queries/groups"


export default async function AddMembers({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params
    const { group } = await getGroup(id)
    const { people } = await getUngroupedPeople()

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