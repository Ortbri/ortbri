"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

function LogoAnimation() {
  const { theme } = useTheme()

  return (
    <div className="relative h-6 w-6">
      {theme === 'dark' ? (
        <Image
          src="/o-logo-white.svg"
          alt="Dark mode logo"
          fill
          priority
          className="object-contain"
        />
      ) : (
        <Image
          src="/o-logo-black.svg"
          alt="Light mode logo"
          fill
          priority
          className="object-contain"
        />
      )}
    </div>
  )
}

export default LogoAnimation