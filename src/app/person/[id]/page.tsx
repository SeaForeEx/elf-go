import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './page.module.css'
import DeleteButton from '@/components/DeleteButton/DeleteButton'

export default async function Person({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    
    const { data: person, error } = await supabase
        .from('people')
        .select(`
        *,
        gifts (*)
        `)
        .eq('id', id)
        .single()
    
    if (error || !person) {
        return <div>Person not found</div>
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ELF GO! - Gift Tracker</h1>
            
            <h2 className={styles.subtitle}>{person.name}</h2>
            <h3>{person.hobbies || 'No hobbies listed'}</h3>
            <ul className={styles.giftList}>
                {person.gifts?.map((gift: any) => (
                <><li key={gift.id} className={styles.giftLink}>
                        {gift.name} - {gift.status}
                    </li>
                        <DeleteButton 
                            itemName={gift.name}
                            itemType="gift"
                            itemId={gift.id}
                        />
                    </>
                ))}
            </ul>
            <h1>
                <Link href={`/`} className={styles.backLink}>
                    Back to Home
                </Link>
            </h1>
        </div>
    )
}