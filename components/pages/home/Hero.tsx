import React from "react";
import Image from "next/image";

/* ---------------------------------- Page ---------------------------------- */
function Hero() {
	return (
		<section className="flex flex-col items-center justify-center h-56 ">
			<div className="flex flex-col items-center justify-center">
				<Image
					src="/notion-brian.png" // Ensure the correct file extension is used
					height={100}
					width={100}
					className="h-24 w-24 rounded-full bg-foreground"
					alt="Brian Notion Icon"
				/>
				<h1 className="font-bold text-5xl color">Brian Ortega</h1>
			</div>
		</section>
	);
}

export default Hero;
