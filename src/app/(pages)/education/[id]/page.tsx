import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HeaderBackground from "@/assets/education/background/header-detail.svg";
import { educationData } from '@/data/educationData';
import ReadOthers from '@/components/education/ReadOthers';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EducationDetailPage({ params }: PageProps) {
  const educationItem = educationData.find(item => item.id === params.id);

  if (!educationItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#363256] to-[#50488A]">
      {/* Header Section (z-index tengah: 20) */}
      <section className="relative px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="max-w-full sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[65vw] mx-auto relative">
          <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-12 -my-12 sm:-my-16 lg:-my-20 xl:-my-32 z-20">
            <Image
              src={HeaderBackground}
              alt="Education header background"
              className="w-full h-full object-contain"
              priority
              fill
            />
          </div>
          
          <div className="relative z-20">
            <div className="max-w-sm sm:max-w-md lg:max-w-lg space-y-4 sm:space-y-6">
              <span className="inline-block bg-[#0EFF95] text-[#363256] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold">
                FinTech
              </span>
              <h1 className="text-[#363256] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {educationItem.title}
              </h1>
              <p className="text-[#363256] text-sm sm:text-base lg:text-lg opacity-80 leading-relaxed">
                {educationItem.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-32 lg:-mt-30 xl:-mt-40 relative">
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
                  alt={educationItem.title}
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
      <ReadOthers currentId={params.id} />

      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </main>
  );
}