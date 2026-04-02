'use client'

import { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'

export default function SplashScreen() {
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 3000)
    const removeTimer = setTimeout(() => setGone(true), 3600)
    return () => {
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (gone) return null

  const text = 'LOADING'

  return (
    <div className={`${styles.splash} ${hiding ? styles.hiding : ''}`}>
      {/* Bouncing circles */}
      <div className={styles.wrapper}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.shadow} />
        <div className={styles.shadow} />
        <div className={styles.shadow} />
      </div>

      {/* Text loader */}
      <div className={styles.loader}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.text}>
            <span>{text}</span>
          </div>
        ))}
        <div className={styles.line} />
      </div>
    </div>
  )
}
