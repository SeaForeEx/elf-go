import { updateProfile } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import styles from './page.module.css'
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";

export default async function EditProfile() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

    async function handleSubmit(data: { name: string; budget: number }) {
        'use server'
        const result = await updateProfile(data)

        if (result.success) {
            redirect('/profile')
        }
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