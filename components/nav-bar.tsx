'use client';
import React from 'react';
import Link from 'next/link';
import LogoAnimation from './logo-animation';

function NavBar() {
  return (
    <nav className="bg-background fixed z-10 flex w-full items-center justify-between border-b p-5">
      <Link href="/" className="h-6 w-6 text-xl font-bold">
        <LogoAnimation />
      </Link>
      {/* <div className="space-x-4">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/about" className="">
          About
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
      </div> */}
    </nav>
  );
}

export default NavBar;
