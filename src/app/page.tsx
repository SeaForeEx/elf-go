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
        .select('id, name, group_id')
        .order('name')

    const { data: gifts, error: giftError} = await supabase
        .from('gifts')
        .select('price, status')

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('budget')
        .eq('id', user?.id)
        .single()

    const { data: groups, error: groupError } = await supabase
        .from('groups')
        .select('id, name')
        .order('name')

    const hasBudget = profile?.budget != null && profile?.budget > 0
    let remainingActual = 0
    let remainingPlanned = 0

    let giftSumActual = 0
    let giftSumPlanned = 0

    gifts?.forEach((gift) => {
        if (gift.status === 'purchased' || gift.status === 'wrapped') {
            giftSumActual += gift.price;
        }
        giftSumPlanned += gift.price;
    })

    if (hasBudget) {
        remainingActual = Number(profile?.budget - giftSumActual)
        remainingPlanned = Number(profile?.budget - giftSumPlanned)
    }

    const isActualNegative = remainingActual < 0
    const isPlannedNegative = remainingPlanned < 0 
    
    if (peopleError) {
        return <div>Error: {peopleError.message}</div>
    }

    if (giftError) {
        return <div>Error: {giftError.message}</div>
    }

    if (profileError) {
        return <div>Error: {profileError.message}</div>
    }

    if (groupError) {
        return <div>Error: {groupError.message}</div>
    }

    return (
        <div className={styles.container}>

            <h2 className={styles.subtitle}>
                {hasBudget ? 'Remaining Budget' : 'Money Spent'}
            </h2>

            <div className={styles.budgetContainer}>
                <div className={`${styles.budget} ${styles.budgetActual} ${isActualNegative ? styles.budgetNegative : ''}`}>
                    <div className={styles.budgetText}>Actual</div>
                    <div className={styles.budgetPrice}>{hasBudget ? `$${remainingActual.toFixed(2)}` : `$${giftSumActual.toFixed(2)}`}</div>
                </div>

                <div className={`${styles.budget} ${styles.budgetPlanned} ${isPlannedNegative ? styles.budgetNegative : ''}`}>
                    <div className={styles.budgetText}>Planned</div>
                    <div className={styles.budgetPrice}>{hasBudget ? `$${remainingPlanned.toFixed(2)}` : `$${giftSumPlanned.toFixed(2)}`}</div>
                </div>
            </div>

            <h2 className={styles.subtitle}>
                Groups
                <CreateButton itemType={'group'} />
            </h2>

            {groups && groups.length > 0 ? (
                <ul className={styles.peopleList}>
                    {groups?.map((group) => (
                    <li key={group.id} className={styles.personListItem}>
                        <Link href={`/group/${group.id}`} className={styles.personLink}>
                            {group.name}
                        </Link>
                        <EditButton 
                            itemType='group'
                            groupId={group.id} />
                        <DeleteButton 
                            itemName={group.name}
                            itemType='group'
                            groupId={group.id}
                        />
                    </li>
                    ))}
                </ul>
                ) : (
                    <p className={styles.noPeople}>No groups yet</p>
                )
            }

            <h2 className={styles.subtitle}>
                Other People
                <CreateButton itemType={'person'} />
            </h2>

            {people && people.length > 0 ? (
                <ul className={styles.peopleList}>
                    {people
                        ?.filter((person) => !person.group_id)
                        .map((person) => (
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