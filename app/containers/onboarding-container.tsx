"use client";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useState } from "react";

import StepIndicator, {
  OnboardingButtons,
  useOnboarding,
} from "../contexts/onboarding.context";

export const Onboarding: React.FC = () => {
  const { currentStep, totalSteps, setData, nextStep } = useOnboarding();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const handleOneClick = () => {
    setData((d) => ({ ...d, first_name: fName, last_name: lName }));
    nextStep();
  };

  switch (currentStep) {
    case 1:
      return (
        <OnboardingContainer>
          <section className="w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            <div className="w-full flex flex-col items-center justify-center space-y-6">
              <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
                Welcome to Wheelee
              </h1>
              <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-lg">
                This is an onboarding screen. We're glad to have you here. Let's
                get started with our app!
              </p>
              <div className="w-full max-w-md flex flex-col gap-3">
                <input
                  type="text"
                  id="name"
                  className="block w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your first name"
                  required
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />

                <input
                  type="text"
                  id="name"
                  className="block w-full p-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your last name"
                  required
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
            </div>
            <OnboardingButtons onNext={() => handleOneClick()} />
          </section>
        </OnboardingContainer>
      );
    case 2:
      return (
        <OnboardingContainer>
          <section className="w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex flex-col items-center justify-center space-y-6">
              <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
                You're All Set!
              </h1>
              <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-lg">
                You've successfully completed the onboarding process. Let's dive
                into the app now!
              </p>
              <OnboardingButtons />
            </div>
          </section>
        </OnboardingContainer>
      );
    default:
  }
};

function OnboardingContainer({ children }: { children: React.ReactNode }) {
  const variants: Variants = {
    initial: {
      opacity: 0,
      x: "-10%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: "10%",
      transition: {
        type: "spring",
        duration: 0.3,
      },
    },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
