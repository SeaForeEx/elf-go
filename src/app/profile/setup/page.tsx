import { updateProfile } from '@/lib/actions/profile';
import styles from './page.module.css'
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";
import { ProfileFormData } from '@/lib/types/types';

export default function ProfileSetup() {
    async function handleSubmit(data: ProfileFormData) {
        'use server'
        await updateProfile(data, '/')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Complete Your Profile</h1>
            <p className={styles.subtitle}>Let&apos;s get started with your Christmas gift tracker!</p>
            <ProfileForm onSubmit={handleSubmit} />
        </div>
    )
}