import { monthlyOccasions } from "@/lib/occasions/monthlyOccasions"

export default function NextOccasion() {
    const nextOccasion = monthlyOccasions.reduce((a, b) => {
        return (a.daysUntil < b.daysUntil) ? a : b
    })

    return nextOccasion
}