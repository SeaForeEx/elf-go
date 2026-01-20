const today = new Date()

function getMothersDayDate(year: number) {
    const mayFirstDay = new Date(year, 4, 1).getDay()
    const daysUntilSunday = mayFirstDay === 0 ? 0 : 7 - mayFirstDay
    const mothersDay = new Date(year, 4, 8 + daysUntilSunday)

    return mothersDay
}

export const monthlyOccasions = [
    {
        date: new Date(today.getFullYear(), 1, 14),
        name: 'Valentine\'s Day',
        emoji: '💝',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 1, 14)) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: getMothersDayDate(today.getFullYear()),
        name: 'Mother\'s Day',
        emoji: '💐',
        daysUntil: Math.ceil((Number(getMothersDayDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: new Date(today.getFullYear(), 11, 25),
        name: 'Christmas',
        emoji: '🎄',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 11, 25)) - Number(today)) / (1000 * 60 * 60 * 24))

    }
]