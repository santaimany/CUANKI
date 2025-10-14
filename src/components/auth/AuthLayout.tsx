import React from 'react';
import Image from 'next/image';
import LoginImage from '@/assets/auth/image/login-image.svg';
import SmileBg from '@/assets/landingpage/background/smile-bg.svg';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        // Mobile: Single column scrollable, Desktop: Side-by-side fixed height
        <div className="min-h-screen md:h-screen flex flex-col md:flex-row md:overflow-hidden">
            {/* Left Side - Login Image with Smile Background - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex md:flex-1 relative bg-gradient-to-br from-[#363256] via-50% to-[#50488A] items-center justify-center overflow-hidden">
                {/* Smile Background */}
                <div className="absolute inset-0 scale-170">
                    <Image
                        src={SmileBg}
                        alt="Smile background"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="relative z-10 w-full h-full">
                    <Image
                        src={LoginImage}
                        alt="Login illustration with logo and text"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Right Side - Form Content - Full screen on mobile, half on desktop */}
            <div className="flex-1 bg-[#0EFF95] flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:overflow-y-auto">
                <div className="w-full max-w-md md:max-w-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;