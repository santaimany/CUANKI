"use client";
import React, { useState, useEffect, useRef,  } from 'react';;
import { useRouter } from 'next/navigation';

import ProgressBar from '@/components/onboarding/ProgressBar';
import AvatarBubble from '@/components/onboarding/AvatarBubble';
import ChatBubble from '@/components/onboarding/ChatBubble';
import InputBar from '@/components/onboarding/InputBar';
import QuestionRenderer from '@/components/onboarding/QuestionRenderer';
import Avatar from '@/assets/getstarted/image/avatar-logo.svg';
import AvatarRight from '@/assets/getstarted/image/right-logo.svg';
import { QUESTIONS } from '@/data/questionData';


export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  type Message = { kind: 'bot' | 'user'; text: string; qId?: string };
  const [messages, setMessages] = useState<Message[]>([{ kind: 'bot', text: QUESTIONS[0].text, qId: QUESTIONS[0].id }]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const current = QUESTIONS[step];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}


  useEffect(() => {
    if (current.type === 'chat') {
        scrollToBottom();
    }
  }, [messages, current.type]);

  function handleAnswerChange(v: string) {
    const cleaned = current.id === 'age' ? v.replace(/\D+/g, '') : v;
    setAnswers((a) => ({ ...a, [current.id]: cleaned }));
  }

  function handleContinue() {
    const q = QUESTIONS[step];
    if (!hasAnswerFor(q)) return;

    if (q.type === 'chat') {
      const userText = answers[q.id] ?? '';
      setMessages((m) => [...m, { kind: 'user', text: userText || '', qId: q.id }]);

      if (step < QUESTIONS.length - 1) {
        setIsTransitioning(true);
        const nextIndex = step + 1;
        setTimeout(() => {
          if (QUESTIONS[nextIndex].type === 'chat') {
            setMessages((m) => [...m, { kind: 'bot', text: QUESTIONS[nextIndex].text, qId: QUESTIONS[nextIndex].id }]);
          }
          setStep(nextIndex);
          setIsTransitioning(false);
        }, 350);
      } else {
        console.log('onboarding answers', answers);
        sleep(2).then(() => {
          router.push('/complete-on-boarding');
        });
      }
      return;
    }
   // Jika pertanyaan saat ini BUKAN 'chat' (misal: options, dropdown)
    if (step < QUESTIONS.length - 1) {
      const nextIndex = step + 1;
      const nextQuestion = QUESTIONS[nextIndex];

      // --- INI LOGIKA BARUNYA ---
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

