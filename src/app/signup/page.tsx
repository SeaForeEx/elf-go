import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignUpForm from '@/components/auth/SignUpForm/SignUpForm'
import styles from './page.module.css'

export default async function SignUpPage() {
    const supabase = await createClient()

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <SignUpForm />
            </div>
        </div>
    )
}