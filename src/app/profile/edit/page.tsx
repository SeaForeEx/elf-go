import { updateProfile } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/server";
import styles from './page.module.css'
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";
import { ProfileFormData } from "@/lib/types/types";

export default async function EditProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

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