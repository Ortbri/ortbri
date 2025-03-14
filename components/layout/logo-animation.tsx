"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

function LogoAnimation() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by not rendering theme-depenudent content until mounted
	if (!mounted) {
		return (
			<div className="relative h-6 w-6">
				<Image
					src="/o-logo-black.svg"
					alt="Logo"
					fill
					priority
					className="object-contain opacity-0"
				/>
			</div>
		);
	}

	return (
		<div className="relative h-6 w-6">
			{theme === "dark" ? (
				<Image
					src="/o-logo-white.svg"
					alt="Dark mode logo"
					fill
					priority
					className="object-contain opacity-100 transition-all duration-300 hover:scale-110"
				/>
			) : (
				<Image
					src="/o-logo-black.svg"
					alt="Light mode logo"
					fill
					priority
					className="object-contain opacity-100 transition-all duration-300 hover:scale-90"
				/>
			)}
		</div>
	);
}

export default LogoAnimation;
