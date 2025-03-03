import React from 'react'
import { ThemeSwitcher } from './theme-switcher'

function Footer() {
  return (
    <footer className="bg-background p-4 mt-auto border-t mx-auto flex flex-col items-center space-y-2.5">
      <ThemeSwitcher />
       <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ortbri. All rights reserved.</p>
    </footer>
  )
}

export default Footer