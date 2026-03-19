/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { QUIZ_STEPS } from '../constants';
import { QuizState, StyleVibe } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Stylist3D from './Stylist3D';

interface QuizProps {
  mode: 'general' | 'ai';
  onComplete: (state: QuizState) => void | Promise<void>;
  onBack: () => void;
}

export default function Quiz({ mode, onComplete, onBack }: QuizProps) {
  const steps = React.useMemo(() => {
    if (mode === 'general') {
      // Mood, Palette, Vibe, Drape
      return QUIZ_STEPS.filter(s => [2, 3, 4, 5].includes(s.id));
    } else {
      // Gender, Size, Mood, Palette, Vibe
      return QUIZ_STEPS.filter(s => [1, 6, 2, 3, 4].includes(s.id));
    }
  }, [mode]);

  const [state, setState] = React.useState<QuizState>({
    step: 1,
    gender: mode === 'general' ? 'female' : null, // Default for general
    moodSelection: null,
    colorPalette: null,
    vibe: null,
    silhouette: null,
    size: mode === 'general' ? 'M' : null, // Default for general
    mode
  });

  const currentStep = steps[state.step - 1];
  
  // Filter options for step 3 based on mood selection
  const options = currentStep.id === 3 
    ? currentStep.options.filter((opt: any) => opt.mood === state.moodSelection)
    : currentStep.options;

  const handleBack = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    } else {
      onBack();
    }
  };

  const handleSelect = (optionId: string) => {
    const newState = { ...state };
    const stepId = currentStep.id;

    if (stepId === 1) newState.gender = optionId as 'male' | 'female';
    if (stepId === 2) newState.moodSelection = optionId;
    if (stepId === 3) newState.colorPalette = optionId;
    if (stepId === 4) newState.vibe = optionId as StyleVibe;
    if (stepId === 5) newState.silhouette = optionId;
    if (stepId === 6) newState.size = optionId;

    if (state.step < steps.length) {
      setState({ ...newState, step: state.step + 1 });
    } else {
      onComplete(newState);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 bg-secondary overflow-y-auto">
      <div className="w-full max-w-2xl py-12">
        <div className="mb-12 flex justify-between items-center">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Step 0{state.step} / 0{steps.length}</span>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 w-8 transition-colors duration-500 ${i + 1 <= state.step ? 'bg-primary' : 'bg-accent'}`} 
              />
            ))}
          </div>
        </div>

        <motion.div
          key={state.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase mb-12 leading-tight">
            {currentStep.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option: any) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="group relative aspect-[4/5] overflow-hidden bg-accent text-left"
              >
                {currentStep.id === 1 ? (
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <Stylist3D gender={option.id as 'male' | 'female'} />
                  </div>
                ) : option.image && (
                  <img 
                    src={option.image} 
                    alt={option.label} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {option.colors && (
                  <div className="absolute inset-0 flex flex-col">
                    {option.colors.map((c: string, i: number) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-secondary">
                  <span className="text-sm uppercase tracking-widest font-medium">{option.label}</span>
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
