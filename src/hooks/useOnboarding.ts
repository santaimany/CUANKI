import { useState, useEffect } from 'react';

type OnboardingState = {
  step: number;
  answers: Record<string, unknown>;
};

const STORAGE_KEY = 'cuanki:onboarding';

export default function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({ step: 1, answers: {} });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const setAnswer = (key: string, value: unknown) => {
    setState(prev => ({ ...prev, answers: { ...prev.answers, [key]: value } }));
  };

  const next = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prev = () => setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  const reset = () => setState({ step: 1, answers: {} });

  return { state, setAnswer, next, prev, reset, setState };
}
