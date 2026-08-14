"use client"

import { useState } from "react";
import Image from "next/image";
import { List as ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { X as XIcon } from "@phosphor-icons/react/dist/csr/X";
import { motion, AnimatePresence } from "motion/react";

// Reusable animated button component with hover fill effect
const AnimatedButton = ({ children, onClick, dark = false, className = "" }: any) => {
    const borderColor = dark ? "border border-[#05423B]" : "border border-[#FFF6E6]";
    const bgColor = dark ? "bg-[#05423B]" : "bg-[#FFF6E6]";
    const textColor = dark ? "text-[#05423B]" : "text-[#FFF6E6]";
    const hoverTextColor = dark ? "group-hover:text-[#FAF7F2]" : "group-hover:text-[#05423B]";

    return (
        <button onClick={onClick} className={`relative overflow-hidden group ${borderColor} ${textColor} flex items-center justify-center ${className}`}>
            {/* Fill animation from top: -translate-y-full */}
            <span className={`absolute inset-0 w-full h-full ${bgColor} -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out`}></span>
            <span className={`relative z-10 flex items-center justify-center ${hoverTextColor} transition-colors duration-300`}>
                {children}
            </span>
        </button>
    );
};

export default function HomeHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="relative w-full h-screen">
            <div className="bg-[#011412] text-[#FFF6E6] w-full h-full flex">
                <div className="lg:w-150 p-6 flex flex-col justify-between items-start shrink-0">
                    <div className="flex items-center gap-4">
                        <AnimatedButton onClick={() => setIsMenuOpen(true)} className="size-9">
                            <ListIcon size={20} className="fill-current" />
                        </AnimatedButton>
                        <AnimatedButton className="h-9 w-fit px-4">
                            <span className="text-sm">Reservation</span>
                        </AnimatedButton>
                    </div>
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                    >
                        <Image src="/novella.svg" alt="Novella" width={450} height={104} className="h-26 w-auto" />
                    </motion.div>
                    <motion.p
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                        className="font-libre-baskerville w-80 leading-relaxed tracking-[-1%]"
                    >
                        An intimate restaurant promises to delight all your senses and emotions.
                    </motion.p>
                </div>
                <div className="w-full overflow-clip">
                    <Image src="/img/hero-img.jpg" width={826} height={800} quality={100} alt="" loading="eager" className="object-cover w-full h-full" />
                </div>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        key="menu-overlay"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-6 w-150 left-6 z-50 bg-[#FAF7F2] flex flex-col p-6"
                    >
                        {/* Menu Header */}
                        <div className="flex justify-between w-full">
                            <AnimatedButton onClick={() => setIsMenuOpen(false)} dark={true} className="size-9">
                                <XIcon size={20} className="fill-current" />
                            </AnimatedButton>
                            <AnimatedButton dark={true} className="h-9 w-fit px-4">
                                <span className="text-sm">Reservation</span>
                            </AnimatedButton>
                        </div>

                        {/* Menu Links */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-20">
                            {['Cuisine', 'Menu', 'Events', 'Gallery', 'About', 'Contact'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                                >
                                    <a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="font-camila text-[40px] leading-tight tracking-[-4%] text-[#05423B] hover:opacity-70 transition-opacity">
                                        {item}
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}