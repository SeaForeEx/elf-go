import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './page.module.css'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import EditButton from '@/components/EditButton/EditButton'

export default async function Home() {
    const supabase = await createClient()
  
    const { data: people, error } = await supabase
        .from('people')
        .select('id, name')
        .order('name')
    
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>ELF GO! - Gift Tracker</h1>
        
        <h2 className={styles.subtitle}>People</h2>

        {people && people.length > 0 ? (
            <ul className={styles.peopleList}>
                {people?.map((person) => (
                <li key={person.id} className={styles.personListItem}>
                    <Link href={`/person/${person.id}`} className={styles.personLink}>
                    {person.name}
                    </Link>
                    <EditButton personId={person.id} />
                    <DeleteButton 
                        itemName={person.name}
                        itemType="person"
                        itemId={person.id}
                    />
                </li>
                ))}
            </ul>
        ) : (
            <p className={styles.noPeople}>No people yet</p>
        )
        }
        </div>
    )
}