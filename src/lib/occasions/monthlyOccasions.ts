import { HebrewCalendar } from "@hebcal/core"

const today = new Date()

function getEasterDate(year: number) {
    const f = Math.floor;
    // Computus Algorithm for Gregorian Easter:
    
    // Find Golden Number (position in 19-year Metonic cycle)
    const a = year % 19;
    
    // Calculate Century and Year within the Century
    const b = f(year / 100);
    const c = year % 100;
    
    // Leap year correction for Century
    const d = f(b / 4);
    const e = b % 4;
    
    // Calculate lunar orbit correction
    const g = f((b + 8) / 25);
    const h = f((b - g + 1) / 3);
    
    // Find Paschal Full Moon 
    // First Full Moon after Spring Equinox
    const i = (19 * a + b - d - h + 15) % 30;
    
    // Calculate Day of Week correction
    const j = f(c / 4);
    const k = c % 4;
    
    // How many days from Paschal Full Moon to Sunday
    const l = (32 + 2 * e + 2 * j - i - k) % 7;
    
    // Determine if Easter is in April or May
    const m = f((a + 11 * i + 22 * l) / 451);
    
    // Calculate Easter's Date
    const month = f((i + l + m + 114) / 31);
    const day = ((i + l + m + 114) % 31) + 1;
    
    return new Date(year, month - 1, day);
}

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

    return fathersDay
}

function getThanksgivingDate(year: number) {
    const firstDayNovember = new Date(year, 10, 1).getDay()
    const daysUntilThursday = (4 - firstDayNovember + 7) % 7
    const thanksgiving = new Date(year, 10, 22 + daysUntilThursday)

    return thanksgiving
}

function getChanukahDate(year: number) {
    const events = HebrewCalendar.calendar({
        year: year,
    });

    const hanukkah = events.find(ev => ev.getDesc().startsWith('Chanukah: 1'));

    return hanukkah?.greg();
}

export const monthlyOccasions = [
    {
        date: new Date(today.getFullYear(), 1, 14),
        name: 'Valentine\'s Day',
        emoji: '💝',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 1, 14)) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: getEasterDate(today.getFullYear()),
        name: 'Easter',
        emoji: '🐣',
        daysUntil: Math.ceil((Number(getEasterDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
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
        daysUntil: Math.ceil((Number(getFathersDayDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: new Date(today.getFullYear(), 9, 31),
        name: 'Halloween',
        emoji: '🎃',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 9, 31)) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: getThanksgivingDate(today.getFullYear()),
        name: 'Thanksgiving',
        emoji: '🦃',
        daysUntil: Math.ceil((Number(getThanksgivingDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: getChanukahDate(today.getFullYear()),
        name: 'Chanukah',
        emoji: '🕎',
        daysUntil: Math.ceil((Number(getChanukahDate(today.getFullYear())) - Number(today)) / (1000 * 60 * 60 * 24))
    },
    {
        date: new Date(today.getFullYear(), 11, 25),
        name: 'Christmas',
        emoji: '🎄',
        daysUntil: Math.ceil((Number(new Date(today.getFullYear(), 11, 25)) - Number(today)) / (1000 * 60 * 60 * 24))

    }
]