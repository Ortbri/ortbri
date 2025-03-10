import React from 'react';
import { ThemeSwitcher } from './theme-switcher';
import StravaFooter from './strava/strava-footer';

function Footer() {
  return (
    <footer className="flex w-full flex-col space-y-4 pt-14 pb-4">
    
      <StravaFooter />
      <div className="flex flex-col items-center space-y-2.5">
        <ThemeSwitcher />
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Ortbri. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
