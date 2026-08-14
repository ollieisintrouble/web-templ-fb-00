"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeJourney() {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1000%",
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        const getTravelDistance = (elementSelector: string) => {
            const el = document.querySelector(elementSelector) as HTMLElement;
            if (!el || !containerRef.current) return 0;
            return Math.max(0, el.scrollHeight - containerRef.current.offsetHeight);
        };

        gsap.set('.journey-col-right', { y: () => -getTravelDistance('.journey-col-right') });

        // 1. Background Pull Down
        tl.to('.journey-bg-left, .journey-bg-right', { scaleY: 1, duration: 1, ease: "power2.inOut" }, 0);

        // 2. Text and Columns Reveal
        tl.to('.journey-text', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" }, 1)
            .to('.journey-columns', { opacity: 1, duration: 1, ease: "power2.inOut" }, 1);

        // 3. Parallax Columns
        tl.to('.journey-col-left', { y: () => -getTravelDistance('.journey-col-left'), duration: 2, ease: "none" }, 2)
            .to('.journey-col-right', { y: 0, duration: 2, ease: "none" }, 2);

        // 4. Reveal Menu Background and Move Columns to Edges
        tl.to('.journey-text', { opacity: 0, duration: 0.5 }, 4)
            .to('.journey-bg-left', { xPercent: -100, duration: 1.5, ease: "power2.inOut" }, 4.5)
            .to('.journey-bg-right', { xPercent: 100, duration: 1.5, ease: "power2.inOut" }, 4.5)
            .to('.journey-col-left', {
                x: "-33vw", duration: 1.5, ease: "power2.inOut"
            }, 4.5)
            .to('.journey-col-right', {
                x: "33vw", duration: 1.5, ease: "power2.inOut"
            }, 4.5)
            .to('.menu-title-container', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 5);

        // 5. Scale down columns into menu framing positions & reveal menu list
        tl.to('.journey-col-left', {
            x: "-36vw",
            y: "-69vh",
            scale: 0.8,
            transformOrigin: "center bottom",
            duration: 1.5, ease: "power2.inOut"
        }, 6)
            .to('.journey-col-right', {
                x: "30vw",
                y: "36vh",
                scale: 0.8,
                transformOrigin: "center top",
                duration: 1.5, ease: "power2.inOut"
            }, 6)
            // Hide the images that shouldn't be visible in the menu layout
            .to('.image-left-0, .image-left-1, .image-right-2, .image-right-3', { opacity: 0, duration: 0.01, ease: "power2.inOut" }, 6)
            // Animate individual visible images to match the sporadic mockup layout
            .to('.image-left-2', { x: "9vw", y: "-10vh", scale: 0.9, duration: 1.5, ease: "power2.inOut" }, 6)
            .to('.image-left-3', { x: "7vw", y: "5vh", scale: 1.2, duration: 1.5, ease: "power2.inOut" }, 6)
            .to('.image-right-0', { x: "-2vw", y: "15vh", scale: 1.2, duration: 1.5, ease: "power2.inOut" }, 6)
            .to('.image-right-1', { x: "-4vw", y: "32vh", scale: 1.2, duration: 1.5, ease: "power2.inOut" }, 6)
            .to('.menu-title-container', { y: "-25vh", scale: 0.8, duration: 1.5, ease: "power2.inOut" }, 6)
            .to('.menu-list-container', { opacity: 1, y: "-25vh", duration: 1, ease: "power2.out" }, 6.5);

        // 6. Scroll the tall menu content AND image columns upwards together
        tl.to('.menu-content-wrapper, .journey-columns', {
            y: () => {
                const wrapper = document.querySelector('.menu-content-wrapper');
                if (!wrapper) return 0;
                return -Math.max(0, wrapper.scrollHeight - window.innerHeight + 100);
            },
            duration: 4,
            ease: "none"
        }, 8);

    }, { scope: containerRef });

    const LEFTIMAGES = [
        "/img/3_cuisine/cuisine-5-carousel-left-1.jpg",
        "/img/3_cuisine/cuisine-5-carousel-left-2.jpg",
        "/img/3_cuisine/cuisine-5-carousel-left-3.jpg",
        "/img/3_cuisine/cuisine-5-carousel-left-4.jpg"
    ];
    const RIGHTIMAGES = [
        "/img/3_cuisine/cuisine-5-carousel-right-1.jpg",
        "/img/3_cuisine/cuisine-5-carousel-right-2.jpg",
        "/img/3_cuisine/cuisine-5-carousel-right-3.jpg",
        "/img/3_cuisine/cuisine-5-carousel-right-4.jpg"
    ];

    return (
        <div ref={containerRef} className="relative w-full h-screen text-[#fff6e6] overflow-hidden bg-transparent">
            {/* The Solid Background that pulls down */}
            <div className="absolute inset-0 flex -z-10">
                <div className="journey-bg-left w-1/2 h-full bg-[#011412] origin-top scale-y-0"></div>
                <div className="journey-bg-right w-1/2 h-full bg-[#011412] origin-top scale-y-0"></div>
            </div>

            <div className="w-full h-full flex justify-center items-center">
                {/* Left Text */}
                <div className="w-full h-full p-6 flex flex-col justify-center items-start">
                    <div className="overflow-hidden"><h2 className="journey-text translate-y-full opacity-0 font-camila text-[64px] leading-none tracking-[-4%] text-left">Culinary</h2></div>
                    <div className="overflow-hidden"><h2 className="journey-text translate-y-full opacity-0 font-camila text-[64px] leading-none tracking-[-4%] text-left">Journey</h2></div>
                </div>

                {/* Parallax Image Columns */}
                <div className="journey-columns relative z-20 opacity-0 w-171.5 h-full shrink-0 flex items-start gap-0">
                    <div className="journey-col-left w-85.75 flex flex-col items-center gap-0">
                        {LEFTIMAGES.map((image, index) => (<Image key={image} src={image} alt="" width={343} height={480} quality={100} className={`image-left-${index} object-cover shrink-0`} />))}
                    </div>
                    <div className="journey-col-right w-85.75 flex flex-col items-center gap-0">
                        {RIGHTIMAGES.map((image, index) => (<Image key={image} src={image} alt="" width={343} height={480} quality={100} className={`image-right-${index} object-cover shrink-0`} />))}
                    </div>
                </div>

                {/* Right Text */}
                <div className="w-full h-full p-6 flex flex-col gap-3 justify-center items-end">
                    <div className="overflow-hidden"><p className="journey-text translate-y-full opacity-0 font-libre-baskerville font-semibold leading-tight tracking-[-1%] text-right">European</p></div>
                    <div className="overflow-hidden"><p className="journey-text translate-y-full opacity-0 font-libre-baskerville font-semibold leading-tight tracking-[-1%] text-right">Pure Flavor</p></div>
                    <div className="overflow-hidden"><p className="journey-text translate-y-full opacity-0 font-libre-baskerville font-semibold leading-tight tracking-[-1%] text-right">Texture Harmony</p></div>
                </div>
            </div>

            {/* Menu Content Wrapper (Scrolls up in Phase 6) */}
            <div className="menu-content-wrapper absolute top-0 left-0 w-full z-30 pointer-events-none flex flex-col items-center">

                {/* Menu Title */}
                <div className="menu-title-container flex flex-col items-center opacity-0 translate-y-10 mt-[45vh]">
                    <h2 className="font-camila text-[80px] text-[#05423B] leading-none tracking-[-4%]">The Menu</h2>
                    <p className="mt-4 font-libre-baskerville text-[#131414] text-center max-w-md">
                        A refined composition of flavors, bringing depth, balance, and a sense of completeness to every evening.
                    </p>
                </div>

                {/* Menu List */}
                <div className="menu-list-container opacity-0 translate-y-10 w-full max-w-3xl mt-20 mb-[20vh] text-[#131414] font-libre-baskerville">
                    <div className="flex w-full border-t border-b border-[#E5D3B3] py-8">
                        <div className="w-1/3"><h3 className="text-[#05423B] font-semibold text-xl">The Prelude</h3></div>
                        <div className="w-2/3 flex flex-col gap-6">
                            <div><h4 className="font-bold text-lg">1. Poached Scallop</h4><p className="text-[#828282] text-sm mt-1">with Cauliflower, Hazelnut, Brown Butter</p></div>
                            <div><h4 className="font-bold text-lg">2. Fresh Tuna Crudo</h4><p className="text-[#828282] text-sm mt-1">with Yuzu Kosho, Cucumber, Shiso</p></div>
                            <div><h4 className="font-bold text-lg">3. Creamy Burrata</h4><p className="text-[#828282] text-sm mt-1">with Heirloom Tomato, Basil, Aged Balsamic</p></div>
                            <div><h4 className="font-bold text-lg">4. Foie Gras Terrine</h4><p className="text-[#828282] text-sm mt-1">with Fig, Sauternes Jelly, Brioche</p></div>
                        </div>
                    </div>

                    <div className="flex w-full border-b border-[#E5D3B3] py-8">
                        <div className="w-1/3"><h3 className="text-[#05423B] font-semibold text-xl">The Crescendo</h3></div>
                        <div className="w-2/3 flex flex-col gap-6">
                            <div><h4 className="font-bold text-lg">5. Seared Salmon</h4><p className="text-[#828282] text-sm mt-1">with Beetroot, Dill, Citrus</p></div>
                            <div><h4 className="font-bold text-lg">6. Roasted Duck</h4><p className="text-[#828282] text-sm mt-1">with Cherry, Red Cabbage, Jus</p></div>
                            <div><h4 className="font-bold text-lg">7. Grilled Wagyu Beef</h4><p className="text-[#828282] text-sm mt-1">with Black Garlic, Baby Carrot, Truffle Jus</p></div>
                        </div>
                    </div>

                    <div className="flex w-full pt-8">
                        <div className="w-1/3"><h3 className="text-[#05423B] font-semibold text-xl">The Finale</h3></div>
                        <div className="w-2/3 flex flex-col gap-6">
                            <div><h4 className="font-bold text-lg">8. Dark Chocolate Mousse</h4><p className="text-[#828282] text-sm mt-1">with Hazelnut Praline, Salted Caramel, Cocoa</p></div>
                            <div><h4 className="font-bold text-lg">9. Classic Crème Brûlée</h4><p className="text-[#828282] text-sm mt-1">with Vanilla Bean, Burnt Sugar, Almond Biscotti</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}