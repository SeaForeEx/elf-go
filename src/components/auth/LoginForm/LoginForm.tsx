'use client'

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './LoginForm.module.css'
import Link from "next/link";

export default function LoginForm () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🎄 ELF GO!</h1>
            <p className={styles.description}>
                Track your gifts, manage your budget, and make holiday shopping stress-free!            </p>
            <p className={styles.tagline}>
                It's gift giving, simplified.
            </p>

            <form onSubmit={handleLogin} className={styles.form}>
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="your@email.com"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <p className={styles.footer}>
                Don't have an account?{' '}
                <Link href="/signup" className={styles.link}>
                    Sign up
                </Link>
            </p>
        </div>
    )
}