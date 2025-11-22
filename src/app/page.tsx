import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './page.module.css'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import EditButton from '@/components/EditButton/EditButton'
import CreateButton from '@/components/CreateButton/CreateButton'

export default async function Home() {
    const supabase = await createClient()
    const { data: { user }} = await supabase.auth.getUser()
  
    const { data: people, error: peopleError } = await supabase
        .from('people')
        .select('id, name')
        .order('name')

    const { data: gifts, error: giftError} = await supabase
        .from('gifts')
        .select('price, status')

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('budget')
        .eq('id', user?.id)
        .single()

    let giftSumActual = 0;
    let giftSumPlanned = 0;

    gifts?.forEach((gift) => {
        if (gift.status === 'purchased' || gift.status === 'wrapped') {
            giftSumActual += gift.price;
        }
        giftSumPlanned += gift.price;
    })

    const remainingActual = profile?.budget - giftSumActual;
    const remainingPlanned = profile?.budget - giftSumPlanned;

    
    if (peopleError) {
        return <div>Error: {peopleError.message}</div>
    }

    if (giftError) {
        return <div>Error: {giftError.message}</div>
    }

    if (profileError) {
        return <div>Error: {profileError.message}</div>
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>
                Remaining Budget
            </h2>

            <div className={styles.budgetContainer}>
                <div className={`${styles.budget} ${styles.budgetActual}`}>
                    <div className={styles.budgetText}>Actual</div>
                    <div className={styles.budgetPrice}>${remainingActual}</div>
                </div>

                <div className={`${styles.budget} ${styles.budgetPlanned}`}>
                    <div className={styles.budgetText}>Planned</div>
                    <div className={styles.budgetPrice}>${remainingPlanned}</div>
                </div>
            </div>

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