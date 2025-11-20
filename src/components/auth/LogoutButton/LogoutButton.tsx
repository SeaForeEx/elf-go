'use client'

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import styles from './LogoutButton.module.css'
import { useState } from "react";
import LogoutIcon from "@/components/icons/LogoutIcon";

export default function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const [showTooltip, setShowTooltip] = useState(false)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button
                onClick={handleLogout}
                className={styles.button}
            >
                <LogoutIcon className={styles.icon} />
            </button>
            {showTooltip && (
                <span className={styles.tooltip}>Logout</span>
            )}
        </div>
    )
}