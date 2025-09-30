import OnboardingBackgroundLayout from "@/components/onboarding/OnboardingBackgroundLayout";



export default function QuestionLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingBackgroundLayout className="min-h-screen  flex flex-col">
      {children}
    </OnboardingBackgroundLayout>
  );
}