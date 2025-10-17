"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import ProgressBar from '@/components/onboarding/ProgressBar';
import AvatarBubble from '@/components/onboarding/AvatarBubble';
import ChatBubble from '@/components/onboarding/ChatBubble';
import InputBar from '@/components/onboarding/InputBar';
import QuestionRenderer from '@/components/onboarding/QuestionRenderer';
import Avatar from '@/assets/getstarted/image/avatar-logo.svg';
import AvatarRight from '@/assets/getstarted/image/right-logo.svg';
import { QUESTIONS } from '@/data/questionData';
import { submitFormUser, submitFormAccount, submitFormPlan, getListBank, getListOrigin, type Bank, type Origin } from '@/lib/services/onboardingService';
import { useToast } from '@/context/ToastContext';
import Loading from '@/app/loading';
import LoadingScreen from '@/components/commons/LoadingScreen';


export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();
  const { showError, showSuccess } = useToast();

  type Message = { kind: 'bot' | 'user'; text: string; qId?: string };
  const [messages, setMessages] = useState<Message[]>([{ kind: 'bot', text: QUESTIONS[0].text, qId: QUESTIONS[0].id }]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Update questions dengan data dinamis
  const questionsWithDynamicData = QUESTIONS.map(q => {
    if (q.id === 'city') {
      return {
        ...q,
        options: origins.map(origin => origin.city_province)
      };
    }
    return q;
  });
  
  const current = questionsWithDynamicData[step];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function sleep(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  // Submit form user (setelah status question - step 3)
  async function submitFormUserData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showError('Silakan daftar atau login terlebih dahulu');
        globalThis.location.href = '/register';
        return;
      }

      const cityName = answers['city'] || '';
      const selectedOrigin = origins.find(o => o.city_province === cityName);
      const originId = selectedOrigin ? selectedOrigin.id : 0;

      // Status mapping - backend biasanya expect lowercase atau specific values
      // "Mahasiswa" → "mahasiswa" atau "student"
      // "Pelajar" → "pelajar" atau "student"
      const statusValue = answers['status'] || '';
      const statusMapped = statusValue.toLowerCase(); // Default: lowercase
      
      // Kemungkinan mapping lain jika lowercase tidak work:
      // statusMapped = statusValue === 'Mahasiswa' ? 'mahasiswa' : 'pelajar';
      // atau bisa jadi: statusMapped = 'student'; // jika backend expect English
      
      const userData = {
        username: answers['name'] || '',
        age: parseInt(answers['age']) || 0,
        origin_id: originId,
        status: statusMapped,
      };
      
      console.log('📝 Step 1: Submitting user data:', userData);
      console.log('📝 Raw status value:', statusValue, '→ Mapped:', statusMapped);
      console.log('📝 Selected origin:', selectedOrigin);
      await submitFormUser(userData);
      console.log('✅ User data submitted successfully');
      showSuccess('Data pengguna berhasil disimpan!');
    } catch (error) {
      console.error('❌ Error submitting user data:', error);
      showError('Gagal menyimpan data pengguna. Silakan coba lagi.');
      throw error;
    }
  }

  // Submit form account (setelah bank question - step 4)
  async function submitFormAccountData() {
    try {
      const bankNames = (answers['bank'] || '').split('|').filter(Boolean);
      console.log('📝 Step 2: Bank names to submit:', bankNames);
      
      if (bankNames.length === 0) {
        console.warn('⚠️ No banks selected');
        return;
      }

      for (const bankName of bankNames) {
        const bankInput = bankName.trim().toLowerCase();
        const selectedBank = banks.find(b => 
          b.code_name.toLowerCase() === bankInput || 
          b.bank_name.toLowerCase().includes(bankInput)
        );
        
        if (!selectedBank) {
          console.warn('⚠️ Bank not found:', bankInput);
          continue;
        }
        
        console.log('Submitting bank:', { 
          bank_id: selectedBank.id, 
          bankInput, 
          selectedBank: selectedBank.bank_name 
        });
        
        await submitFormAccount({ bank_id: selectedBank.id });
        console.log('✅ Bank submitted successfully:', selectedBank.bank_name);
      }
    } catch (error) {
      console.error('❌ Error submitting bank data:', error);
      showError('Gagal menyimpan data bank. Silakan coba lagi.');
      throw error;
    }
  }

  // Submit form plan (setelah target question - step 8)
  async function submitFormPlanData() {
    try {
      const planData = {
        monthly_income: parseInt(answers['income']) || 0,
        income_date: parseInt(answers['payday']) || 1,
        saving_target_amount: parseInt(answers['nabung']) || 0,
        saving_target_duration: parseInt(answers['target']) || 0, // Backend expects years, not months
      };
      
      console.log('📝 Step 3: Submitting plan data:', planData);
      await submitFormPlan(planData);
      console.log('✅ Plan data submitted successfully');
      console.log('🎉 All onboarding data submitted successfully!');
    } catch (error) {
      console.error('❌ Error submitting plan data:', error);
      showError('Gagal menyimpan data rencana. Silakan coba lagi.');
      throw error;
    }
  }

  // Fetch origins dan banks saat component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [originsData, banksData] = await Promise.all([
          getListOrigin(),
          getListBank()
        ]);
        setOrigins(originsData);
        setBanks(banksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (current.type === 'chat') {
        scrollToBottom();
    }
  }, [messages, current.type]);

  function handleAnswerChange(v: string) {
    const cleaned = current.id === 'age' ? v.replace(/\D+/g, '') : v;
    setAnswers((a) => ({ ...a, [current.id]: cleaned }));
  }

  async function handleContinue() {
    const q = QUESTIONS[step];
    if (!hasAnswerFor(q)) return;

    // CHECK: Apakah ini adalah step terakhir dari setiap form section?
    // Step 3 (status) = selesai form/user
    // Step 4 (bank) = selesai form/account
    // Step 8 (target) = selesai form/plan
    
    const isAfterStatusStep = q.id === 'status'; // Step 3
    const isAfterBankStep = q.id === 'bank'; // Step 4
    const isAfterTargetStep = q.id === 'target'; // Step 8 (last)

    if (q.type === 'chat') {
      const userText = answers[q.id] ?? '';
      setMessages((m) => [...m, { kind: 'user', text: userText || '', qId: q.id }]);

      if (step < QUESTIONS.length - 1) {
        setIsTransitioning(true);
        
        // Submit data SEBELUM pindah ke step berikutnya
        if (isAfterTargetStep) {
          // Last step - submit plan data
          try {
            await submitFormPlanData();
          } catch {
            setIsTransitioning(false);
            return; // Stop jika ada error
          }
        }
        
        const nextIndex = step + 1;
        setTimeout(() => {
          if (QUESTIONS[nextIndex].type === 'chat') {
            setMessages((m) => [...m, { kind: 'bot', text: QUESTIONS[nextIndex].text, qId: QUESTIONS[nextIndex].id }]);
          }
          setStep(nextIndex);
          setIsTransitioning(false);
        }, 350);
      } else {
        // Last question - submit dan redirect
        console.log('onboarding answers', answers);
        try {
          await submitFormPlanData();
          sleep(2).then(() => {
            router.push('/complete-on-boarding');
          });
        } catch {
          // Error already handled in submitFormPlanData
        }
      }
      return;
    }
    
   // Jika pertanyaan saat ini BUKAN 'chat' (misal: options, dropdown, addlist)
    if (step < QUESTIONS.length - 1) {
      setIsTransitioning(true);
      
      // Submit data SEBELUM pindah ke step berikutnya
      if (isAfterStatusStep) {
        // Submit form/user setelah status question
        try {
          await submitFormUserData();
        } catch {
          setIsTransitioning(false);
          return; // Stop jika ada error
        }
      } else if (isAfterBankStep) {
        // Submit form/account setelah bank question
        try {
          await submitFormAccountData();
        } catch {
          setIsTransitioning(false);
          return; // Stop jika ada error
        }
      }
      
      const nextIndex = step + 1;
      const nextQuestion = QUESTIONS[nextIndex];

      setTimeout(() => {
        // Cek apakah pertanyaan BERIKUTNYA adalah 'chat'.
        // Jika iya, kita akan memulai chat baru dari awal.
        if (nextQuestion.type === 'chat') {
          // Ganti seluruh riwayat pesan dengan pertanyaan pertama dari chat baru.
          setMessages([
            {
              kind: 'bot',
              text: nextQuestion.text,
              qId: nextQuestion.id,
            },
          ]);
        }
        
        // Lanjutkan ke step berikutnya
        setStep(nextIndex);
        setIsTransitioning(false);
      }, 350);

    } else {
      console.log('onboarding answers', answers);
    }
  }

  function goBack() {
    if (step <= 0) return;
    const prev = step - 1;

    const trimmed = messages.filter((m) => {
      if (!m.qId) return false;
      const qIndex = QUESTIONS.findIndex((q) => q.id === m.qId);
      return qIndex <= prev;
    });

    const newAnswers: Record<string, string> = {};
    QUESTIONS.forEach((q, idx) => {
      if (idx <= prev && answers[q.id]) newAnswers[q.id] = answers[q.id];
    });

    setMessages(trimmed);
    setAnswers(newAnswers);
    setStep(prev);
  }

  function hasAnswerFor(q: typeof QUESTIONS[number]) {
    const v = answers[q.id];
    if (!v) return false;
    if (q.type === 'addlist') {
      return v.split('|').filter(Boolean).length > 0;
    }
    return v.toString().trim().length > 0;
  }

  let displayText = current.text;
  if (current.id === 'bank') {
    const bankAnswer = answers['bank'] || '';
    const bankCount = bankAnswer.split('|').filter(Boolean).length;

    if (bankCount === 1) {
      displayText = "Bagus 1 bank udh cukup, tapi mungkin 3 better deh";
    } else if (bankCount === 2) {
      displayText = "Bagus 2 bank udh cukup, tapi mungkin 3 better deh";
    } else if (bankCount >= 3) {
      displayText = "Mantap anda calon orang sukses :D";
    }

  }

  const isChatLayout = current.type === 'chat';

  // Show loading indicator while fetching initial data
  if (isLoadingData) {
    return (
     <LoadingScreen/>
    );
  }

  return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col h-[100dvh]">
        <div className="flex items-center gap-3 sm:gap-4 pt-6 sm:pt-8 pb-4">
          <button onClick={goBack} className="text-white/60 text-base sm:text-lg">←</button>
          <div className="flex-1">
            <ProgressBar value={step} max={QUESTIONS.length - 1} />
          </div>
        </div>

        {isChatLayout ? (
          <>
            {/* Mobile Layout - Chat Style */}
            <div className="flex-1 flex flex-col overflow-hidden sm:hidden">
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto px-1 pb-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex items-end gap-2 ${m.kind === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.kind === 'bot' && (
                      <AvatarBubble src={Avatar} size={32} />
                    )}
                    <div className={`max-w-[75%] ${m.kind === 'user' ? 'order-2' : 'order-1'}`}>
                      <ChatBubble side={m.kind === 'user' ? 'right' : 'left'}>{m.text}</ChatBubble>
                    </div>
                    {m.kind === 'user' && (
                      <AvatarBubble src={AvatarRight} size={32} />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Fixed Input Bar at Bottom - Mobile */}
              <div className="pt-3 sm:pt-4 pb-6 sm:pb-8">
                <InputBar
                  value={answers[current.id] || ''}
                  placeholder={current.placeholder || 'Type your answer'}
                  onChange={handleAnswerChange}
                  onContinue={handleContinue}
                  disabled={isTransitioning}
                />
              </div>
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden sm:flex items-start gap-6 md:gap-8 flex-1 overflow-hidden">
              <AvatarBubble src={Avatar} size={window.innerWidth < 768 ? 80 : 112} />
              <div className="flex-1 flex flex-col h-full">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-3">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex items-start gap-3 md:gap-4 ${m.kind === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.kind === 'user' && (
                        <>
                          <ChatBubble side="right">{m.text}</ChatBubble>
                          <AvatarBubble src={AvatarRight} size={48} />
                        </>
                      )}
                      {m.kind === 'bot' && (
                        <ChatBubble side="left">{m.text}</ChatBubble>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="pt-4 pb-8">
                  <InputBar
                    value={answers[current.id] || ''}
                    placeholder={current.placeholder || 'Type your answer'}
                    onChange={handleAnswerChange}
                    onContinue={handleContinue}
                    disabled={isTransitioning}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center flex-1 overflow-y-auto">
            <div className="w-full max-w-3xl py-4">
              <div className="flex items-start gap-3 sm:gap-6 md:gap-8">
                <AvatarBubble src={Avatar} size={window.innerWidth < 640 ? 64 : window.innerWidth < 768 ? 80 : 112} />
                <div className="flex-1">
                  <div className="mb-6 sm:mb-8">
                    <ChatBubble side="left">{displayText}</ChatBubble>
                  </div>
                  <div className="mb-6 sm:mb-8">
                    <QuestionRenderer
                      question={current}
                      value={answers[current.id]}
                      onChange={(v) => setAnswers((a) => ({ ...a, [current.id]: v }))}
                      onSelectNext={handleContinue}
                      availableBanks={banks.map(b => b.code_name)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleContinue}
                      disabled={!hasAnswerFor(current)}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 cursor-pointer rounded-full text-black font-semibold transition text-base sm:text-lg ${hasAnswerFor(current) ? 'bg-[#00F5A0]' : 'bg-white/20 cursor-not-allowed'}`}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
   
  );
}

