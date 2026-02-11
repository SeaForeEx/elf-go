// Database types matching your Supabase schema

export type Person = {
    id: string
    name: string
    hobbies: string
    address: string | null
    group_id: string | null
    user_id: string
}

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

export type Profile = {
    id: string
    name: string
    budget: number
    created_at: string
    updated_at: string
}

// Relation types (with joins)
export type PersonWithGifts = Person & {
    gifts: Gift[]
}

export type GroupWithMembers = Group & {
    people: Person[]
}

// Form data types (what you pass to actions)
export type PersonFormData = {
    name: string
    hobbies: string
    address: string | null
    groupId: string | null
}

export type GiftFormData = {
    name: string
    occasion: string
    price: number
    status: string
}

export type GroupFormData = {
    name: string
}

export type ProfileFormData = {
    name: string
    budget: number
}