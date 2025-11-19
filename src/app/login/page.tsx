import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import styles from './page.module.css'
import LoginForm from "@/components/auth/LoginForm/LoginForm"

export default async function LoginPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect('/')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <LoginForm />
            </div>
        </div>
    )
}