"use client";

import React from "react";
import Image from "next/image";
import TopiToga from "@/assets/landingpage/image/topitogawithcoin-image.svg";
import WhiteBg from "@/assets/landingpage/background/green-education-inverted.svg";
import CardEducation from "./CardEducation";

const EducationSection = () => {
    return (
        <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A]  py-16 lg:py-24">
            {/* Main Green Background Shape */}
            <div className="relative w-full max-w-[1600px] mx-auto">
                <div className="relative">
                    <Image
                        src={WhiteBg}
                        alt="Education background shape"
                        width={1048}
                        height={912}
                        className="w-full h-auto"
                    />
                    
                    {/* Education Badge */}
                    <div className="absolute top-[20%] right-8 lg:right-12 bg-[#50488A] text-white px-10 py-3 rounded-full text-2xl font-semibold">
                        Education
                    </div>

                    {/* Graduation Image - positioned on left side of green area */}
                    <div className="absolute -top-[10vw] left-0 xl:left-0 lg:left-16 w-60 sm:w-72 lg:w-96 xl:w-[52rem] z-10">
                        <Image
                            src={TopiToga}
                            alt="Graduation Cap and Diploma with coins"
                            width={600}
                            height={600}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Main Content - positioned on right side */}
                    <div className="absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 max-w-4xl text-right">
                        <h2 className="text-[#50488A] text-4xl sm:text-5xl lg:text-7xl font-medium leading-tight">
                            <span className="font-black">Smart education</span><br />
                            for your smart <span className="font-black">financial</span>
                        </h2>
                    </div>
                </div>

                {/* Education Cards */}
                <div className="relative -mt-16 px-8 lg:px-16 z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
                        <CardEducation 
                            title="Financial Planning"
                            description="Learn how to create and manage your personal financial plan effectively"
                        />
                        <CardEducation 
                            title="Investment Basics"
                            description="Understand the fundamentals of investing and building wealth over time"
                        />
                        <CardEducation 
                            title="Budgeting Tips"
                            description="Master the art of budgeting to control your expenses and save money"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;