"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const spaceItems = [
    {
        title: "Main Dining Room",
        subtitle: "56 seats | 521 m²",
        image: "/img/4_space/space-dining-room.jpg"
    },
    {
        title: "Kitchen Area",
        subtitle: "4 chefs & 16 staff | 124 m²",
        image: "/img/4_space/space-kitchen.jpg"
    },
    {
        title: "Bar Lounge",
        subtitle: "16 seats | 88 m²",
        image: "/img/4_space/space-bar.jpg"
    }
];

export default function HomeSpace() {
    const containerRef = useRef<HTMLElement>(null);
    const currentIndex = useRef(0);
    const isAnimating = useRef(false);

    gsap.registerPlugin(ScrollTrigger);

    const { contextSafe } = useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: true,
            }
        });

        // Ensure space content is hidden initially
        gsap.set('.space-content', { opacity: 0 });

        // 1. Background Pull Down
        tl.to('.space-transition-bg', { scaleY: 1, duration: 1, ease: "power2.inOut" });

        // 2. Reveal content underneath (invisible because bg is on top)
        tl.set('.space-content', { opacity: 1 });

        // 3. Text Appears
        tl.to('.space-transition-text', { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        // 4. Text Disappears (with a small delay before starting)
        tl.to('.space-transition-text', { opacity: 0, y: -20, duration: 1, ease: "power2.in" }, "+=0.5");

        // 5. Background Pulls Up
        tl.to('.space-transition-bg', { scaleY: 0, duration: 1, ease: "power2.inOut" });

        // 6. Add a pause so it stays on this space section a bit before unpinning
        tl.to({}, { duration: 4 });

        // Initialize carousel positions
        gsap.set('.carousel-item', { opacity: 0, y: 120 });
        gsap.set('.carousel-item-0', { opacity: 1, y: 0 }); // Active
        gsap.set('.carousel-item-1', { opacity: 0.4, y: 80 }); // Next
        gsap.set('.carousel-item-2', { opacity: 0.4, y: -80 }); // Prev

        // Initialize images
        gsap.set('.bg-img', { yPercent: 100 });
        gsap.set('.bg-img-0', { yPercent: 0 });

        // Initialize subtitles
        gsap.set('.subtitle-0', { opacity: 1, height: 24, marginTop: 8 });
        gsap.set('.subtitle-1, .subtitle-2', { opacity: 0, height: 0, marginTop: 0 });

    }, { scope: containerRef });

    const handleNext = contextSafe(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const curr = currentIndex.current;
        const next = (curr + 1) % 3;
        const prev = (curr + 2) % 3;

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndex.current = next;
                isAnimating.current = false;
            }
        });

        // Background transition: always pull up
        tl.to(`.bg-img-${curr}`, { yPercent: -100, duration: 1, ease: "power2.inOut" }, 0);
        tl.set(`.bg-img-${next}`, { yPercent: 100 }, 0);
        tl.to(`.bg-img-${next}`, { yPercent: 0, duration: 1, ease: "power2.inOut" }, 0);

        // Carousel items
        // oldCurr -> prev slot (move up)
        tl.to(`.carousel-item-${curr}`, { y: -80, opacity: 0.4, duration: 1, ease: "power2.inOut" }, 0);
        tl.to(`.subtitle-${curr}`, { opacity: 0, height: 0, marginTop: 0, duration: 0.6, ease: "power2.inOut" }, 0);

        // oldNext -> curr slot (move up to center)
        tl.to(`.carousel-item-${next}`, { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, 0);
        tl.to(`.subtitle-${next}`, { opacity: 1, height: 24, marginTop: 8, duration: 0.6, ease: "power2.inOut" }, 0.4);

        // oldPrev -> next slot (move up, fade out, teleport down, move up to next slot)
        tl.to(`.carousel-item-${prev}`, { y: -120, opacity: 0, duration: 0.4, ease: "power2.in" }, 0);
        tl.set(`.carousel-item-${prev}`, { y: 120 }, 0.4);
        tl.to(`.carousel-item-${prev}`, { y: 80, opacity: 0.4, duration: 0.6, ease: "power2.out" }, 0.4);
    });

    const handlePrev = contextSafe(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const curr = currentIndex.current;
        const prev = (curr + 2) % 3;
        const next = (curr + 1) % 3;

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndex.current = prev;
                isAnimating.current = false;
            }
        });

        // Background transition: always pull up
        tl.to(`.bg-img-${curr}`, { yPercent: -100, duration: 1, ease: "power2.inOut" }, 0);
        tl.set(`.bg-img-${prev}`, { yPercent: 100 }, 0);
        tl.to(`.bg-img-${prev}`, { yPercent: 0, duration: 1, ease: "power2.inOut" }, 0);

        // Carousel items
        // oldCurr -> next slot (move down)
        tl.to(`.carousel-item-${curr}`, { y: 80, opacity: 0.4, duration: 1, ease: "power2.inOut" }, 0);
        tl.to(`.subtitle-${curr}`, { opacity: 0, height: 0, marginTop: 0, duration: 0.6, ease: "power2.inOut" }, 0);

        // oldPrev -> curr slot (move down to center)
        tl.to(`.carousel-item-${prev}`, { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, 0);
        tl.to(`.subtitle-${prev}`, { opacity: 1, height: 24, marginTop: 8, duration: 0.6, ease: "power2.inOut" }, 0.4);

        // oldNext -> prev slot (move down, fade out, teleport up, move down to prev slot)
        tl.to(`.carousel-item-${next}`, { y: 120, opacity: 0, duration: 0.4, ease: "power2.in" }, 0);
        tl.set(`.carousel-item-${next}`, { y: -120 }, 0.4);
        tl.to(`.carousel-item-${next}`, { y: -80, opacity: 0.4, duration: 0.6, ease: "power2.out" }, 0.4);
    });

    return (
        <section ref={containerRef} className="relative w-full h-screen text-[#fff6e6] overflow-hidden bg-transparent z-10">
            {/* The actual content of HomeSpace that gets revealed */}
            <div className="space-content absolute inset-0 w-full h-full bg-[#011412] flex flex-col justify-between p-6 z-0">
                {/* Background Images Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {spaceItems.map((item, index) => (
                        <div key={item.title} className={`bg-img bg-img-${index} absolute inset-0`}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover opacity-100"
                            />
                        </div>
                    ))}
                    {/* Dark gradient overlay to make text readable */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-radial from-black/0 from-30% to-black/80"></div>
                    <div className="absolute inset-0 z-10 pointer-events-none bg-radial from-black/0 from-30% to-black/70"></div>
                </div>

                {/* Top Content */}
                <div className="relative z-10 flex justify-between items-center my-auto">
                    {/* Title */}
                    <h2 className="font-camila text-[40px] text-[#FFF6E6] leading-none tracking-[-4%] ml-6">
                        The Space
                    </h2>

                    {/* Right Navigation Carousel */}
                    <div className="flex flex-col items-end gap-6 mr-6 font-libre-baskerville">
                        {/* Up Arrow */}
                        <button onClick={handlePrev} className="p-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                        </button>

                        {/* Carousel Container */}
                        <div className="relative w-70 h-50 flex justify-end items-center pointer-events-none">
                            {spaceItems.map((item, index) => (
                                <div key={item.title} className={`carousel-item carousel-item-${index} absolute right-0 flex flex-col items-end w-full`}>
                                    <h3 className="text-base text-[#FFF6E6] whitespace-nowrap">{item.title}</h3>
                                    <div className={`subtitle-${index} overflow-hidden text-[#FFF6E6] text-sm whitespace-nowrap`} style={{ height: 0, opacity: 0, marginTop: 0 }}>
                                        {item.subtitle}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Down Arrow */}
                        <button onClick={handleNext} className="p-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Bottom Content / Decorations */}
                <div className="relative z-10 flex justify-center mb-5">
                    <p className="font-libre-baskerville text-sm tracking-widest uppercase opacity-60">
                        A timeless atmosphere
                    </p>
                </div>
            </div>

            {/* The Transition Solid Background */}
            <div className="space-transition-bg absolute inset-0 z-20 bg-[#011412] origin-top scale-y-0"></div>

            {/* The Transition Text */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
                <div className="space-transition-text opacity-0 translate-y-10 flex flex-col items-center">
                    <h2 className="font-camila text-[80px] leading-none tracking-[-4%]">
                        The Space
                    </h2>
                    <p className="font-libre-baskerville text-lg mt-10 opacity-80 text-center">
                        A welcoming space where refined dining and genuine<br /> connection come together in harmony
                    </p>
                </div>
            </div>
        </section>
    );
}
