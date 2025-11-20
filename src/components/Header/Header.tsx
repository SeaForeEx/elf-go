import styles from './Header.module.css'
import LogoutButton from '../auth/LogoutButton/LogoutButton'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      return null
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>🎄 ELF GO! - Gift Tracker</h1>
            <LogoutButton />
        </header>
    )
}