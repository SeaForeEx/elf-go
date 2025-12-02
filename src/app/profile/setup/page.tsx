import { updateProfile } from "@/app/actions";
import styles from './page.module.css'
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";
import { redirect } from "next/navigation";

export default function ProfileSetup() {
    async function handleSubmit(data: { name: string; budget: number}) {
        'use server'
        const result = await updateProfile(data)

        if (result.success) {
            redirect('/')
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Complete Your Profile</h1>
            <p className={styles.subtitle}>Let's get started with your Christmas gift tracker!</p>
            <ProfileForm onSubmit={handleSubmit} />
        </div>
    )
}