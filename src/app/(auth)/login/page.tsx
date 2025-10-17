'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Main from "@/components/auth/login/Main";
import LoadingScreen from '@/components/commons/LoadingScreen';

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
         <LoadingScreen/>
        );
    }

    return <Main />;
};

export default LoginPage;