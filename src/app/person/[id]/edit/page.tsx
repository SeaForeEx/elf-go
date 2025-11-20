import { updatePerson } from "@/app/actions"
import PersonForm from "@/components/PersonForm/PersonForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import styles from './page.module.css'

export default async function EditPerson({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: person } = await supabase 
        .from('people')
        .select('*')
        .eq('id', id)
        .single()

    if (!person) {
        return <div>Person not found</div>
    }

    async function handleSubmit(data: { name: string, hobbies: string}) {
        'use server'
        await updatePerson(id, data)
        redirect(`/person/${id}`)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Edit {person.name}
            </h1>
            <PersonForm 
                personId={person.id}
                initialData={person}
                onSubmit={handleSubmit}
            />
        </div>
    )
}