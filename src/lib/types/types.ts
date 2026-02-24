// Database types from Supabase schema
export type Gift = {
    id: string
    person_id: string
    name: string
    occasion: string
    price: number
    status: string
}

export type Group = {
    id: string
    name: string
    user_id: string
}

export type Member = {
    id: string
    name: string
}

export type Person = {
    id: string
    name: string
    hobbies: string
    address: string | null
    group_id: string | null
    user_id: string
}

export type Profile = {
    id: string
    name: string
    budget: number
    created_at: string
    updated_at: string
}

// Relation types (with joins)
export type GroupWithMembers = Group & {
    people: Member[]
}

export type PersonWithGiftsAndGroup = Person & {
    gifts: Gift[]
    group: Group | null
}

// Form data types (what you pass to actions)
export type GiftFormData = {
    name: string
    occasion: string
    price: number
    status: string
}

export type GroupFormData = {
    name: string
}

export type PersonFormData = {
    name: string
    hobbies: string
    address: string | null
    groupId: string | null
}

export type ProfileFormData = {
    name: string
    budget: number
}

// Form Prop types
export type AddMemberFormProps = {
    groupId?: string
    people: Member[]
}

export type GiftFormProps = {
    personId: string
    initialData?: {
        name: string
        occasion: string
        price: number | null
        status: string | null
    }
    onSubmit: (data: GiftFormData) => Promise<void>
}

export type GroupFormProps = {
    groupId?: string
    initialData?: {
        name: string
    }
    onSubmit: (data: GroupFormData) => Promise<void>
}

export type PersonFormProps = {
    personId?: string
    initialData?: {
        name: string
        hobbies: string | null
        address: string | null
        group_id: string | null
    }
    groups?: Array<{ id: string; name: string }>
    onSubmit: (data: PersonFormData) => Promise<void>
}

export type ProfileFormProps = {
    initialData?: {
        name: string | null
        budget: number | null
    }
    onSubmit: (data: ProfileFormData) => Promise<void>
}

// Button Prop Types
export type CreateButtonProps = {
    itemType: 'person' | 'gift' | 'group'
    personId?: string 
}

export type DeleteButtonProps = {
    itemName: string
    itemType: 'person' | 'gift' | 'group' | 'profile'
    giftId?: string
    personId?: string
    groupId?: string
    profileId?: string
}

export type EditButtonProps = {
    itemType: 'person' | 'gift' | 'group' | 'profile'
    personId?: string
    giftId?: string
    groupId?: string
    profileId?: string
}
