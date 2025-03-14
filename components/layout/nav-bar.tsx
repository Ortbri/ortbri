"use client";
import React from "react";
import Link from "next/link";
import LogoAnimation from "./logo-animation";
import { Button } from "../ui/button";

function NavBar() {
	return (
		<nav className="fixed z-10 flex w-full bg-background">
			<div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between p-4">
				<Link href="/" className="h-6 w-6 text-xl font-bold">
					<LogoAnimation />
				</Link>

				{/* list of potential links here */}
				<div className="flex items-center gap-4">
					<Link href={"/"}>
						<Button className="rounded-4xl cursor-pointer" size={"sm"}>
							Contact Brian
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
