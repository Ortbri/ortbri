import React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <nav className="bg-background p-5 border-b fixed justify-between flex items-center  w-full z-10">
        <Link href="/" className=" text-xl font-bold">
          Logo
        </Link>
        <div className="space-x-4">
          <Link href="/" className="">
            Home
          </Link>
          <Link href="/about" className="">
            About
          </Link>
          <Link href="/contact" className="">
            Contact
          </Link>
        </div>
    </nav>
  )
}

export default NavBar