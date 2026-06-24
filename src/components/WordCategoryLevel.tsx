import React, { useState, useEffect } from 'react';
import { TELUGU_WORDS } from '../data/teluguData';
import { TeluguWord } from '../types';
import { audioEffects } from '../utils/audio';
import { Star, RefreshCw, Award, Volume2, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface WordCategoryLevelProps {
  onComplete: (score: number, stars: number) => void;
  onBackToMap: () => void;
}

const CATEGORIES = [
  { key: 'ప', label: 'ప ఒత్తు పదాలు', ottu: '్ప', color: 'bg-rose-50 border-rose-200 text-rose-800' },
  { key: 'బ', label: 'బ ఒత్తు పదాలు', ottu: '్బ', color: 'bg-amber-50 border-amber-200 text-amber-800' },
  { key: 'మ', label: 'మ ఒత్తు పదాలు', ottu: '్మ', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  { key: 'య', label: 'య ఒత్తు పదాలు', ottu: '్య', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { key: 'ర', label: 'ర ఒత్తు పదాలు', ottu: '్ర', color: 'bg-indigo-50 border-indigo-200 text-indigo-800' }
];

export default function WordCategoryLevel({ onComplete, onBackToMap }: WordCategoryLevelProps) {
  const [deck, setDeck] = useState<TeluguWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sortedWords, setSortedWords] = useState<Record<string, TeluguWord[]>>({
    'ప': [], 'బ': [], 'మ': [], 'య': [], 'ర': []
  });
  
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [wrongBasketKey, setWrongBasketKey] = useState<string | null>(null);
  const [correctAnim, setCorrectAnim] = useState<boolean>(false);

  // Initialize a random selection of 12 words from the data
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    // Shuffle and pick 12 words
    const shuffled = [...TELUGU_WORDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled.slice(0, 12));
    setCurrentIdx(0);
    setSortedWords({ 'ప': [], 'బ': [], 'మ': [], 'య': [], 'ర': [] });
    setScore(0);
    setMistakes(0);
    setShowSummary(false);
    setWrongBasketKey(null);
    setCorrectAnim(false);
  };

  const currentWord = deck[currentIdx];

  const handleSort = (categoryKey: string) => {
    if (showSummary || !currentWord) return;

    if (currentWord.ottuType === categoryKey) {
      // Correct!
      audioEffects.playCorrect();
      setCorrectAnim(true);
      setScore(prev => prev + 15);
      
      // Add to basket
      setSortedWords(prev => ({
        ...prev,
        [categoryKey]: [...prev[categoryKey], currentWord]
      }));

      setTimeout(() => {
        setCorrectAnim(false);
        if (currentIdx + 1 < deck.length) {
          setCurrentIdx(prev => prev + 1);
        } else {
          audioEffects.playSuccess();
          setShowSummary(true);
        }
      }, 400);

    } else {
      // Incorrect basket
      audioEffects.playIncorrect();
      setMistakes(prev => prev + 1);
      setWrongBasketKey(categoryKey);

      setTimeout(() => {
        setWrongBasketKey(null);
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

  return (
    <div className="bg-white/95 rounded-3xl p-6 md:p-8 shadow-xl border-4 border-emerald-200/60 max-w-5xl mx-auto" id="word-category-level">
      {/* Level Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-emerald-100 pb-4 mb-6">
        <div>
          <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            ఆట 2 • స్థాయి 2 (Game 2 • Level 2)
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1 flex items-center gap-2">
            పదాల వర్గీకరణ పట్టిక
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Classify words into correct columns based on their conjunct &apos;Ottu&apos; letter.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
          <div className="text-center">
            <p className="text-xs text-emerald-700 font-medium uppercase">స్కోరు (Score)</p>
            <p className="text-lg font-black text-emerald-900">{score}</p>
          </div>
          <div className="w-px h-8 bg-emerald-200" />
          <div className="text-center">
            <p className="text-xs text-emerald-700 font-medium uppercase">కార్డు (Card)</p>
            <p className="text-lg font-black text-emerald-900">{currentIdx + 1}/{deck.length}</p>
          </div>
        </div>
      </div>

      {!showSummary ? (
        <div className="space-y-6">
          {/* Instructions bar */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 text-center text-emerald-950 font-medium text-sm md:text-base border border-emerald-100">
            👉 మధ్యలో ఉన్న పద కార్డును గమనించి, అది ఏ ఒత్తుకు చెందినదో కింద ఉన్న సరైన బుట్టను నొక్కండి!
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Box: Active word card to sort */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center bg-slate-50/80 rounded-3xl p-6 border-2 border-slate-200 min-h-[250px] relative overflow-hidden">
              {currentWord ? (
                <div className={`text-center space-y-4 w-full transition-all duration-300 ${correctAnim ? 'scale-75 opacity-0' : 'scale-100'}`}>
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">ప్రస్తుత పదం (Active Word)</span>
                  
                  <div className="flex items-center justify-center gap-3">
                    <h4 className="text-4xl font-black text-indigo-900 drop-shadow-sm select-all">
                      {currentWord.word}
                    </h4>
                    <button
                      onClick={() => handleTTS(currentWord.word)}
                      className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600 transition"
                      title="Pronounce"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm inline-block">
                    <p className="text-xs font-bold text-slate-500 uppercase">అర్థం (Meaning)</p>
                    <p className="text-sm font-semibold text-slate-700">{currentWord.meaning}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Loading card...</p>
              )}
            </div>

            {/* Right/Bottom Box: Sorting Baskets / Action Targets */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => {
                const isWrong = wrongBasketKey === cat.key;
                return (
                  <button
                    key={cat.key}
                    id={`btn-basket-${cat.key}`}
                    onClick={() => handleSort(cat.key)}
                    className={`
                      relative p-4 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col justify-between items-center min-h-[160px] cursor-pointer hover:-translate-y-1 hover:shadow-md
                      ${cat.color}
                      ${isWrong ? 'border-rose-500 ring-4 ring-rose-200 animate-shake bg-rose-100' : 'hover:scale-102'}
                    `}
                  >
                    <span className="text-sm font-bold opacity-80 uppercase tracking-wide">{cat.label}</span>
                    
                    {/* Big Visual Circle representing the Ottu */}
                    <div className="w-16 h-16 rounded-full bg-white/90 shadow-inner flex items-center justify-center text-3xl font-black border border-inherit">
                      {cat.ottu}
                    </div>

                    <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 shadow-xs">
                      {sortedWords[cat.key].length} పదాలు
                    </div>

                    {isWrong && (
                      <div className="absolute inset-0 bg-rose-50/90 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                        <ShieldAlert className="w-8 h-8 text-rose-600 mb-1" />
                        <span className="text-xs font-bold text-rose-800">తప్పు ఒత్తు!</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table display of categorized words - live preview like workbook! */}
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200 mt-6 overflow-x-auto">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
              మీరు పూరించిన పట్టిక (Your Live Workbook Table)
            </h4>
            <div className="grid grid-cols-5 gap-2 min-w-[650px]">
              {CATEGORIES.map((cat) => (
                <div key={`table-col-${cat.key}`} className="bg-white rounded-xl border border-slate-200 p-3 min-h-[100px] flex flex-col">
                  <div className="text-center border-b border-slate-100 pb-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 block">{cat.key} ఒత్తు</span>
                    <span className="text-lg font-black text-indigo-900">{cat.ottu}</span>
                  </div>
                  
                  <div className="space-y-1.5 flex-1">
                    {sortedWords[cat.key].length > 0 ? (
                      sortedWords[cat.key].map((w, wIdx) => (
                        <div key={wIdx} className="flex items-center justify-between bg-slate-50 text-[11px] font-semibold text-slate-800 px-2 py-1 rounded-md border border-slate-150">
                          <span>{w.word}</span>
                          <button
                            onClick={() => handleTTS(w.word)}
                            className="text-slate-400 hover:text-indigo-600 transition"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-[11px] text-gray-300 italic block text-center py-4">ఖాళీ (Empty)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Summary view for level 2 */
        <div className="text-center py-8 px-4" id="level2-summary">
          <div className="inline-flex p-4 bg-emerald-50 rounded-full border-4 border-emerald-200 mb-4 animate-bounce">
            <Award className="w-16 h-16 text-emerald-600" />
          </div>

          <h3 className="text-3xl font-black text-slate-800">అద్భుతం! (Excellent!)</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            You completed the Telugu workbook word sorting board perfectly! All words are correctly grouped.
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
              <p className="text-xs text-slate-500 font-bold uppercase">తప్పులు (Mistakes)</p>
              <p className="text-2xl font-black text-slate-700">{mistakes}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={initGame}
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
