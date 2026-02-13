import { updatePerson } from "@/lib/actions/people"
import { getPerson } from "@/lib/queries/people"
import { getGroups } from "@/lib/queries/groups"
import PersonForm from "@/components/forms/PersonForm/PersonForm"
import styles from './page.module.css'
import { PersonFormData } from "@/lib/types/types"

export default async function EditPerson({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const { person } = await getPerson(id)
    const { groups } = await getGroups()

    async function handleSubmit(data: PersonFormData) {
        'use server'
        await updatePerson(id, data)
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
                groups={groups || []}
            />
        </div>
    )
}