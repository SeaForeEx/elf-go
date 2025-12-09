'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AddressAutocomplete.module.css'

type AddressAutocompleteProps = {
    onSelect: (data: string) => void
    initialValue?: string
}

export default function AddressAutocomplete({ 
    onSelect,
    initialValue = '' 
}: AddressAutocompleteProps) {
    const [inputValue, setInputValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [userCountry, setUserCountry] = useState('us')  // Add this


    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const justSelectedRef = useRef(false)

    const MIN_ADDRESS_LENGTH = 3
    const DEBOUNCE_DELAY = 300

    // Detect user's country from their IP address
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
        fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setUserCountry(data.country.iso_code.toLowerCase())
            })
            .catch(() => {
                // Default to US if detection fails
                setUserCountry('us')
            })
    }, [])  // Run once on mount

    useEffect(() => {
        // Skip API call until user modifies the initial value
        if (initialValue === inputValue) {
            return
        }

        // Check if user just clicked a suggestion to stop API call
        if (justSelectedRef.current) {
            justSelectedRef.current = false
            return
        }
    
        // Check if the input is too short or empty
        if (!inputValue || inputValue.length < MIN_ADDRESS_LENGTH) {
            setSuggestions([])
            return
        }
    
        // Set up the debounce timer (EVERYTHING IN HERE waits 300ms before running)
        const timeoutId = setTimeout(() => {
            // Build the API request URL
            const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY  
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&format=json&limit=5&bias=countrycode:${userCountry}&apiKey=${apiKey}`
            // Make the API call
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('API call failed')
                    }
                })
                .then(data => {
                    // Extract the formatted addresses from the API response with abbreviated Country Code
                    const addresses = data.results?.map((result: any) => {
                        const countryCode = result.country_code?.toUpperCase() || ''
                        const addressWithoutCountry = result.formatted.replace(/, [^,]+$/, '')
                        return countryCode ? `${addressWithoutCountry}, ${countryCode}` : result.formatted
                    }) || [];
                    
                    // Update state with the suggestions, which triggers re-render and shows dropdown
                    setSuggestions(addresses)
                })
                .catch(err => {
                    console.error(err)
                })
        }, DEBOUNCE_DELAY)
    
        // Save the timeout ID so we can cancel it later if needed
        timeoutRef.current = timeoutId
    
        // Cleanup function - cancels pending timeouts when component unmounts OR when inputValue changes again
        return () => clearTimeout(timeoutId)
    }, [inputValue]) 

    return (
        <div>
            <input
                type="text"
                placeholder="123 Smith Dr."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={styles.suggestion}
                            onClick={() => {
                                if (timeoutRef.current) {
                                    clearTimeout(timeoutRef.current)
                                }
                                justSelectedRef.current = true
                                onSelect(suggestion)
                                setInputValue(suggestion)
                                setSuggestions([])
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
