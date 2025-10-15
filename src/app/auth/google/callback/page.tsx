'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Helper function to get base URL
const getBaseURL = () => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/proxy'; // Production - use proxy
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127'; // Development
};

function GoogleCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Processing Google authentication...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Extract parameters from URL
                const token = searchParams.get('token');
                const error = searchParams.get('error');

                if (error) {
                    setStatus('error');
                    setMessage(decodeURIComponent(error));
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                    return;
                }

                if (token) {
                    // Save token to localStorage
                    localStorage.setItem('token', token);
                    console.log('✅ Google login successful, token saved');

                    // Get user data to check onboarding status
                    const baseURL = getBaseURL();
                    
                    // Fetch user profile to check onboarding status
                    const response = await fetch(`${baseURL}/api/user`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const user = data.data || data;

                        // Check if user has completed onboarding
                        const hasCompleted = !!(
                            user?.username && 
                            user?.age !== null && 
                            user?.origin_id !== null && 
                            user?.status !== null && 
                            user?.origin !== null
                        );

                        setStatus('success');
                        setMessage('Login successful! Redirecting...');

                        setTimeout(() => {
                            if (hasCompleted) {
                                router.push('/dashboard');
                            } else {
                                router.push('/onboarding');
                            }
                        }, 1500);
                    } else {
                        // If can't get user data, just redirect to onboarding
                        setStatus('success');
                        setMessage('Login successful! Redirecting...');
                        setTimeout(() => {
                            router.push('/onboarding');
                        }, 1500);
                    }
                } else {
                    // No token found, redirect to backend callback to initiate OAuth flow
                    const baseURL = getBaseURL();
                    const backendCallbackUrl = `${baseURL}/api/auth/google/callback${window.location.search}`;
                    
                    window.location.href = backendCallbackUrl;
                }
            } catch (err) {
                console.error('Google callback error:', err);
                setStatus('error');
                setMessage('Authentication failed. Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        };

        handleCallback();
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#363256] to-[#50488A]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4">
                <div className="text-center">
                    {status === 'loading' && (
                        <>
                            <div className="mb-6">
                                <svg className="animate-spin h-16 w-16 mx-auto text-[#363256]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#363256] mb-3">Processing...</h2>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="mb-6">
                                <svg className="h-16 w-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-green-600 mb-3">Success!</h2>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="mb-6">
                                <svg className="h-16 w-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-600 mb-3">Error</h2>
                        </>
                    )}

                    <p className="text-gray-600 text-lg">{message}</p>
                </div>
            </div>
        </div>
    );
}

// Loading fallback component
function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#363256] to-[#50488A]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="mb-6">
                        <svg className="animate-spin h-16 w-16 mx-auto text-[#363256]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#363256] mb-3">Loading...</h2>
                    <p className="text-gray-600 text-lg">Please wait</p>
                </div>
            </div>
        </div>
    );
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <GoogleCallbackContent />
        </Suspense>
    );
}
