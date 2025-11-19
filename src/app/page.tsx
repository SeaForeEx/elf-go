import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './page.module.css'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import EditButton from '@/components/EditButton/EditButton'
import CreateButton from '@/components/CreateButton/CreateButton'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton/LogoutButton'

export default async function Home() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
  
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
        <LogoutButton />
        
        <h2 className={styles.subtitle}>
            People
            <CreateButton itemType={'person'} />
        </h2>

        {people && people.length > 0 ? (
            <ul className={styles.peopleList}>
                {people?.map((person) => (
                <li key={person.id} className={styles.personListItem}>
                    <Link href={`/person/${person.id}`} className={styles.personLink}>
                    {person.name}
                    </Link>
                    <EditButton 
                        itemType='person'
                        personId={person.id} />
                    <DeleteButton 
                        itemName={person.name}
                        itemType='person'
                        personId={person.id}
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