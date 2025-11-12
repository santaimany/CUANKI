"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/landingpage/logo/cuanki-logo.svg";

const Footer = () => {
    return (
        <footer className="bg-[#2E2A4A] relative z-10    text-white py-16 w-full">
            <div className="max-w-[85vw] mx-auto px-6 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                    {/* Logo and Tagline */}
                    <div className="lg:col-span-1">
                        <div className="mb-4 sm:mb-6">
                            <Image
                                src={Logo}
                                alt="Cuanki Logo"
                                width={200}
                                height={60}
                                className="h-auto w-36 sm:w-44 md:w-48"
                            />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
                                <span className="text-[#0EFF95] font-semibold">Smart</span> <span className="font-semibold">solution</span>
                            </h3>
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
                                for your smart
                            </h3>
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
                                <span className="text-[#0EFF95] font-semibold">financial</span>
                            </h3>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div className="lg:col-span-1">
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-15 mt-0 sm:mt-2 md:mt-3 lg:mt-5 text-white">Products</h4>
                        <ul className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Education
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-1">
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-15 mt-0 sm:mt-2 md:mt-3 lg:mt-5 text-white">Company</h4>
                        <ul className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Form
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="lg:col-span-1">
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-15 mt-0 sm:mt-2 md:mt-3 lg:mt-5 text-white">Resources</h4>
                        <ul className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Homepage
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Transaction
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-normal">
                                    Assets
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="border-t border-white/30 my-8 sm:my-10 md:my-12"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 sm:gap-6 text-white/70">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base lg:text-lg">
                        <span>Copyright 2024 Cuanki</span>
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms & Condition
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <span>All Right Reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
