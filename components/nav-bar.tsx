'use client';
import React from 'react';
import Link from 'next/link';
import LogoAnimation from './logo-animation';
import { Button } from './ui/button';

function NavBar() {
  return (
    <nav className="fixed z-10 flex w-full">
      <div className='mx-auto flex flex-row items-center  justify-between w-full max-w-7xl p-4'>
        <Link href="/" className="h-6 w-6 text-xl font-bold">
          <LogoAnimation />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/three" className="text-sm font-medium hover:underline">
            Three.js Demo
          </Link>
          
          <Link href="/physics" className="text-sm font-medium hover:underline">
            Falling Cubes
          </Link>
          
          <Link href={'/'}>
            <Button className="rounded-4xl" size={'sm'}>
              Contact Brian
            </Button>
          </Link>
        </div>
  
      </div>
    </nav>
  );
}

export default NavBar;
