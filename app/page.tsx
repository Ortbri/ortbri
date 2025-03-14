import Contact from "@/components/pages/home/Contact";
import Hero from "@/components/pages/home/Hero";
import Interests from "@/components/pages/home/Interests";
import Projects from "@/components/pages/home/Projects";

export default function Home() {
	return (
		<main className=" pt-14 ">
			<Hero />
			<Projects />
			<Interests />
			<Contact />
		</main>
	);
}
