'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HeaderBackground from "@/assets/education/background/header-detail.svg";
import { educationData } from '@/data/educationData';
import ReadOthers from '@/components/education/ReadOthers';
import cKiri from '@/assets/education/icons/c-kiri-readothers.svg';
import cTengah from '@/assets/education/icons/c-tengah-readothers.svg';
import cKanan from '@/assets/education/icons/c-kanan-readothers.svg';
import HeaderMobile from '@/assets/education/background/header-detail-mobile.svg';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EducationDetailPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  const educationItem = educationData.find(item => item.id === id);

  if (!educationItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#363256] to-[#50488A]">
      {/* Mobile Header */}
      <section className="lg:hidden relative px-6 pt-24 pb-8">
        <div className="max-w-sm mx-auto relative">
          {/* Mobile Header Background */}
          <div className="absolute inset-0 -mx-10 -my-15 z-20">
            <Image
              src={HeaderMobile}
              alt="Education header background"
              className="w-full h-full object-contain"
              priority
            />
          </div>
          
          <div className="relative z-20 space-y-2">
            <p className="text-[#50488A] text-2xl">
              <span className='font-plus-jakarta-bold'>Fin</span>Tech
            </p>
            <h1 className="text-[#50488A] text-sm font-semibold leading-tight">
              {educationItem.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Desktop Header */}
      <section className="hidden lg:block relative px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="max-w-full sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[65vw] mx-auto relative">
          <div className="absolute inset-0 -mx-4 sm:-mx-2 lg:-mx-12 -my-12 sm:-my-16 lg:-my-20 xl:-my-32 z-20">
            <Image
              src={HeaderBackground}
              alt="Education header background"
              className="w-full h-full object-contain"
              priority
              fill
            />
          </div>
          
          <div className="relative z-20">
            <div className="max-w-sm sm:max-w-md lg:max-w-xl space-y-2 sm:space-y-3">
              <p className="inline-block text-[#50488A] rounded-full text-xl sm:text-7xl">
               <span className='font-plus-jakarta-bold'>Fin</span>Tech
              </p>
              <h1 className="text-[#50488A] text-xl sm:text-xl lg:text-2xl xl:text-3xl leading-tight">
                {educationItem.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Main Content */}
      <section className="lg:hidden px-1 -mt-4 relative">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 space-y-6">
            {/* Image */}
            {educationItem.image && (
              <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500">
                <Image
                  src={educationItem.image}
                  alt={educationItem.title}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            )}

            {/* Title */}
            <h2 className="text-[#50488A] text-xl font-bold leading-tight">
              {educationItem.title}
            </h2>

            {/* Introduction */}
            <p className="text-[#50488A] text-sm leading-relaxed">
              {educationItem.content?.introduction || educationItem.description}
            </p>

            {/* Sections */}
            {educationItem.content?.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-[#50488A] text-base font-bold">
                  {index + 1}. {section.title}
                </h3>
                <p className="text-[#50488A] text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Main Content */}
      <section className="hidden lg:block px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-32 lg:-mt-20 xl:-mt-30 relative">
        <div className="max-w-full sm:max-w-[90vw] lg:max-w-[87vw] xl:max-w-[70vw] mx-auto">
          
          <div className="bg-transparent rounded-xl sm:rounded-2xl shadow-xl overflow-hidden relative">
            
            {/* Lapisan Latar Belakang Putih (z-index terendah: 10) */}
            <div className="absolute inset-0 bg-white rounded-xl sm:rounded-2xl z-10"></div>

            {/* Div pemberi jarak untuk konten teks di bawah */}
            <div className="relative z-10 h-4 sm:h-6 lg:h-8 xl:h-12"></div>
            
            {/* Lapisan Gambar (z-index tertinggi: 30) */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 mx-2 sm:mx-3 lg:mx-4 -mt-8 sm:-mt-12 lg:-mt-16 xl:-mt-1 rounded-lg overflow-hidden z-30">
              {educationItem.image ? (
                <Image
                  src={educationItem.image}
                  alt="image"
                  className="w-full h-full object-contain" // Sesuai permintaan Anda
                  fill
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 text-base">Financial Analysis Image</span>
                </div>
              )}
            </div>

            {/* Lapisan Konten Teks (di atas latar belakang putih) */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {educationItem.content?.introduction || educationItem.description}
              </p>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#363256] mb-4 sm:mb-6 text-center">
                {educationItem.content?.sections[0]?.title || "Value Of Investing"}
              </h1>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                {educationItem.content?.sections[0]?.content || 
                  `This comprehensive course will cover all the essential topics related to ${educationItem.title.toLowerCase()}. You'll learn practical strategies, real-world applications, and gain the knowledge needed to succeed in your financial journey.`}
              </p>

              {educationItem.content?.sections.slice(1).map((section, index) => (
                <div key={index} className="mb-8 sm:mb-10">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#363256] mb-3 sm:mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Read Others Section */}
      <ReadOthers currentId={id} />

        <div className="flex justify-center items-center bottom-0 left-0 right-0 z-20 space-x-8 sm:space-x-12 lg:space-x-50">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cKiri}
              alt="Left icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-10 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cTengah}
              alt="Center icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cKanan}
              alt="Right icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
    </main>
  );
}