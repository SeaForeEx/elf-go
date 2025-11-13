import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export default async function Home() {
  const supabase = await createClient()
  
  // READ - Get all people with their gifts
  const { data: people, error } = await supabase
    .from('people')
    .select(`
      *,
      gifts (*)
    `)
    .order('name')
  
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ELF GO - Gift Tracker</h1>
      
      <h2 className={styles.subtitle}>People & Their Gifts</h2>
      {people?.map((person) => (
        <div key={person.id} className={styles.personCard}>
          <h3 className={styles.personName}>{person.name}</h3>
          <p className={styles.hobbies}>
            <strong>Hobbies:</strong> {person.hobbies || 'None listed'}
          </p>
          
          <h4 className={styles.giftsTitle}>Gifts:</h4>
          {person.gifts && person.gifts.length > 0 ? (
            <ul className={styles.giftsList}>
              {person.gifts.map((gift: any) => (
                <li key={gift.id} className={styles.giftItem}>
                  {gift.name} - <em className={styles.giftStatus}>{gift.status}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noGifts}>No gifts yet</p>
          )}
        </div>
      ))}
    </div>
  )
}