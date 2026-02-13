import Link from 'next/link'
import styles from './page.module.css'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import EditButton from '@/components/EditButton/EditButton'
import CreateButton from '@/components/CreateButton/CreateButton'
import { Gift, PersonWithGiftsAndGroup } from '@/lib/types/types'
import { getPersonAndGifts } from '@/lib/queries/people'

export default async function Person({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getPersonAndGifts(id)
    
    if (!result.success || !result.person) {
        return <div className={styles.container}>Person not found</div>
    }
    
    const person: PersonWithGiftsAndGroup = result.person

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>
                {person.name}
                <EditButton 
                    itemType='person'
                    personId={person.id} 
                />
                <DeleteButton 
                    itemName={person.name}
                    itemType='person'
                    personId={person.id}
                />
            </h2>
            <h3>
                Hobbies: {' '}
                {person.hobbies || 'No hobbies listed'}
                <br /><br />
                Address: {' '}
                {person.address || 'No address listed'}
                <br /><br />
                Group: {' '}
                {person.group?.name ? (
                    <Link href={`/group/${person.group.id}`} className={styles.groupLink}>
                        {person.group.name}
                    </Link>
                ) : (
                    'Not in a group'
                )}
            </h3>

            <h2 className={styles.subtitle}>
                {person.name}&apos;s Gifts
                <CreateButton 
                    itemType={'gift'}
                    personId={person.id} 
                />
            </h2>

            <div className={styles.statusIndex}>
                <div className={styles.statusItem}>
                    <div className={`${styles.statusDot} ${styles.statusWrapped}`}></div> 
                    <div>Wrapped</div>
                </div>
                <div className={styles.statusItem}>
                    <div className={`${styles.statusDot} ${styles.statusPurchased}`}></div> 
                    <div>Purchased</div>
                </div>
                <div className={styles.statusItem}>
                    <div className={`${styles.statusDot} ${styles.statusNotPurchased}`}></div> 
                    <div>Not Purchased</div>
                </div>
            </div>

            {person.gifts && person.gifts.length > 0 ? (
                <ul className={styles.giftList}>
                    {person.gifts?.map((gift: Gift) => (
                        <li 
                            key={gift.id} 
                            className={`${styles.giftListItem} ${
                                gift.status === 'wrapped' ? styles.giftWrapped :
                                gift.status === 'purchased' ? styles.giftPurchased :
                                styles.giftNotPurchased
                            }`}
                        >
                            <Link href={`/gift/${gift.id}`} className={styles.giftLink}>
                                {gift.name}
                            </Link>
                            <EditButton 
                                itemType='gift'
                                personId={person.id}
                                giftId={gift.id} 
                            />
                            <DeleteButton 
                                itemName={gift.name}
                                itemType='gift'
                                giftId={gift.id}
                                personId={person.id}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noGifts}>No gifts yet</p>
            )
            }
        </div>
    )
}