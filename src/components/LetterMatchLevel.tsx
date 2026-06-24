import React, { useState, useEffect } from 'react';
import { LETTER_OTTU_PAIRS } from '../data/teluguData';
import { LetterOttuPair } from '../types';
import { audioEffects } from '../utils/audio';
import { Check, Star, RefreshCw, Award, Volume2, ArrowRight } from 'lucide-react';

interface LetterMatchLevelProps {
  onComplete: (score: number, stars: number) => void;
  onBackToMap: () => void;
}

export default function LetterMatchLevel({ onComplete, onBackToMap }: LetterMatchLevelProps) {
  // We'll split the 10 letters into 2 rounds of 5 each
  const [round, setRound] = useState<number>(1);
  const [activePairs, setActivePairs] = useState<LetterOttuPair[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<LetterOttuPair[]>([]);
  const [shuffledOttus, setShuffledOttus] = useState<LetterOttuPair[]>([]);
  
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [selectedOttuId, setSelectedOttuId] = useState<string | null>(null);
  
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<{ letterId: string; ottuId: string } | null>(null);
  
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Initialize round
  useEffect(() => {
    // Round 1: first 5; Round 2: last 5
    const startIdx = (round - 1) * 5;
    const endIdx = startIdx + 5;
    const pairs = LETTER_OTTU_PAIRS.slice(startIdx, endIdx);
    
    setActivePairs(pairs);
    
    // Shuffle separately for left and right columns
    setShuffledLetters([...pairs].sort(() => Math.random() - 0.5));
    setShuffledOttus([...pairs].sort(() => Math.random() - 0.5));
    
    setSelectedLetterId(null);
    setSelectedOttuId(null);
    setMatchedIds(new Set());
    setWrongMatch(null);
  }, [round]);

  const handleLetterClick = (id: string) => {
    if (matchedIds.has(id)) return;
    audioEffects.playClick();
    setSelectedLetterId(id);
    setWrongMatch(null);

    // Auto check if both are selected
    if (selectedOttuId) {
      checkMatch(id, selectedOttuId);
    }
  };

  const handleOttuClick = (id: string) => {
    const isMatched = Array.from(matchedIds).some(mId => {
      const p = LETTER_OTTU_PAIRS.find(x => x.id === mId);
      return p?.id === id;
    });
    if (isMatched) return;
    
    audioEffects.playClick();
    setSelectedOttuId(id);
    setWrongMatch(null);

    if (selectedLetterId) {
      checkMatch(selectedLetterId, id);
    }
  };

  const checkMatch = (letterId: string, ottuId: string) => {
    setAttempts(prev => prev + 1);
    
    if (letterId === ottuId) {
      // Correct Match!
      audioEffects.playCorrect();
      const newMatched = new Set(matchedIds);
      newMatched.add(letterId);
      setMatchedIds(newMatched);
      setScore(prev => prev + 10);
      
      setSelectedLetterId(null);
      setSelectedOttuId(null);

      // Check if round complete
      if (newMatched.size === 5) {
        setTimeout(() => {
          if (round === 1) {
            audioEffects.playSuccess();
            // Go to round 2
            setRound(2);
          } else {
            audioEffects.playSuccess();
            setShowSummary(true);
          }
        }, 800);
      }
    } else {
      // Incorrect Match
      audioEffects.playIncorrect();
      setWrongMatch({ letterId, ottuId });
      
      // Flash red and reset selection
      setTimeout(() => {
        setSelectedLetterId(null);
        setSelectedOttuId(null);
        setWrongMatch(null);
      }, 800);
    }
  };

  const handleTTS = (text: string) => {
    audioEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN'; // Telugu
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const calculateStars = () => {
    const perfectAttempts = 10; // 10 matches total (5 in R1, 5 in R2)
    if (attempts <= perfectAttempts + 2) return 3;
    if (attempts <= perfectAttempts + 5) return 2;
    return 1;
  };

  const handleFinish = () => {
    const finalStars = calculateStars();
    onComplete(score, finalStars);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-200/60 max-w-4xl mx-auto" id="letter-match-level">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-amber-100 pb-4 mb-6">
        <div>
          <span className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            ఆట 1 • స్థాయి 1 (Game 1 • Level 1)
          </span>
          <h2 className="text-2xl font-bold text-amber-900 mt-1 flex items-center gap-2">
            అక్షరాలు - ఒత్తులు జతచేయడం
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Match the letters on the left with their correct Subscript &apos;Ottu&apos; sign on the right.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
          <div className="text-center">
            <p className="text-xs text-amber-700 font-medium uppercase">మొత్తం స్కోరు (Score)</p>
            <p className="text-lg font-black text-amber-900">{score}</p>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div className="text-center">
            <p className="text-xs text-amber-700 font-medium uppercase">రౌండ్ (Round)</p>
            <p className="text-lg font-black text-amber-900">{round}/2</p>
          </div>
        </div>
      </div>

      {!showSummary ? (
        <div>
          <div className="bg-amber-50/50 rounded-2xl p-4 mb-6 text-center text-amber-950 font-medium text-sm md:text-base border border-amber-100 flex justify-center items-center gap-2">
            💡 <span className="font-bold">ఆట ఎలా ఆడాలి:</span> ఎడమవైపు ఉన్న అక్షరాన్ని, కుడివైపు ఉన్న దానికి సరిపోయే ఒత్తును ఎంచుకోండి.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative min-h-[350px]">
            {/* Left Column: Letters */}
            <div className="space-y-3 flex flex-col justify-center">
              <h3 className="text-center text-sm font-bold text-slate-500 tracking-wider uppercase mb-2">
                హల్లులు (Letters)
              </h3>
              {shuffledLetters.map((pair) => {
                const isMatched = matchedIds.has(pair.id);
                const isSelected = selectedLetterId === pair.id;
                const isWrong = wrongMatch?.letterId === pair.id;

                return (
                  <button
                    key={`letter-${pair.id}`}
                    id={`btn-letter-${pair.id}`}
                    onClick={() => handleLetterClick(pair.id)}
                    disabled={isMatched}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-2xl text-left font-bold transition-all duration-200 border-2
                      ${isMatched 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 pointer-events-none scale-95' 
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-800 animate-bounce'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-md scale-102 scale-y-101'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300 hover:scale-101'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-amber-700 text-2xl font-black shadow-inner">
                        {pair.letter}
                      </span>
                      <div>
                        <p className="text-lg font-bold text-slate-800">{pair.letter}</p>
                        <p className="text-xs text-slate-400 font-normal">Telugu consonant</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTTS(pair.letter);
                        }}
                        className="p-1.5 hover:bg-amber-100 rounded-lg text-slate-400 hover:text-amber-600 transition"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {isMatched && <Check className="w-6 h-6 text-emerald-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Ottulu */}
            <div className="space-y-3 flex flex-col justify-center">
              <h3 className="text-center text-sm font-bold text-slate-500 tracking-wider uppercase mb-2">
                ఒత్తులు (Ottu Signs)
              </h3>
              {shuffledOttus.map((pair) => {
                const isMatched = matchedIds.has(pair.id);
                const isSelected = selectedOttuId === pair.id;
                const isWrong = wrongMatch?.ottuId === pair.id;

                return (
                  <button
                    key={`ottu-${pair.id}`}
                    id={`btn-ottu-${pair.id}`}
                    onClick={() => handleOttuClick(pair.id)}
                    disabled={isMatched}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-2xl text-left font-bold transition-all duration-200 border-2
                      ${isMatched 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 pointer-events-none scale-95' 
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-800 animate-bounce'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-md scale-102 scale-y-101'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300 hover:scale-101'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 text-3xl font-black shadow-inner">
                        {pair.displayOttu}
                      </span>
                      <div>
                        <p className="text-lg font-bold text-slate-800">{pair.name}</p>
                        <p className="text-xs text-slate-400 font-normal">Subscript form</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTTS(pair.letter + " ఒత్తు");
                        }}
                        className="p-1.5 hover:bg-amber-100 rounded-lg text-slate-400 hover:text-amber-600 transition"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {isMatched && <Check className="w-6 h-6 text-emerald-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Summary view for level 1 */
        <div className="text-center py-8 px-4" id="level1-summary">
          <div className="inline-flex p-4 bg-emerald-50 rounded-full border-4 border-emerald-200 mb-4 animate-bounce">
            <Award className="w-16 h-16 text-emerald-600" />
          </div>
          
          <h3 className="text-3xl font-black text-slate-800">మంచి పని! (Great Job!)</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            You matched all Telugu consonant characters with their respective &apos;ottu&apos; subscripts successfully!
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
              <p className="text-xs text-slate-500 font-bold uppercase">పొందిన మార్కులు (Score)</p>
              <p className="text-2xl font-black text-indigo-600">+{score}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">ప్రయత్నాలు (Attempts)</p>
              <p className="text-2xl font-black text-slate-700">{attempts}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setRound(1);
                setScore(0);
                setAttempts(0);
                setShowSummary(false);
              }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition flex items-center justify-center gap-2 border border-slate-300"
            >
              <RefreshCw className="w-5 h-5" /> మళ్ళీ ఆడు (Play Again)
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 hover:scale-102"
            >
              తదుపరి స్థాయికి వెళ్ళు (Next Level) <ArrowRight className="w-5 h-5" />
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
