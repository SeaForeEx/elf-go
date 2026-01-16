'use client'

import { useEffect } from "react"

const monthlyColors = [
    { bg: '#f0f9ff', secondary: '#dbeafe', foreground: '#1e3a8a', primary: '#991b1b' }, // January
    { bg: '#fce7f3', secondary: '#fda4af', foreground: '#831843', primary: '#9333ea' }, // February
    { bg: '#ecfeff', secondary: '#a7f3d0', foreground: '#065f46', primary: '#7c3aed' }, // March
    { bg: '#fefce8', secondary: '#d9f99d', foreground: '#3f6212', primary: '#71717a' }, // April
    { bg: '#faf5ff', secondary: '#d8b4fe', foreground: '#581c87', primary: '#059669' }, // May
    { bg: '#fef3c7', secondary: '#e9d5ff', foreground: '#6b21a8', primary: '#fb923c' }, // June
    { bg: '#fef9c3', secondary: '#fca5a5', foreground: '#991b1b', primary: '#fb7185' }, // July
    { bg: '#fed7aa', secondary: '#d9f99d', foreground: '#65a30d', primary: '#dc2626' }, // August
    { bg: '#dbeafe', secondary: '#60a5fa', foreground: '#1e3a8a', primary: '#dc2626' }, // September
    { bg: '#fce7f3', secondary: '#fbcfe8', foreground: '#831843', primary: '#4c1d95' }, // October
    { bg: '#fef3c7', secondary: '#fbbf24', foreground: '#78350f', primary: '#d97706' }, // November
    { bg: '#99f6e4', secondary: '#065f46', foreground: '#134e4a', primary: '#991b1b' }, // December
]

export default function MonthlyTheme() {
    useEffect(() => {
        const month = new Date().getMonth()
        const colors = monthlyColors[month]

        document.documentElement.style.setProperty('--background', colors.bg)
        document.documentElement.style.setProperty('--background-secondary', colors.secondary)
        document.documentElement.style.setProperty('--foreground', colors.foreground)
        document.documentElement.style.setProperty('--primary', colors.primary)
    }, [])

    return null;
}