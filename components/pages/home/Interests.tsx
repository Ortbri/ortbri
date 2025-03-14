import React from "react";

function InterestCard({
	title,
}: {
	title: string;
}) {
	return (
		<div className="bg-accent rounded-lg p-4 h-48 w-48 flex items-center justify-center">
			<h2 className="font-bold text-xl">{title}</h2>
		</div>
	);
}

/* ---------------------------------- Page ---------------------------------- */
function Interests() {
	return (
		<section className="p-4">
			<h1 className="text-3xl font-bold mb-4">My Interests</h1>
			<div className="grid grid-cols-2 gap-4">
				<InterestCard title="Coding" />
				<InterestCard title="Traveling" />
				<InterestCard title="Photography" />
				<InterestCard title="Music" />
			</div>
		</section>
	);
}

export default Interests;
