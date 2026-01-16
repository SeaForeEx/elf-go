import { createClient } from '@/lib/supabase/server'
import styles from './Footer.module.css'
import NextOccasion from '../NextOccasion/NextOccasion'

export default async function Footer() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const nextOccasion = NextOccasion()

    if (!user) {
      return null
    }

    return (
        <footer className={styles.footer}>
        <p className={styles.countdown}>
            {nextOccasion.daysUntil} days until {nextOccasion.name}! {nextOccasion.emoji}
        </p>
        </footer>
    )
}