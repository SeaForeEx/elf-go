import styles from './page.module.css'
import LoginForm from "@/components/auth/LoginForm/LoginForm"

export default async function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <LoginForm />
            </div>
        </div>
    )
}