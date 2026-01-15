import styles from './Header.module.css'
import LogoutButton from '../auth/LogoutButton/LogoutButton'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProfileButton from '../ProfileButton/ProfileButton'
import { monthlyIcons } from '@/lib/icons/monthlyIcons'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    console.log('array', monthlyIcons)
    console.log('icon', monthlyIcons[0])

    if (!user) {
      return null
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href={'/'}>
                    ELF GO!
                </Link>
            </h1>
            <div className={styles.actions}>
                <ProfileButton />
                <LogoutButton />
            </div>
        </header>
    )
}