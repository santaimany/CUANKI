'use client';

import React, { useState } from 'react';
import { registerUser, initiateGoogleLogin } from '@/lib/services/authService';
import { useToast } from '@/context/ToastContext';

const RegisterForm = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { showError, showSuccess, showLoading } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        showLoading('Membuat akun...');

        try {
            const response = await registerUser(formData);
            console.log('Registration successful:', response);
            
            // Verify token is saved
            const savedToken = localStorage.getItem('token');
            console.log('Token saved after registration:', !!savedToken);
            
            if (!savedToken) {
                console.error('Token not saved! Response structure:', response);
                // Still redirect but user will need to login
            }
            
            showSuccess('Akun berhasil dibuat! Mengarahkan...');
            
            // Redirect ke get-started setelah 1 detik
            setTimeout(() => {
                globalThis.location.href = '/get-started';
            }, 1000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
            showError(errorMessage);
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

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
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:max-w-lg lg:max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#50488A] mb-3 text-center">
                Create an account
            </h1>
            <p className="text-[#50488A] mb-8 sm:mb-10 text-center text-base sm:text-lg opacity-70">
                Already have an account? <a href="/login" className="underline hover:no-underline">Login</a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-lg sm:text-xl transition-all focus:duration-300 ${getFieldStyle('firstName', 'bg-white')}`}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-lg sm:text-xl transition-all focus:duration-300 ${getFieldStyle('lastName', 'bg-white')}`}
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-lg sm:text-xl transition-all focus:duration-300 ${getFieldStyle('email', 'bg-white')}`}
                    />
                </div>

                {/* Password Input */}
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        required
                        minLength={8}
                        className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-lg sm:text-xl pr-14 transition-all focus:duration-300 ${getFieldStyle('password', 'bg-white')}`}
                    />
                    <button
                        type="button"
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>

                {/* Password Confirmation Input */}
                <div className="relative">
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        onFocus={() => setFocusedField('passwordConfirmation')}
                        onBlur={() => setFocusedField(null)}
                        required
                        minLength={8}
                        className={`w-full px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border-none text-gray-700 placeholder-gray-500 focus:outline text-lg sm:text-xl pr-14 transition-all focus:duration-300 ${getFieldStyle('passwordConfirmation', 'bg-white')}`}
                    />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start text-sm sm:text-base">
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
                    disabled={isLoading}
                    className="w-full bg-[#50488A] text-white py-4 sm:py-5 rounded-3xl text-lg sm:text-xl font-semibold hover:bg-[#2d2747] transition-colors duration-300 mt-6 sm:mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating account...' : 'Create account'}
                </button>

                {/* Google Signup Button */}
                <button
                    type="button"
                    onClick={initiateGoogleLogin}
                    className="w-full bg-white text-gray-600 py-4 sm:py-5 rounded-3xl text-lg sm:text-xl font-medium border border-gray-700 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-3"
                >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with google</span>
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;