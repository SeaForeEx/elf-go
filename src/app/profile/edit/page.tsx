import { updateProfile } from "@/lib/actions/profile";
import styles from './page.module.css'
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";
import { ProfileFormData } from "@/lib/types/types";
import { getProfile } from "@/lib/queries/profile";

export default async function EditProfile() {
    const { profile } = await getProfile()

    async function handleSubmit(data: ProfileFormData) {
        'use server'
        await updateProfile(data, '/profile')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Profile</h1>
            <ProfileForm 
                initialData={profile}
                onSubmit={handleSubmit}
            />
        </div>
    )
}