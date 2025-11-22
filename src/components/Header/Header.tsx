import styles from './Header.module.css'
import LogoutButton from '../auth/LogoutButton/LogoutButton'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProfileButton from '../ProfileButton/ProfileButton'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      return null
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href={'/'}>
                    🎄 ELF GO! - Gift Tracker
                </Link>
            </h1>
            <div className={styles.actions}>
                <ProfileButton />
                <LogoutButton />
            </div>
        </header>
    )
}