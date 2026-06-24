import React, { useState } from 'react';
import { SENTENCE_EXERCISES } from '../data/teluguData';
import { audioEffects } from '../utils/audio';
import { Star, RefreshCw, Award, Volume2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SpellingFixerLevelProps {
  onComplete: (score: number, stars: number) => void;
  onBackToMap: () => void;
}

export default function SpellingFixerLevel({ onComplete, onBackToMap }: SpellingFixerLevelProps) {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(0);
  // Track resolved blanks for the current sentence
  const [resolvedBlanks, setResolvedBlanks] = useState<Record<number, boolean>>({});
  const [selectedBlankIdx, setSelectedBlankIdx] = useState<number | null>(null);
  
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [wrongOption, setWrongOption] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [sparkleWordIdx, setSparkleWordIdx] = useState<number | null>(null);

  const currentSentence = SENTENCE_EXERCISES[currentSentenceIdx];

  // Get words of the current sentence
  const words = currentSentence ? currentSentence.original.split(' ') : [];

  const handleWordClick = (wordIdx: number) => {
    if (showSummary) return;

    // Check if there is a blank for this word index
    const blankIdx = currentSentence.blanks.findIndex(b => b.wordIdx === wordIdx);
    if (blankIdx !== -1 && !resolvedBlanks[wordIdx]) {
      audioEffects.playClick();
      setSelectedBlankIdx(blankIdx);
      setWrongOption(null);
    }
  };

  const handleOttuSelection = (option: string) => {
    if (selectedBlankIdx === null || !currentSentence) return;

    const blank = currentSentence.blanks[selectedBlankIdx];
    
    if (option === blank.correctOttu) {
      // Correct spelling fix!
      audioEffects.playCorrect();
      const wordIdx = blank.wordIdx;
      
      setResolvedBlanks(prev => ({
        ...prev,
        [wordIdx]: true
      }));

      setSparkleWordIdx(wordIdx);
      setScore(prev => prev + 25);
      setSelectedBlankIdx(null);

      setTimeout(() => {
        setSparkleWordIdx(null);
        
        // Check if all blanks for the current sentence are fixed
        const totalBlanksInSentence = currentSentence.blanks.length;
        const currentResolvedCount = Object.keys(resolvedBlanks).length + 1; // including the one we just solved

        if (currentResolvedCount === totalBlanksInSentence) {
          audioEffects.playSuccess();
          
          // Wait and advance to next sentence or complete level
          setTimeout(() => {
            if (currentSentenceIdx + 1 < SENTENCE_EXERCISES.length) {
              setCurrentSentenceIdx(prev => prev + 1);
              setResolvedBlanks({});
            } else {
              setShowSummary(true);
            }
          }, 1500);
        }
      }, 800);

    } else {
      // Wrong option
      audioEffects.playIncorrect();
      setMistakes(prev => prev + 1);
      setWrongOption(option);

      setTimeout(() => {
        setWrongOption(null);
      }, 800);
    }
  };

  const handleTTS = (text: string) => {
    audioEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const calculateStars = () => {
    if (mistakes === 0) return 3;
    if (mistakes <= 2) return 3;
    if (mistakes <= 5) return 2;
    return 1;
  };

  const handleFinish = () => {
    const finalStars = calculateStars();
    onComplete(score, finalStars);
  };

  const handleReset = () => {
    setCurrentSentenceIdx(0);
    setResolvedBlanks({});
    setSelectedBlankIdx(null);
    setScore(0);
    setMistakes(0);
    setShowSummary(false);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-xl border-4 border-indigo-200/60 max-w-4xl mx-auto" id="spelling-fixer-level">
      {/* Level Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-indigo-100 pb-4 mb-6">
        <div>
          <span className="bg-indigo-100 text-indigo-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            ఆట 3 • స్థాయి 3 (Game 3 • Level 3)
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1 flex items-center gap-2">
            సరైన ఒత్తును చేర్చి వాక్యాన్ని రాయడం
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Identify the misspelled word in the sentence, add its missing subscript &apos;ottu&apos;, and restore the sentence!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
          <div className="text-center">
            <p className="text-xs text-indigo-700 font-medium uppercase">స్కోరు (Score)</p>
            <p className="text-lg font-black text-indigo-900">{score}</p>
          </div>
          <div className="w-px h-8 bg-indigo-200" />
          <div className="text-center">
            <p className="text-xs text-indigo-700 font-medium uppercase font-sans">వాక్యం (Sentence)</p>
            <p className="text-lg font-black text-indigo-900">{currentSentenceIdx + 1}/{SENTENCE_EXERCISES.length}</p>
          </div>
        </div>
      </div>

      {!showSummary ? (
        <div className="space-y-6">
          {/* Instruction helper */}
          <div className="bg-indigo-50/50 rounded-2xl p-4 text-center text-indigo-950 font-medium text-sm md:text-base border border-indigo-100">
            📝 కింది వాక్యంలో తప్పుగా ఉన్న పదాలపై (బంగారు రంగులో ఉన్నవి) నొక్కి, వాటికి సరైన ఒత్తును చేర్చి సరిదిద్దండి.
          </div>

          {/* Core Sentence Board */}
          <div className="bg-gradient-to-br from-indigo-50/30 to-slate-50 border-2 border-indigo-100 rounded-3xl p-8 shadow-inner text-center space-y-6 relative">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase block">
              వాక్యాన్ని పూర్తి చేయండి (Complete the Sentence)
            </span>

            {/* Rendered words with click interaction for blanks */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 leading-relaxed py-4">
              {words.map((word, wordIdx) => {
                const blank = currentSentence.blanks.find(b => b.wordIdx === wordIdx);
                const isSparkling = sparkleWordIdx === wordIdx;

                if (blank) {
                  const isResolved = resolvedBlanks[wordIdx];
                  return (
                    <button
                      key={wordIdx}
                      id={`sentence-word-${wordIdx}`}
                      onClick={() => handleWordClick(wordIdx)}
                      className={`
                        text-2xl md:text-3xl font-bold px-3 py-1.5 rounded-xl transition-all duration-300 relative
                        ${isResolved 
                          ? 'text-emerald-700 bg-emerald-50 border-2 border-emerald-300 scale-100' 
                          : 'text-amber-700 bg-amber-50 border-2 border-dashed border-amber-300 hover:bg-amber-100 hover:scale-105 cursor-pointer shadow-sm animate-pulse'
                        }
                        ${isSparkling ? 'scale-110 rotate-1 ring-4 ring-emerald-300' : ''}
                      `}
                    >
                      {isResolved ? blank.correct : blank.incorrect}
                      
                      {isSparkling && (
                        <span className="absolute -top-3 -right-3 text-amber-500 animate-ping">
                          <Sparkles className="w-6 h-6 fill-amber-400" />
                        </span>
                      )}
                    </button>
                  );
                }

                // Regular correct word
                return (
                  <span key={wordIdx} className="text-2xl md:text-3xl font-semibold text-slate-800">
                    {word}
                  </span>
                );
              })}

              {/* Speaker icon to read sentence */}
              <button
                onClick={() => handleTTS(currentSentence.corrected)}
                className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full text-indigo-700 transition shadow-sm ml-2"
                title="Read entire sentence"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Translation description */}
            <div className="pt-4 border-t border-indigo-100/60 max-w-xl mx-auto text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">English Meaning</span>
              <p className="text-sm font-medium text-slate-600 italic">
                &ldquo;{currentSentence.translation}&rdquo;
              </p>
            </div>
          </div>

          {/* Interactive Popover Panel for active spelling correction */}
          {selectedBlankIdx !== null && (
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn" id="popover-correction">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Spelling Fixer Dashboard</span>
                <p className="text-slate-800 font-bold">
                  What is the correct subscript &apos;ottu&apos; for the letter <span className="text-lg font-black text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">{currentSentence.blanks[selectedBlankIdx].baseLetter}</span> in <span className="font-bold text-indigo-900">&quot;{currentSentence.blanks[selectedBlankIdx].incorrect}&quot;</span>?
                </p>
              </div>

              {/* Options of Ottulu to attach */}
              <div className="flex gap-3">
                {currentSentence.blanks[selectedBlankIdx].options.map((option) => {
                  const isWrong = wrongOption === option;
                  return (
                    <button
                      key={option}
                      id={`btn-option-${option}`}
                      onClick={() => handleOttuSelection(option)}
                      className={`
                        w-14 h-14 rounded-full flex items-center justify-center text-3xl font-black border-2 shadow-sm transition-all duration-200 active:scale-95
                        ${isWrong 
                          ? 'bg-rose-500 border-rose-600 text-white animate-shake' 
                          : 'bg-white hover:bg-amber-100 border-amber-300 text-slate-800 hover:scale-105'
                        }
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Progress feedback */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 font-bold uppercase">
            <span>కనిపెట్టిన ఒత్తులు (Resolved words): {Object.keys(resolvedBlanks).length} / {currentSentence.blanks.length}</span>
            <span>తప్పులు (Errors): {mistakes}</span>
          </div>
        </div>
      ) : (
        /* Summary view for level 3 */
        <div className="text-center py-8 px-4" id="level3-summary">
          <div className="inline-flex p-4 bg-emerald-50 rounded-full border-4 border-emerald-200 mb-4 animate-bounce">
            <Award className="w-16 h-16 text-emerald-600" />
          </div>

          <h3 className="text-3xl font-black text-slate-800">అద్భుతం! (Superb Work!)</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            You successfully added all missing subscripts (ottulu) and corrected all sentences from the workbook!
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
              <p className="text-xs text-slate-500 font-bold uppercase">తప్పులు (Errors)</p>
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
