'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Main from "@/components/auth/login/Main";

const LoginPage = () => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        } else {
            setIsChecking(false);
        }
    }, [router]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A3FFD6] to-[#A0E7E5]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#363256]"></div>
            </div>
        );
    }

    return <Main />;
};

export default LoginPage;