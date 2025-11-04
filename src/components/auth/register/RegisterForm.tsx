'use client';

import React, { useState } from 'react';
import { registerUser, googleAuthUrl } from '@/lib/services/authService';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';

const RegisterForm = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const { showError, showSuccess, showLoading } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = (data: typeof formData, termsChecked: boolean) => {
        const newErrors: Record<string, string> = {};

        if (!data.first_name.trim()) newErrors.first_name = 'Nama depan harus diisi';
        if (!data.last_name.trim()) newErrors.last_name = 'Nama belakang harus diisi';

        if (!data.email.trim()) {
            newErrors.email = 'Email harus diisi';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Alamat email tidak valid';
        }

        if (!data.password) {
            newErrors.password = 'Password harus diisi';
        } else if (data.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }

        if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
        }


        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        setErrors({}); 

        const termsCheckbox = e.currentTarget.elements.namedItem('terms') as HTMLInputElement;
        const formErrors = validateForm(formData, termsCheckbox.checked);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            showError(Object.values(formErrors)[0]); 
            return;
        }

        setIsLoading(true);
        showLoading('Membuat akun...');

        try {
            const response = await registerUser(formData);
        
            const savedToken = localStorage.getItem('token');
           
            if (!savedToken) {
               // Logic jika token tidak tersimpan
            }
            
            showSuccess('Akun berhasil dibuat! Mengarahkan...');
     
            setTimeout(() => {
                globalThis.location.href = '/get-started';
            }, 1000);
        } catch (err) {
            let errorMessage = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
            
            if (err instanceof Error) {
                const message = err.message.toLowerCase();
                
                if (message.includes('409') || message.includes('already exists') || 
                    message.includes('email already registered')) {
                    errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain atau login.';
                } else if (message.includes('timeout') || message.includes('exceeded')) {
                    errorMessage = 'Koneksi timeout. Periksa koneksi internet Anda dan coba lagi.';
                } else if (message.includes('network') || message.includes('fetch')) {
                    errorMessage = 'Gagal terhubung ke server. Periksa koneksi internet Anda.';
                } else if (message.includes('500')) {
                    errorMessage = 'Server sedang bermasalah. Silakan coba beberapa saat lagi.';
                } else if (message.includes('400')) {
                    errorMessage = 'Data yang dikirim tidak valid. Periksa kembali form Anda.';
                } else if (message.includes('weak password')) {
                    errorMessage = 'Password terlalu lemah. Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.';
                } else if (err.message && !message.includes('failed to fetch')) {
                    errorMessage = err.message;
                }
            }
            
            showError(errorMessage);
         
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
        <div className="w-full  max-w-md mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#50488A] mb-2 text-center">
                Create an account
            </h1>
            <p className="text-[#50488A] mb-8 text-center text-base sm:text-lg opacity-70">
                Already have an account? <a href="/login" className="underline text-[#363256] font-bold hover:no-underline">Login</a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border-none text-gray-700 placeholder-gray-500 text-base sm:text-lg transition-all focus:duration-300
                                        focus:outline-none focus:ring-2 focus:ring-[#50488A]
                                        ${getFieldStyle('firstName', 'bg-white')}
                                        ${errors.first_name ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
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
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border-none text-gray-700 placeholder-gray-500 text-base sm:text-lg transition-all focus:duration-300
                                        focus:outline-none focus:ring-2 focus:ring-[#50488A]
                                        ${getFieldStyle('lastName', 'bg-white')}
                                        ${errors.last_name ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
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
                        className={`w-full px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border-none text-gray-700 placeholder-gray-500 text-base sm:text-lg transition-all focus:duration-300
                                    focus:outline-none focus:ring-2 focus:ring-[#50488A]
                                    ${getFieldStyle('email', 'bg-white')}
                                    ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div> {/* BARU: Dibungkus div agar error bisa dikelompokkan */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                            minLength={8}
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border-none text-gray-700 placeholder-gray-500 text-base sm:text-lg pr-12 transition-all focus:duration-300
                                        focus:outline-none focus:ring-2 focus:ring-[#50488A]
                                        ${getFieldStyle('password', 'bg-white')}
                                        ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword} 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 4.478 0 8.268 2.943 9.542 7-.17.55-.35 1.08-.55 1.58m-3.9-3.9a3 3 0 11-4.24 4.24m4.24-4.24L18.825 13.875M4.93 4.93l1.414 1.414" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Password Confirmation Input */}
                <div> {/* BARU: Dibungkus div agar error bisa dikelompokkan */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            onFocus={() => setFocusedField('passwordConfirmation')}
                            onBlur={() => setFocusedField(null)}
                            required
                            minLength={8}
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border-none text-gray-700 placeholder-gray-500 text-base sm:text-lg pr-12 transition-all focus:duration-300
                                        focus:outline-none focus:ring-2 focus:ring-[#50488A]
                                        ${getFieldStyle('passwordConfirmation', 'bg-white')}
                                        ${errors.password_confirmation ? 'ring-2 ring-red-500' : ''}`}
                        />
                    </div>
                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                </div>

             <div>
                    <label 
                        htmlFor="terms" 
                        className="flex items-start text-sm sm:text-base text-[#4A4480] cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms" 
                            onChange={() => setErrors(prev => ({ ...prev, terms: '' }))} 
                            // flex-shrink-0 penting agar kotaknya tidak 'gepeng'
                            className={`flex-shrink-0 w-5 h-5 text-[#363256] bg-white border-gray-300 rounded focus:ring-[#363256] mr-3 mt-1
                                        ${errors.terms ? 'ring-2 ring-red-500' : ''}`} 
                        />
                        {/* Teks dibungkus <span> agar rapi */}
                        <span className="flex-1"> 
                            I agree to the <a href="#" className="underline hover:no-underline">Terms & Conditions</a>
                        </span>
                    </label>
                    
                    {/* Pesan error diletakkan setelahnya, di-indentasi agar lurus */}
                    {errors.terms && (
                        // pl-8 = w-5 (1.25rem) + mr-3 (0.75rem) = 2rem (32px)
                        <div className="text-sm text-red-600 mt-1 pl-8"> 
                            {errors.terms}
                        </div>
                    )}
                </div>
                {/* --- AKHIR PERBAIKAN --- */}


                {/* Create Account Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer bg-[#50488A] text-white py-3 rounded-3xl text-base sm:text-lg font-semibold hover:bg-[#2d2747] transition-colors duration-300 mt-6  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating account...' : 'Create account'}
                </button>

                {/* Google Signup Button */}
                <Link
                    href={googleAuthUrl}
                    className="w-full bg-white text-gray-600 py-3 rounded-3xl text-base sm:text-lg font-medium border border-gray-700 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-3"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with google</span>
                </Link>
            </form>
        </div>
    );
}

export default RegisterForm;