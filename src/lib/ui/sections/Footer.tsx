export default function Footer() {
    return (
        <footer className="w-full bg-[#011412] text-[#fff6e6] flex flex-col">
            <div className="flex justify-between w-full h-full p-6">

                {/* Left Side */}
                <div className="w-1/2 flex flex-col justify-between h-full">
                    <h2 className="font-camila text-[112px] leading-none tracking-[-4%]">
                        Novella
                    </h2>

                    <div className="mt-40">
                        <h3 className="font-camila text-4xl font-light leading-tight tracking-tighter">
                            Delight all your <br /> senses and emotions
                        </h3>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 flex flex-col gap-10">

                    {/* Have a visit */}
                    <div className="flex flex-col w-full gap-3">
                        <h4 className="font-camila text-4xl font-light leading-tight tracking-tighter text-[#fff6e6]">Have a visit</h4>
                        <div className="h-px w-full bg-[#595C5C]" />
                        <div className="grid grid-cols-[240px_1fr] gap-y-5 text-sm font-libre-baskerville mt-2">
                            <p className="text-[#595C5C]">Address</p>
                            <p>7629 University Street, London, United Kingdom</p>

                            <p className="text-[#595C5C]">Service Time</p>
                            <p>Monday - Sunday (7:00 AM - 10:30 PM)</p>

                            <p className="text-[#595C5C]">Phone</p>
                            <p>+44 20 7946 0023</p>

                            <p className="text-[#595C5C]">Mail</p>
                            <p>contact@novellarestaurant.com</p>
                        </div>
                    </div>

                    {/* Let's connect */}
                    <div className="flex flex-col w-full gap-3">
                        <h4 className="font-camila text-4xl font-light leading-tight tracking-tighter text-[#fff6e6]">Let's connect</h4>
                        <div className="h-px w-full bg-[#595C5C]" />
                        <div className="grid grid-cols-[240px_1fr] gap-y-5 text-sm font-libre-baskerville mt-2">
                            <p className="text-[#595C5C]">Social Media</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:opacity-100 transition-opacity">Facebook</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">Youtube</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-[#595C5C]" />

            <div className="flex p-6 justify-between items-center text-[#595C5C]">
                <p className="font-libre-baskerville text-xs">
                    © 2024 Novella. All rights reserved.
                </p>
                <div className="flex justify-end gap-6 text-xs">
                    <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Cookie Settings</a>
                </div>
            </div>
        </footer>
    );
}
