import React from "react";

function ProjectCard() {
	return <div className="bg-accent rounded-lg p-4 h-48 w-48" />;
}

/* ---------------------------------- Page ---------------------------------- */
function Projects() {
	return (
		<section className="grid grid-cols-3 gap-4 p-4">
			<div className="flex flex-col items-center">
				<ProjectCard />
				<h1 className="font-bold text-2xl">Project 1</h1>
			</div>
			<div className="flex flex-col items-center">
				<ProjectCard />
				<h1 className="font-bold text-2xl">Project 2</h1>
			</div>
			<div className="flex flex-col items-center">
				<ProjectCard />
				<h1 className="font-bold text-2xl">Project 3</h1>
			</div>
		</section>
	);
}

export default Projects;
