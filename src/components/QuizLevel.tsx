import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/teluguData';
import { audioEffects } from '../utils/audio';
import { Star, RefreshCw, Award, Volume2, ArrowRight, HelpCircle, Check, X } from 'lucide-react';

interface QuizLevelProps {
  onComplete: (score: number, stars: number) => void;
  onBackToMap: () => void;
}

export default function QuizLevel({ onComplete, onBackToMap }: QuizLevelProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionClick = (option: string) => {
    if (hasAnswered) return;

    audioEffects.playClick();
    setSelectedAnswer(option);
    setHasAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      audioEffects.playCorrect();
      setScore(prev => prev + 20);
    } else {
      audioEffects.playIncorrect();
      setMistakes(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!hasAnswered) return;

    audioEffects.playClick();
    setSelectedAnswer(null);
    setHasAnswered(false);

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      audioEffects.playSuccess();
      setShowSummary(true);
    }
  };

  const handleTTS = (text: string) => {
    audioEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const calculateStars = () => {
    if (mistakes === 0) return 3;
    if (mistakes <= 1) return 3;
    if (mistakes <= 2) return 2;
    return 1;
  };

  const handleFinish = () => {
    const finalStars = calculateStars();
    onComplete(score, finalStars);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setMistakes(0);
    setShowSummary(false);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-200/60 max-w-4xl mx-auto" id="quiz-level">
      {/* Level Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-amber-100 pb-4 mb-6">
        <div>
          <span className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            ఆట 4 • స్థాయి 4 (Game 4 • Level 4)
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1 flex items-center gap-2">
            పదాల జ్ఞాన పరిశీలన క్విజ్
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Test your comprehension of Telugu double consonants (Dwitvaksharamulu) and worksheets.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
          <div className="text-center">
            <p className="text-xs text-amber-700 font-medium uppercase font-sans">స్కోరు (Score)</p>
            <p className="text-lg font-black text-amber-900">{score}</p>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div className="text-center">
            <p className="text-xs text-amber-700 font-medium uppercase font-sans">ప్రశ్న (Question)</p>
            <p className="text-lg font-black text-amber-900">{currentIdx + 1}/{QUIZ_QUESTIONS.length}</p>
          </div>
        </div>
      </div>

      {!showSummary ? (
        <div className="space-y-6">
          {/* Question Presentation Card */}
          <div className="bg-gradient-to-br from-amber-50/20 to-orange-50/20 border border-amber-100 rounded-3xl p-6 shadow-sm relative">
            <div className="absolute top-4 left-4 bg-amber-100/80 p-2 rounded-xl text-amber-800">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-4 py-4 px-6">
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase block font-sans">ప్రశ్న (Question)</span>
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-relaxed">
                  {currentQuestion.question}
                </h3>
                <button
                  onClick={() => handleTTS(currentQuestion.question)}
                  className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full text-amber-700 transition shadow-sm shrink-0"
                  title="Read aloud"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let optionStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-md ring-2 ring-emerald-200';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-800 shadow-sm ring-2 ring-rose-200';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={option}
                  id={`btn-quiz-option-${option}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={hasAnswered}
                  className={`
                    w-full flex items-center justify-between p-5 rounded-2xl text-left font-bold text-lg md:text-xl transition-all duration-200 border-2 active:scale-98 cursor-pointer
                    ${optionStyle}
                  `}
                >
                  <span className="break-words max-w-[85%]">{option}</span>
                  
                  {hasAnswered && isCorrect && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
                      <X className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation panel shown after answering */}
          {hasAnswered && (
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow-xs animate-fadeIn space-y-2" id="quiz-explanation">
              <h4 className="text-xs font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2 font-sans">
                💡 వివరణ (Explanation)
              </h4>
              <p className="text-sm font-semibold text-indigo-950 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/10 transition flex items-center gap-1.5 hover:scale-102"
                >
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'తదుపరి ప్రశ్న (Next Question)' : 'క్విజ్ ముగించు (Finish Quiz)'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Summary view for level 4 */
        <div className="text-center py-8 px-4" id="level4-summary">
          <div className="inline-flex p-4 bg-emerald-50 rounded-full border-4 border-emerald-200 mb-4 animate-bounce">
            <Award className="w-16 h-16 text-emerald-600" />
          </div>

          <h3 className="text-3xl font-black text-slate-800 font-sans">క్విజ్ విజయవంతంగా పూర్తయింది!</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Wonderful! You answered all conceptual questions about Telugu double consonants (Dwitvaksharamulu) successfully!
          </p>

          {/* Stars display */}
          <div className="flex justify-center gap-2 my-6">
            {[1, 2, 3].map((starIdx) => {
              const gained = starIdx <= calculateStars();
              return (
                <Star
                  key={starIdx}
                  className={`w-10 h-10 ${gained ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-200'}`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase font-sans">పొందిన మార్కులు (Score)</p>
              <p className="text-2xl font-black text-indigo-600">+{score}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase font-sans">తప్పులు (Errors)</p>
              <p className="text-2xl font-black text-slate-700">{mistakes}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition flex items-center justify-center gap-2 border border-slate-300"
            >
              <RefreshCw className="w-5 h-5" /> మళ్ళీ ఆడు (Play Again)
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 hover:scale-102"
            >
              ఆట ముగించు (Finish Game Map) <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer back button */}
      {!showSummary && (
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between">
          <button
            onClick={onBackToMap}
            className="px-5 py-2 text-slate-600 hover:text-slate-800 font-semibold text-sm hover:bg-slate-100 rounded-xl transition"
          >
            ← తిరిగి వెళ్ళు (Back to Menu)
          </button>
        </div>
      )}
    </div>
  );
}
