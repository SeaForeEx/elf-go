'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './ProfileButton.module.css'
import ProfileIcon from "../icons/ProfileIcon";


export default function ProfileButton() {
    const router = useRouter()

    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button
                onClick={() => router.push('/profile')}
                className={styles.button}
            >
                <ProfileIcon className={styles.icon} />
            </button>
            {showTooltip && (
                <span className={styles.tooltip}>Profile</span>
            )}
        </div>
    )
}