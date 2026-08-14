"use client"

import HomeHero from "@/lib/ui/sections/HomeHero";
import HomeIntroCuisine from "@/lib/ui/sections/HomeIntroCuisine";
import HomeJourney from "@/lib/ui/sections/HomeJourney";
import HomeSpace from "@/lib/ui/sections/HomeSpace";
import HomeEvents from "@/lib/ui/sections/HomeEvents";
import Footer from "@/lib/ui/sections/Footer";
import LenisProvider from "@/lib/ui/components/LenisProvider";

export default function Home() {
	return (
		<LenisProvider>
			<div className="font-libre-baskerville min-h-screen bg-[#FAF7F2]">
				<main className="block">
					<HomeHero />
					<HomeIntroCuisine />
					<HomeJourney />
					<HomeSpace />
					<HomeEvents />
				</main>
				<Footer />
			</div>
		</LenisProvider>
	);
}
