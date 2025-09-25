'use client';

import React, { useState } from 'react';

const RegisterForm = () => {
       const [focusedField, setFocusedField] = useState<string | null>(null);

    const getFieldStyle = (fieldName: string, baseColor: string = 'bg-white') => {
        if (focusedField === null) {
            return baseColor;
        }
        if (focusedField === fieldName) {
            return baseColor; 
        }
        return 'bg-[#A3FFD6] opacity-80'; 
    };

    return (
        <>
            <h1 className="text-5xl font-bold text-[#50488A] mb-3 ">
                Create an account
            </h1>
            <p className="text-[#50488A] mb-10  text-lg opacity-70">
                Already have an account? <a href="/login" className="underline hover:no-underline">Login</a>
            </p>

            <form className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-6 py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-xl transition-all focus:duration-300 ${getFieldStyle('firstName', 'bg-white')}`}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-6 py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-xl transition-all focus:duration-300 ${getFieldStyle('lastName', 'bg-white')}`}
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-xl transition-all focus:duration-300 ${getFieldStyle('email', 'bg-white')}`}
                    />
                </div>

                {/* Password Input */}
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-xl pr-14 transition-all focus:duration-300 ${getFieldStyle('password', 'bg-white')}`}
                    />
                    <button
                        type="button"
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start text-base">
                    <input
                        type="checkbox"
                        id="terms"
                        className="w-5 h-5 text-[#363256] bg-white border-gray-300 rounded focus:ring-[#363256] mr-3 mt-1"
                    />
                    <label htmlFor="terms" className="text-[#4A4480]">
                        I agree to the <a href="#" className="underline hover:no-underline">Terms & Conditions</a>
                    </label>
                </div>

                {/* Create Account Button */}
                <button
                    type="submit"
                    className="w-full bg-[#50488A] text-white py-5 rounded-3xl text-xl font-semibold hover:bg-[#2d2747] transition-colors duration-300 mt-10"
                >
                    Create account
                </button>

                {/* Google Signup Button */}
                <button
                    type="button"
                    className="w-full bg-white text-gray-600 py-5 rounded-3xl text-xl font-medium border border-gray-700 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-3"
                >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with google</span>
                </button>
            </form>
        </>
    );
}

export default RegisterForm;