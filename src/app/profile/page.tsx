import styles from './page.module.css'
import Link from "next/link"
import { getProfile } from '@/lib/queries/profile'

export default async function Profile() {
    const { profile, user } = await getProfile()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{profile?.name || 'My profile'}</h1>

            <div className={styles.profileCard}>
                <div className={`${styles.infoRow} ${styles.emailRow}`}>
                    <span className={styles.email}>{user!.email}</span>
                </div>

                <div className={styles.infoRow}>
                    <span className={styles.label}>Budget:</span>
                    <span className={styles.value}>
                        ${profile?.budget ? Number(profile.budget).toFixed(2) : '0.00'}
                    </span>
                </div>

                <Link href="/profile/edit" className={styles.editButton}>
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}