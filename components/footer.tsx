import React from 'react'
import { ThemeSwitcher } from './theme-switcher'
import StravaFooter from './strava/strava-footer'

function Footer() {
  return (
    <footer className="pt-14 pb-4  border-t  w-full flex flex-col  space-y-4 bg-neutral-50 dark:bg-neutral-950 ">
    <StravaFooter />
      <div className="flex flex-col items-center space-y-2.5">
        <ThemeSwitcher />
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ortbri. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer