"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface OnboardingInfo {
  firstName?: string;
  lastName?: string;
  hasCompleted?: boolean;
}

type CurrentStep = 1 | 2 | 3;
interface OnboardingContext {
  currentStep: CurrentStep;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<CurrentStep>>;
  data: OnboardingInfo;
  setData: React.Dispatch<React.SetStateAction<OnboardingInfo>>;
  nextStep: (skip?: boolean) => void;
  previousStep: (skip?: boolean) => void;
  isLoading: boolean;
}

export const OnboardingContext = React.createContext<OnboardingContext | null>(
  null
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<CurrentStep>(1);
  const [isLoading, setLoading] = React.useState(false);

  const initSettings = {};
  const [data, setData] = React.useState<OnboardingInfo>(initSettings);

  const totalSteps = 3;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleFinish = async () => {
    setLoading(true);
    try {
      console.log("Done", data);
    } catch (error) {
      console.error(error);
    } finally {
      // If it fails, just send the user to the Dashboard
      setFinishPath();
    }
  };

  const setFinishPath = () => {
    router.push("/dashboard");
  };

  const nextStep = async (skip?: boolean) => {
    if (skip) {
      await handleFinish();
    }

    if (currentStep < totalSteps) {
      setCurrentStep((s) => (s + 1) as CurrentStep);
      return;
    }

    await handleFinish();
  };

  const previousStep = () => {
    setCurrentStep((s) => (s - 1) as CurrentStep);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        setCurrentStep,
        data,
        setData,
        nextStep,
        isLoading,
        previousStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = (): OnboardingContext => {
  const context = React.useContext(OnboardingContext);

  if (context === null) {
    throw new Error("useOnboarding must be used within a OnboardingProvider");
  }

  return context;
};

interface OnboardingButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
  disableNext?: boolean;
  skipToFinish?: boolean;
  isLoading?: boolean;
}
export const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  onPrev,
  onNext,
  disableNext = false,
}) => {
  const { previousStep, nextStep } = useOnboarding();

  const handleBack = () => {
    if (!onPrev) {
      previousStep();
      return;
    }

    onPrev();
  };

  const handleNext = () => {
    if (!onNext) {
      nextStep();
      return;
    }

    onNext();
  };

  return (
    <div className="flex justify-between mt-5 min-w-44">
      <Button variant={"outline"} onClick={handleBack}>
        Back
      </Button>
      <Button variant={"default"} onClick={handleNext} disabled={disableNext}>
        Next
      </Button>
    </div>
  );
};

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-center space-x-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index + 1 <= currentStep ? "bg-blue-500" : "bg-blue-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
