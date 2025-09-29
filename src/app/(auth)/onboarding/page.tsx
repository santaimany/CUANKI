"use client";
import React, { useState } from 'react';
import OnboardingBackgroundLayout from '@/components/onboarding/OnboardingBackgroundLayout';
import ProgressBar from '@/components/onboarding/ProgressBar';
import AvatarBubble from '@/components/onboarding/AvatarBubble';
import ChatBubble from '@/components/onboarding/ChatBubble';
import InputBar from '@/components/onboarding/InputBar';
import QuestionRenderer from '@/components/onboarding/QuestionRenderer';

type Question = {
  id: string;
  type?: 'chat' | 'dropdown' | 'options' | 'addlist';
  text: string;
  options?: string[];
  placeholder?: string;
};

const QUESTIONS: Question[] = [
  { id: 'name', type: 'chat', text: 'Nama kamu siapa?', placeholder: 'Andrian' },
  { id: 'age', type: 'chat', text: 'Umur kamu berapa?', placeholder: '20' },
  { id: 'city', type: 'dropdown', text: 'Asal kamu dari mana?', options: ['Malang', 'Madiun', 'Medan', 'Magelang'] },
  { id: 'status', type: 'options', text: 'Status anda saat ini?', options: ['Pekerja', 'Pelajar'] },
  { id: 'bank', type: 'addlist', text: 'Yuk kita input bank kamu apa aja!' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  type Message = { kind: 'bot' | 'user'; text: string; qId?: string };
  const [messages, setMessages] = useState<Message[]>([{ kind: 'bot', text: QUESTIONS[0].text, qId: QUESTIONS[0].id }]);

  const current: Question = QUESTIONS[step];

  function handleAnswerChange(v: string) {
    // if current is age, allow only digits
    const cleaned = current.id === 'age' ? v.replace(/\D+/g, '') : v;
    setAnswers((a) => ({ ...a, [current.id]: cleaned }));
  }

  function handleContinue() {
    const q = QUESTIONS[step];
    // require non-empty answer for any question
    if (!hasAnswerFor(q)) return;

    if (q.type === 'chat') {
      // Prepare user text depending on type and append as chat bubble
      const userText = answers[q.id] ?? '';
      setMessages((m) => [...m, { kind: 'user', text: userText || '', qId: q.id }]);

      if (step < QUESTIONS.length - 1) {
        setIsTransitioning(true);
        const nextIndex = step + 1;
        setTimeout(() => {
          // only append bot message if next is also chat; otherwise we'll switch to centered UI
          if (QUESTIONS[nextIndex].type === 'chat') {
            setMessages((m) => [...m, { kind: 'bot', text: QUESTIONS[nextIndex].text, qId: QUESTIONS[nextIndex].id }]);
          }
          setStep(nextIndex);
          setIsTransitioning(false);
        }, 350);
      } else {
        console.log('onboarding answers', answers);
      }

      return;
    }

    // Non-chat: just advance the step and show the new centered question UI (do not append to chat thread)
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
    else console.log('onboarding answers', answers);
  }

  function goBack() {
    if (step <= 0) return;
    const prev = step - 1;

    // trim messages to only those up to prev question
    const trimmed = messages.filter((m) => {
      if (!m.qId) return false;
      const qIndex = QUESTIONS.findIndex((q) => q.id === m.qId);
      return qIndex <= prev;
    });

    // remove answers for questions after prev
    const newAnswers: Record<string, string> = {};
    QUESTIONS.forEach((q, idx) => {
      if (idx <= prev && answers[q.id]) newAnswers[q.id] = answers[q.id];
    });

    setMessages(trimmed);
    setAnswers(newAnswers);
    setStep(prev);
  }

  function hasAnswerFor(q: Question) {
    const v = answers[q.id];
    if (!v) return false;
    if (q.type === 'addlist') {
      return v.split('|').filter(Boolean).length > 0;
    }
    return v.toString().trim().length > 0;
  }

  return (
    <OnboardingBackgroundLayout>
      <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="text-white/60">←</button>
          <div className="flex-1">
            <ProgressBar value={step} max={QUESTIONS.length - 1} />
          </div>
        </div>

        {current.type === 'chat' ? (
          <div className="flex items-start gap-6">
            <AvatarBubble src={'/assets/avatar-placeholder.png'} size={96} />

            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.kind === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <ChatBubble side={m.kind === 'user' ? 'right' : 'left'}>{m.text}</ChatBubble>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <QuestionRenderer
                  question={current}
                  value={answers[current.id]}
                  onChange={handleAnswerChange}
                  onSelectNext={handleContinue}
                />

                <div className="mt-4">
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
          </div>
        ) : (
          // centered full-area question UI for non-chat steps
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <div className="flex items-start gap-6">
                <AvatarBubble src={'/assets/avatar-placeholder.png'} size={96} />

                <div className="flex-1">
                  <div className="mb-6">
                    <ChatBubble side="left">{current.text}</ChatBubble>
                  </div>

                  <div className="mb-6">
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
                      className={`px-4 py-2 rounded-full text-black font-semibold transition ${hasAnswerFor(current) ? 'bg-[#00F5A0]' : 'bg-white/20 cursor-not-allowed'}`}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnboardingBackgroundLayout>
  );
}
