import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'
import EditButton from '@/components/EditButton/EditButton'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import Link from 'next/link'

export default async function Group({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: group, error } = await supabase
        .from('groups')
        .select(`
            *,
            people!group_id (*)
        `)
        .eq('id', id)
        .single()

    if (error || !group) {
        return <div>Group not found</div>
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>
                {group.name}
                <EditButton 
                    itemType='group'
                    groupId={group.id} 
                />
                <DeleteButton 
                    itemName={group.name}
                    itemType='group'
                    groupId={group.id}
                />
            </h2>

            {group.people && group.people.length > 0 ? (
                <ul className={styles.groupList}>
                    {group.people?.map((person: any) => (
                        <li 
                            key={person.id} 
                            className={styles.groupListItem}
                        >
                            <Link href={`/person/${person.id}`} className={styles.groupLink}>
                                {person.name}
                            </Link>
                            <EditButton 
                                itemType='person'
                                personId={person.id}
                            />
                            <DeleteButton 
                                itemName={person.name}
                                itemType='person'
                                personId={person.id}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noGroups}>No people yet</p>
            )
            }
 
        </div>
    )
}
