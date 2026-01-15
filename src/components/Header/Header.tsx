import styles from './Header.module.css'
import LogoutButton from '../auth/LogoutButton/LogoutButton'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProfileButton from '../ProfileButton/ProfileButton'
import { monthlyIcons } from '@/lib/icons/monthlyIcons'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const month = new Date().getMonth()

    if (!user) {
      return null
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href={'/'}>
                    {monthlyIcons[month]} ELF GO!
                </Link>
            </h1>
            <div className={styles.actions}>
                <ProfileButton />
                <LogoutButton />
            </div>
        </header>
    )
}