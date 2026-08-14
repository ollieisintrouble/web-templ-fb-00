"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeEvents() {
    const containerRef = useRef<HTMLElement>(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Covers 1. pull over, 2. reveal text/col, 3. scroll down
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        // Initial States
        gsap.set('.events-wrapper', { xPercent: 100, opacity: 0 });
        gsap.set('.events-left-text', { opacity: 0 });
        gsap.set('.events-right-col', { yPercent: 100, opacity: 0 });

        // Phase 1: Pull the entire section over from the right
        tl.to('.events-wrapper', { xPercent: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" });

        // Phase 2: Text fades in, right column pulls up from bottom
        tl.to('.events-left-text', { opacity: 1, duration: 1, ease: "power2.out" }, 1.5);
        tl.to('.events-right-col', { yPercent: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1.5);

        // Phase 3: Scroll the right column content to reveal everything
        tl.to('.events-scroll-wrapper', {
            y: () => {
                const el = document.querySelector('.events-scroll-wrapper') as HTMLElement;
                const parent = document.querySelector('.events-right-col') as HTMLElement;
                if (!el || !parent) return 0;
                // scroll until the bottom of the wrapper aligns with the bottom of the parent
                return -Math.max(0, el.scrollHeight - parent.offsetHeight + 100);
            },
            duration: 3,
            ease: "none"
        }, 3);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full h-screen bg-[#FAF7F2] text-[#131414] overflow-hidden">
            <div className="events-wrapper w-full h-full flex gap-5 px-6 py-12">

                {/* Left Column (Hero Image) */}
                <div className="w-1/2 relative flex flex-col justify-end h-full">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/img/5_events/events-hero.jpg"
                            alt="The Events"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                        {/* Gradient for text readability at bottom */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Text content (hidden initially) */}
                    <div className="events-left-text">
                        <div className="absolute top-6 left-6 z-10">
                            <h2 className="font-camila text-[80px] leading-none tracking-[-4%] text-[#fff6e6]">
                                The<br />Events
                            </h2>
                        </div>
                        <div className="relative z-10 p-8">
                            <p className="font-libre-baskerville text-[#fff6e6] max-w-sm text-sm opacity-90">
                                A special series of evenings, from chamber music <br /> and piano recitals to seasonal tastings.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column (Grid of Events) */}
                <div className="events-right-col w-1/2 h-full overflow-hidden">
                    <div className="events-scroll-wrapper w-full flex gap-5 h-auto">

                        {/* First Sub-column */}
                        <div className="w-full flex flex-col gap-20 pb-20">
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full aspect-4/5 bg-gray-200">
                                    <Image
                                        src="/img/5_events/events-carousel-left-1.jpg"
                                        alt="Eclat Sessions"
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="font-libre-baskerville text-[#131414]">
                                    <h4 className="font-semibold text-base">Eclat Sessions</h4>
                                    <p className="text-sm mt-2">Everyday, 8:00 PM - 9:30 PM</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full aspect-4/5 bg-gray-200">
                                    <Image
                                        src="/img/5_events/events-carousel-left-2.jpg"
                                        alt="Velour Evenings"
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="font-libre-baskerville text-[#131414]">
                                    <h4 className="font-semibold text-base">Velour Evenings</h4>
                                    <p className="text-sm mt-2">Every Sunday, 7:30 PM - 10:30 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Sub-column */}
                        <div className="w-full flex flex-col gap-20 pt-20">
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full aspect-4/5 bg-gray-200">
                                    <Image
                                        src="/img/5_events/events-carousel-right-1.jpg"
                                        alt="Nocturne Cocktail Soiree"
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="font-libre-baskerville text-[#131414]">
                                    <h4 className="font-semibold text-base">Nocturne Cocktail Soiree</h4>
                                    <p className="text-sm mt-2">Every Saturday, 10:00 AM - 10:30 PM</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full aspect-4/5 bg-gray-200">
                                    <Image
                                        src="/img/5_events/events-carousel-right-2.jpg"
                                        alt="Amber Nights"
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="font-libre-baskerville text-[#131414]">
                                    <h4 className="font-semibold text-base">Amber Nights</h4>
                                    <p className="text-sm mt-2">Everyday, 6:00 PM - 10:30 PM</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
