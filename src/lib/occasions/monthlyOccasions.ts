const today = new Date()

export const monthlyOccasions = [
    {
        date: new Date(today.getFullYear(), 1, 14),
        name: 'Valentine\'s Day',
        emoji: '💝',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 1, 14)) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: new Date(today.getFullYear(), 11, 25),
        name: 'Christmas',
        emoji: '🎄',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 11, 25)) - Number(today)) / (1000 * 60 * 60 * 24))

    }
]