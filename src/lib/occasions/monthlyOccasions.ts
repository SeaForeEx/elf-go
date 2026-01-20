const today = new Date()

function getMothersDayDate(year: number) {
    const firstDayMay = new Date(year, 4, 1).getDay()
    const daysUntilSunday = firstDayMay === 0 ? 0 : 7 - firstDayMay
    const mothersDay = new Date(year, 4, 8 + daysUntilSunday)

    return mothersDay
}

function getFathersDayDate(year: number) {
    const firstDayJune = new Date(year, 5, 1).getDay()
    const daysUntilSunday = firstDayJune === 0 ? 0 : 7 - firstDayJune
    const fathersDay = new Date(year, 5, 15 + daysUntilSunday)
    console.log("father's day: ", fathersDay)

    return fathersDay
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
        date: getFathersDayDate(today.getFullYear()),
        name: 'Father\'s Day',
        emoji: '🛠️',
        daysUntil: Math.ceil((Number(getMothersDayDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: new Date(today.getFullYear(), 11, 25),
        name: 'Christmas',
        emoji: '🎄',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 11, 25)) - Number(today)) / (1000 * 60 * 60 * 24))

    }
]