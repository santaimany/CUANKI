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


export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();

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
        alert('Please register or login first');
        window.location.href = '/register';
        return;
      }

      const cityName = answers['city'] || '';
      const selectedOrigin = origins.find(o => o.city_province === cityName);
      const originId = selectedOrigin ? selectedOrigin.id : 0;

      // Status mapping - backend biasanya expect lowercase atau specific values
      // "Mahasiswa" → "mahasiswa" atau "student"
      // "Pelajar" → "pelajar" atau "student"
      const statusValue = answers['status'] || '';
      let statusMapped = statusValue.toLowerCase(); // Default: lowercase
      
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
    } catch (error) {
      console.error('❌ Error submitting user data:', error);
      alert('Failed to submit user data. Please try again.');
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
      alert('Failed to submit bank data. Please try again.');
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
        saving_target_duration: parseInt(answers['target']) * 12 || 0, // Convert tahun ke bulan
      };
      
      console.log('📝 Step 3: Submitting plan data:', planData);
      await submitFormPlan(planData);
      console.log('✅ Plan data submitted successfully');
      console.log('🎉 All onboarding data submitted successfully!');
    } catch (error) {
      console.error('❌ Error submitting plan data:', error);
      alert('Failed to submit plan data. Please try again.');
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
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-[100dvh]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
  
      <div className="w-full  max-w-7xl mx-auto px-6 flex flex-col h-[100dvh]">
        <div className="flex items-center gap-4 pt-8 pb-4">
          <button onClick={goBack} className="text-white/60 text-lg">←</button>
          <div className="flex-1">
            <ProgressBar value={step} max={QUESTIONS.length - 1} />
          </div>
        </div>

        {isChatLayout ? (
          <div className="flex items-start gap-8 flex-1 overflow-hidden">
            <AvatarBubble src={Avatar} size={112} />
            <div className="flex-1 flex flex-col h-full">
                   <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-3">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex items-start gap-4 ${m.kind === 'user' ? 'justify-end' : 'justify-start'}`}>
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
        ) : (
          <div className="w-full flex items-center justify-center flex-1">
            <div className="w-full max-w-3xl">
              <div className="flex items-start gap-8">
                <AvatarBubble src={Avatar} size={112} />
                <div className="flex-1">
                  <div className="mb-8">
                    {/* 2. GUNAKAN 'displayText' DI SINI */}
                    <ChatBubble side="left">{displayText}</ChatBubble>
                  </div>
                  <div className="mb-8">
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
                      className={`px-6 py-3 cursor-pointer rounded-full text-black font-semibold transition text-lg ${hasAnswerFor(current) ? 'bg-[#00F5A0]' : 'bg-white/20 cursor-not-allowed'}`}>
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

