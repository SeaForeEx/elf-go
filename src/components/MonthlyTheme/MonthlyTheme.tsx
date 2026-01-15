'use client'

import { useEffect } from "react"

const monthlyColors = [
    { bg: '#f0f9ff', secondary: '#dbeafe', foreground: '#1e3a8a', primary: '#991b1b', primaryHover: '#7f1d1d' }, // January - Light Blue/White with Garnet accent
    { bg: '#fce7f3', secondary: '#fda4af', foreground: '#831843', primary: '#9333ea', primaryHover: '#7e22ce' }, // February - Pink/Red with Amethyst accent
    { bg: '#ecfeff', secondary: '#a7f3d0', foreground: '#065f46', primary: '#7c3aed', primaryHover: '#6d28d9' }, // March - Aquamarine/Emerald with Purple accent
    { bg: '#fefce8', secondary: '#d9f99d', foreground: '#3f6212', primary: '#71717a', primaryHover: '#52525b' }, // April - Pale Yellow/Grass Green with Silver accent
    { bg: '#faf5ff', secondary: '#d8b4fe', foreground: '#581c87', primary: '#059669', primaryHover: '#047857' }, // May - Cream/Lilac with Emerald accent
    { bg: '#fef3c7', secondary: '#e9d5ff', foreground: '#6b21a8', primary: '#fb923c', primaryHover: '#f97316' }, // June - Pearl/Light Purple with Pale Orange
    { bg: '#fef9c3', secondary: '#fca5a5', foreground: '#991b1b', primary: '#fb7185', primaryHover: '#f43f5e' }, // July - Yellow/Coral with Ruby accent
    { bg: '#fed7aa', secondary: '#d9f99d', foreground: '#65a30d', primary: '#dc2626', primaryHover: '#b91c1c' }, // August - Orange/Light Green with Burnt Red
    { bg: '#dbeafe', secondary: '#60a5fa', foreground: '#1e3a8a', primary: '#dc2626', primaryHover: '#b91c1c' }, // September - Bright Blue/Sapphire with Rust
    { bg: '#fce7f3', secondary: '#fbcfe8', foreground: '#831843', primary: '#4c1d95', primaryHover: '#3b0764' }, // October - Pink/Opal with Indigo accent
    { bg: '#fef3c7', secondary: '#fbbf24', foreground: '#78350f', primary: '#d97706', primaryHover: '#b45309' }, // November - Yellow/Gold with Brown accent
    { bg: '#99f6e4', secondary: '#065f46', foreground: '#134e4a', primary: '#991b1b', primaryHover: '#7f1d1d' }, // December - Turquoise/Forest Green with Dark Red
]

export default function MonthlyTheme() {
    useEffect(() => {
        const month = new Date().getMonth()
        const colors = monthlyColors[month]

        document.documentElement.style.setProperty('--background', colors.bg)
        document.documentElement.style.setProperty('--background-secondary', colors.secondary)
        document.documentElement.style.setProperty('--foreground', colors.foreground)
        document.documentElement.style.setProperty('--primary', colors.primary)
        document.documentElement.style.setProperty('--primary-hover', colors.primaryHover)
    }, [])

    return null;
}