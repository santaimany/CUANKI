import React from 'react';
import Image from 'next/image';
import LoginImage from '@/assets/auth/image/login-image.svg';
import SmileBg from '@/assets/landingpage/background/smile-bg.svg';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Login Image with Smile Background */}
            <div className="flex-1 relative bg-gradient-to-br from-[#363256] via-50% to-[#50488A] flex items-center justify-center overflow-hidden">
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

            {/* Right Side - Form Content */}
            <div className="flex-1 bg-[#0EFF95] flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;