"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeIntroCuisine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rightImageContainerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // 4 scroll sections
                pin: true,
                scrub: true,
                snap: {
                    snapTo: [0, 0.333, 0.666, 1],
                    duration: { min: 0.2, max: 0.8 },
                    ease: "power1.inOut"
                },
                invalidateOnRefresh: true,
            }
        });

        // Initialize positions for elements that slide in
        gsap.set([
            '.left-img-2', '.left-img-3', 
            '.right-img-2', '.cuisine-wrapper', 
            '.text-state-2', '.text-state-3', 
            '.desc-2', '.desc-3'
        ], { yPercent: 100 });

        // Phase 1 (0 to 0.333): State 1 to State 2
        tl.to('.left-img-1', { yPercent: -100, duration: 1, ease: "power1.inOut" }, 0)
          .to('.left-img-2', { yPercent: 0, duration: 1, ease: "power1.inOut" }, 0)
          .to('.right-img-1', { yPercent: -100, duration: 1, ease: "power1.inOut" }, 0)
          .to('.right-img-2', { yPercent: 0, duration: 1, ease: "power1.inOut" }, 0)
          .to('.text-state-1', { yPercent: -100, opacity: 0, duration: 0.8, ease: "power1.inOut" }, 0)
          .to('.text-state-2', { yPercent: 0, opacity: 1, duration: 0.8, ease: "power1.inOut" }, 0.2)
          .to('.desc-1', { yPercent: -100, opacity: 0, duration: 0.8, ease: "power1.inOut" }, 0)
          .to('.desc-2', { yPercent: 0, opacity: 1, duration: 0.8, ease: "power1.inOut" }, 0.2)
          .to('.progress-bar', { height: `${(128 / 3) * 2}px`, duration: 1, ease: "power1.inOut" }, 0)
          .to('.progress-num', { textContent: 2, duration: 0.1, snap: { textContent: 1 } }, 0.5); // snap number

        // Phase 2 (0.333 to 0.666): State 2 to State 3
        tl.to('.left-img-2', { yPercent: -100, duration: 1, ease: "power1.inOut" }, 1)
          .to('.left-img-3', { yPercent: 0, duration: 1, ease: "power1.inOut" }, 1)
          .to('.right-img-2', { yPercent: -100, duration: 1, ease: "power1.inOut" }, 1)
          .to('.cuisine-wrapper', { yPercent: 0, duration: 1, ease: "power1.inOut" }, 1)
          .to('.text-state-2', { yPercent: -100, opacity: 0, duration: 0.8, ease: "power1.inOut" }, 1)
          .to('.text-state-3', { yPercent: 0, opacity: 1, duration: 0.8, ease: "power1.inOut" }, 1.2)
          .to('.desc-2', { yPercent: -100, opacity: 0, duration: 0.8, ease: "power1.inOut" }, 1)
          .to('.desc-3', { yPercent: 0, opacity: 1, duration: 0.8, ease: "power1.inOut" }, 1.2)
          .to('.progress-bar', { height: `${128}px`, duration: 1, ease: "power1.inOut" }, 1)
          .to('.progress-num', { textContent: 3, duration: 0.1, snap: { textContent: 1 } }, 1.5);

        // Phase 3 (0.666 to 1.0): State 3 to Cuisine Full Screen
        
        // Hide unused images so they don't appear when overflow is visible
        tl.set('.right-img-1, .right-img-2', { display: 'none' }, 2);
        tl.set(rightImageContainerRef.current, { overflow: 'visible' }, 2);

        tl.to('.cuisine-wrapper', {
            x: () => {
                if (!rightImageContainerRef.current || !containerRef.current) return 0;
                const bounds = rightImageContainerRef.current.getBoundingClientRect();
                const parentBounds = containerRef.current.getBoundingClientRect();
                return -(bounds.left - parentBounds.left);
            },
            y: () => {
                if (!rightImageContainerRef.current || !containerRef.current) return 0;
                const bounds = rightImageContainerRef.current.getBoundingClientRect();
                const parentBounds = containerRef.current.getBoundingClientRect();
                return -(bounds.top - parentBounds.top);
            },
            width: "100vw",
            height: "100vh",
            duration: 1,
            ease: "power2.inOut"
        }, 2)
        .to('.intro-left-col, .intro-right-text', { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 2)
        .to('.cuisine-overlay', { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 2.5);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[#FAF7F2] text-[#131414] w-full h-screen relative overflow-hidden">
            {/* Intro Content */}
            <div className="intro-content absolute inset-0 flex gap-5 p-6 w-full h-full z-10">
                
                {/* Left Column Images */}
                <div className="intro-left-col relative w-full h-full overflow-clip">
                    <Image src="/img/2_intro/intro-left-img-1.jpg" width={686} height={752} quality={100} priority alt="" className="left-img-1 absolute inset-0 object-cover w-full h-full" />
                    <Image src="/img/2_intro/intro-left-img-2.jpg" width={686} height={752} quality={100} alt="" className="left-img-2 absolute inset-0 object-cover w-full h-full" />
                    <Image src="/img/2_intro/intro-left-img-3.jpg" width={686} height={752} quality={100} alt="" className="left-img-3 absolute inset-0 object-cover w-full h-full" />
                </div>

                {/* Right Column Content */}
                <div className="w-full h-full flex flex-col gap-6">
                    {/* Text Container */}
                    <div className="intro-right-text w-full h-full max-h-80 flex flex-col justify-between items-end">
                        <div className="w-full h-32 flex gap-6">
                            {/* Progress */}
                            <div className="h-32 flex gap-2">
                                <p className="progress-num w-2 font-libre-baskerville text-[#05423B] tracking-[-1%] leading-tight">1</p>
                                <div className="w-0.5 h-full bg-[#D5DBDB]">
                                    <div className="progress-bar w-0.5 bg-[#05423B] transition-none" style={{ height: `${(128 / 3)}px` }}></div>
                                </div>
                            </div>
                            
                            {/* Headings */}
                            <div className="relative w-full h-full overflow-hidden">
                                <div className="text-state-1 absolute inset-0 flex flex-col gap-0 items-end">
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">Novella is</h2>
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">designed to be</h2>
                                </div>
                                <div className="text-state-2 absolute inset-0 flex flex-col gap-0 items-end opacity-0">
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">The spirit of</h2>
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">thoughtful service</h2>
                                </div>
                                <div className="text-state-3 absolute inset-0 flex flex-col gap-0 items-end opacity-0">
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">The art behind</h2>
                                    <h2 className="w-full line-clamp-1 font-camila text-[#05423B] text-[64px] tracking-[-4px] leading-none text-right">every dish</h2>
                                </div>
                            </div>
                        </div>
                        
                        {/* Descriptions */}
                        <div className="relative w-150 h-24 overflow-hidden">
                            <p className="desc-1 absolute inset-0 font-libre-baskerville leading-relaxed tracking-[-1%] line-clamp-2 text-right">A quiet sense of warmth fills the space with soft lighting to create a welcoming atmosphere where you can feel at ease and fully present.</p>
                            <p className="desc-2 absolute inset-0 font-libre-baskerville leading-relaxed tracking-[-1%] line-clamp-2 text-right opacity-0">Every interaction is guided by warmth and attentiveness to create a dining experience that feels personal and effortless.</p>
                            <p className="desc-3 absolute inset-0 font-libre-baskerville leading-relaxed tracking-[-1%] line-clamp-2 text-right opacity-0">From preparation to presentation, every element is carefully considered to deliver harmony in flavor, texture, and form.</p>
                        </div>
                    </div>

                    {/* Right Images Container */}
                    <div ref={rightImageContainerRef} className="relative w-full h-4/6 overflow-clip z-20">
                        <Image src="/img/2_intro/intro-right-img-1.jpg" width={686} height={560} quality={100} priority alt="" className="right-img-1 absolute inset-0 object-cover w-full h-full" />
                        <Image src="/img/2_intro/intro-right-img-2.jpg" width={686} height={560} quality={100} alt="" className="right-img-2 absolute inset-0 object-cover w-full h-full" />
                        
                        {/* Cuisine Wrapper (Image 3 + Cuisine Content) */}
                        <div className="cuisine-wrapper absolute inset-0 w-full h-full z-30">
                            <Image src="/img/2_intro/intro-right-img-3.jpg" width={1920} height={1080} quality={100} alt="" className="absolute inset-0 object-cover w-full h-full" />
                            
                            {/* Cuisine Overlay (Appears when full screen) */}
                            <div className="cuisine-overlay absolute inset-0 flex flex-col gap-3 justify-center items-center text-[#fff6e6] bg-radial from-transparent to-black/80 opacity-0 pointer-events-none">
                                <p className="z-50 font-libre-baskerville font-semibold leading-tight tracking-[-1%] text-center">Culinary Philosophy</p>
                                <div className="flex flex-col items-center">
                                    <h2 className="z-50 font-camila text-[64px] leading-none tracking-[-4%] text-center">Different expressions of flavor,</h2>
                                    <h2 className="z-50 font-camila text-[64px] leading-none tracking-[-4%] text-center">woven into one seamless experience</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
