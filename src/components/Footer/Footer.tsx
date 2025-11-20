import { createClient } from '@/lib/supabase/server'
import styles from './Footer.module.css'

export default async function Footer() {
    const today = new Date()
    const christmas = new Date(today.getFullYear(), 11, 25)
    const daysUntil = Math.ceil((Number(christmas) - Number(today)) / (1000 * 60 * 60 * 24))

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      return null
    }

    return (
        <footer className={styles.footer}>
        <p className={styles.countdown}>
            🎅 {daysUntil} days until Christmas! 🎁
        </p>
        </footer>
    )
}