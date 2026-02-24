import SignUpForm from '@/components/auth/SignUpForm/SignUpForm'
import styles from './page.module.css'

export default async function SignUpPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <SignUpForm />
            </div>
        </div>
    )
}