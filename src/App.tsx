import React, { useState, useEffect } from 'react';
import { LevelType, ScoreState } from './types';
import { LETTER_OTTU_PAIRS, TELUGU_WORDS } from './data/teluguData';
import { audioEffects } from './utils/audio';
import LetterMatchLevel from './components/LetterMatchLevel';
import WordCategoryLevel from './components/WordCategoryLevel';
import SpellingFixerLevel from './components/SpellingFixerLevel';
import QuizLevel from './components/QuizLevel';
import AllOttuluDictionary from './components/AllOttuluDictionary';
import { 
  BookOpen, Star, Volume2, Award, Zap, Trophy, Flame, Play, CheckCircle2, 
  VolumeX, RefreshCw, HelpCircle, FileText
} from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<LevelType>('home');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'games' | 'study'>('games');
  
  // Progress states saved in localStorage
  const [scoreState, setScoreState] = useState<ScoreState>(() => {
    const saved = localStorage.getItem('telugu_dwitva_progress_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return {
      stars: 0,
      score: 0,
      completedLevels: {
        match: false,
        category: false,
        spelling: false,
        quiz: false
      },
      levelScores: {
        match: 0,
        category: 0,
        spelling: 0,
        quiz: 0
      }
    };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('telugu_dwitva_progress_v2', JSON.stringify(scoreState));
  }, [scoreState]);

  const handleLevelComplete = (level: Exclude<LevelType, 'home'>, levelScore: number, levelStars: number) => {
    setScoreState(prev => {
      const alreadyCompleted = prev.completedLevels[level];
      const previousStars = prev.levelScores[level] ? Math.round(prev.levelScores[level] / 30) : 0; // estimate stars or we can store properly
      
      const updatedCompleted = {
        ...prev.completedLevels,
        [level]: true
      };

      const updatedLevelScores = {
        ...prev.levelScores,
        [level]: Math.max(prev.levelScores[level] || 0, levelScore)
      };

      // Calculate new total score and stars
      const newScore = alreadyCompleted 
        ? prev.score + Math.max(0, levelScore - (prev.levelScores[level] || 0))
        : prev.score + levelScore;

      // Simple star accumulation
      const starDifference = alreadyCompleted ? Math.max(0, levelStars - previousStars) : levelStars;
      const newStars = prev.stars + starDifference;

      return {
        stars: newStars,
        score: newScore,
        completedLevels: updatedCompleted,
        levelScores: updatedLevelScores
      };
    });

    setCurrentLevel('home');
  };

  const handleToggleMute = () => {
    const muted = audioEffects.toggleMute();
    setIsMuted(muted);
  };

  const resetAllProgress = () => {
    if (window.confirm('మీరు మీ ఆట ప్రగతిని మొదటి నుండి ప్రారంభించాలనుకుంటున్నారా? (Are you sure you want to reset all game progress?)')) {
      audioEffects.playIncorrect();
      const defaultState = {
        stars: 0,
        score: 0,
        completedLevels: {
          match: false,
          category: false,
          spelling: false,
          quiz: false
        },
        levelScores: {
          match: 0,
          category: 0,
          spelling: 0,
          quiz: 0
        }
      };
      setScoreState(defaultState);
      localStorage.removeItem('telugu_dwitva_progress_v2');
    }
  };

  const pronounceText = (text: string) => {
    audioEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Render sub-level components
  const renderLevel = () => {
    switch (currentLevel) {
      case 'match':
        return (
          <LetterMatchLevel 
            onComplete={(s, stars) => handleLevelComplete('match', s, stars)}
            onBackToMap={() => setCurrentLevel('home')}
          />
        );
      case 'category':
        return (
          <WordCategoryLevel
            onComplete={(s, stars) => handleLevelComplete('category', s, stars)}
            onBackToMap={() => setCurrentLevel('home')}
          />
        );
      case 'spelling':
        return (
          <SpellingFixerLevel
            onComplete={(s, stars) => handleLevelComplete('spelling', s, stars)}
            onBackToMap={() => setCurrentLevel('home')}
          />
        );
      case 'quiz':
        return (
          <QuizLevel
            onComplete={(s, stars) => handleLevelComplete('quiz', s, stars)}
            onBackToMap={() => setCurrentLevel('home')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-radial from-slate-50 to-amber-50/40 text-slate-800 font-sans pb-12" id="app-root">
      {/* Top Interactive Navbar */}
      <header className="bg-white/85 backdrop-blur-md sticky top-0 z-40 border-b border-amber-100 shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-amber-950 flex items-center gap-2">
              తరగతి 5 • తెలుగు సంసిద్ధత
            </h1>
            <p className="text-xs text-amber-800/80 font-bold tracking-wide uppercase">
              9వ రోజు: ద్విత్వాక్షరాలు, పదాలు (Conjunct Consonants)
            </p>
          </div>
        </div>

        {/* Global score badges & controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 text-amber-900 font-bold text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{scoreState.stars} నక్షత్రాలు (Stars)</span>
          </div>
          
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 text-indigo-900 font-bold text-sm shadow-xs">
            <Trophy className="w-4 h-4 text-indigo-500" />
            <span>{scoreState.score} పాయింట్లు (Points)</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 border border-slate-200">
            <button
              onClick={handleToggleMute}
              className="p-1.5 hover:bg-white rounded-full text-slate-500 transition-all"
              title={isMuted ? "Unmute sounds" : "Mute sounds"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={resetAllProgress}
              className="p-1.5 hover:bg-white rounded-full text-slate-500 transition-all"
              title="Reset progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        {currentLevel !== 'home' ? (
          /* Active Level View */
          <div className="animate-fadeIn">
            {renderLevel()}
          </div>
        ) : (
          /* Dashboard Home View */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Interactive Learning Intro Card */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
              
              <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
                <span className="bg-amber-400/30 text-amber-50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Workbook Activity Guide
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  ద్విత్వాక్షరాలు మరియు ఒత్తుల ప్రపంచం
                </h2>
                <p className="text-amber-50 text-sm md:text-base leading-relaxed opacity-90">
                  ఒక హల్లు అక్షరానికి అదే హల్లు యొక్క ఒత్తు గుర్తు జతకూడితే దానిని <strong>ద్విత్వాక్షరం</strong> అంటారు.
                  ఈ ఆటల ద్వారా ప, బ, మ, య, ర, వ, శ, ష, స, హ అక్షరాల ఒత్తులను సరదాగా నేర్చుకుందాం!
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <button 
                    onClick={() => setActiveTab('games')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 ${activeTab === 'games' ? 'bg-white text-orange-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  >
                    🎯 ఆటలు ఆడు (Play Games)
                  </button>
                  <button 
                    onClick={() => setActiveTab('study')}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 ${activeTab === 'study' ? 'bg-white text-orange-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                  >
                    📖 ఒత్తుల పట్టిక (Study Guide)
                  </button>
                </div>
              </div>

              {/* Character Illustration / Quick Stats */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center w-full md:w-auto min-w-[240px] z-10">
                <h4 className="text-xs font-bold text-amber-100 uppercase tracking-widest mb-3">మీ ప్రగతి సమాచారం (Stats)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <p className="text-2xl font-black">{scoreState.score}</p>
                    <p className="text-[10px] text-amber-100 uppercase font-semibold">పాయింట్లు</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <p className="text-2xl font-black">{scoreState.stars}/12</p>
                    <p className="text-[10px] text-amber-100 uppercase font-semibold">నక్షత్రాలు</p>
                  </div>
                </div>
                
                {/* Completion progress bar */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs text-amber-100 font-semibold mb-1">
                    <span>పూర్తయిన స్థాయిలు</span>
                    <span>
                      {Object.values(scoreState.completedLevels).filter(Boolean).length} / 4
                    </span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-300 h-full transition-all duration-500"
                      style={{ width: `${(Object.values(scoreState.completedLevels).filter(Boolean).length / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Tabs Segment */}
            {activeTab === 'games' ? (
              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-700 tracking-wider uppercase px-1">
                  ఆటల గ్యాలరీ (Workbook Levels Map)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Game Level 1 Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-amber-100 hover:border-amber-300 transition-all flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                        <Star className="w-6 h-6 fill-amber-100" />
                      </div>
                      <div>
                        <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          స్థాయి 1 (Level 1)
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 mt-1.5">అక్షరాలు - ఒత్తులు జతచేయడం</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                          Match the Telugu consonants (హల్లులు) with their corresponding subscript (ఒత్తులు) indicators.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-400">
                        {scoreState.completedLevels.match ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> పూర్తి చేయబడింది
                          </span>
                        ) : 'పూర్తి కాలేదు'}
                      </div>
                      <button
                        onClick={() => {
                          audioEffects.playClick();
                          setCurrentLevel('match');
                        }}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> ప్రారంభించు
                      </button>
                    </div>
                  </div>

                  {/* Game Level 2 Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-emerald-100 hover:border-emerald-300 transition-all flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                        <Flame className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          స్థాయి 2 (Level 2)
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 mt-1.5">పదాల వర్గీకరణ పట్టిక</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                          Categorize various words based on their double consonant type (ప, బ, మ, య, ర ఒత్తులు).
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-400">
                        {scoreState.completedLevels.category ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> పూర్తి చేయబడింది
                          </span>
                        ) : 'పూర్తి కాలేదు'}
                      </div>
                      <button
                        onClick={() => {
                          audioEffects.playClick();
                          setCurrentLevel('category');
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> ప్రారంభించు
                      </button>
                    </div>
                  </div>

                  {/* Game Level 3 Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-indigo-100 hover:border-indigo-300 transition-all flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          స్థాయి 3 (Level 3)
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 mt-1.5">ఒత్తులు చేర్చి వాక్యాలు రాయడం</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                          Correct sentences from workbook sheets by adding the correct subscripts (ottulu) to target consonants.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-400">
                        {scoreState.completedLevels.spelling ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> పూర్తి చేయబడింది
                          </span>
                        ) : 'పూర్తి కాలేదు'}
                      </div>
                      <button
                        onClick={() => {
                          audioEffects.playClick();
                          setCurrentLevel('spelling');
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> ప్రారంభించు
                      </button>
                    </div>
                  </div>

                  {/* Game Level 4 Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-rose-100 hover:border-rose-300 transition-all flex flex-col justify-between hover:-translate-y-1">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          స్థాయి 4 (Level 4)
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 mt-1.5">పదాల జ్ఞాన పరిశీలన క్విజ్</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                          Test what you have learned from Day 9 Telugu sheets in a fun interactive quiz board.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-400">
                        {scoreState.completedLevels.quiz ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> పూర్తి చేయబడింది
                          </span>
                        ) : 'పూర్తి కాలేదు'}
                      </div>
                      <button
                        onClick={() => {
                          audioEffects.playClick();
                          setCurrentLevel('quiz');
                        }}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> ప్రారంభించు
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Study Guide View */
              <div className="space-y-6">
                <AllOttuluDictionary />

                <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100">
                  <h3 className="text-xl font-black text-amber-950 border-b border-amber-50 pb-3 mb-4 flex items-center gap-2">
                    📖 ద్విత్వాక్షరాలు - ఒత్తుల పట్టిక (Dwitvakshara reference guide)
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {LETTER_OTTU_PAIRS.map((pair) => (
                      <div 
                        key={pair.id} 
                        className="bg-amber-50/40 hover:bg-amber-50 border border-amber-200/60 p-4 rounded-2xl text-center space-y-2 transition shadow-xs group"
                      >
                        <div className="flex justify-center items-center gap-2">
                          <span className="text-2xl font-black text-slate-800">{pair.letter}</span>
                          <span className="text-slate-300">→</span>
                          <span className="text-3xl font-black text-amber-700">{pair.displayOttu}</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase">{pair.name}</p>
                        
                        <button
                          onClick={() => pronounceText(pair.letter + " మరియు " + pair.letter + " ఒత్తు")}
                          className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-200 rounded-full text-[10px] font-bold text-amber-800 transition flex items-center gap-1 mx-auto"
                        >
                          <Volume2 className="w-3 h-3" /> శబ్దం విను (Listen)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100">
                  <h3 className="text-xl font-black text-amber-950 border-b border-amber-50 pb-3 mb-4">
                    📚 పదాల అర్థాలు & ఉచ్చారణ (Vocabulary Cards with pronunciation)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TELUGU_WORDS.map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-200 p-4 rounded-2xl flex flex-col justify-between space-y-3 transition shadow-xs hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-indigo-950">{w.word}</span>
                            <span className="text-[10px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
                              {w.ottuType} ఒత్తు
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 font-medium italic">&ldquo;{w.meaning}&rdquo;</p>
                        </div>

                        <button
                          onClick={() => pronounceText(w.word)}
                          className="w-full py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 transition flex items-center justify-center gap-1.5"
                        >
                          <Volume2 className="w-4 h-4" /> శబ్దం విను (Listen)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Classroom aesthetic Footer decor */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-amber-100 text-center space-y-2 text-xs text-slate-400 font-bold uppercase">
        <p>Class 5 Telugu • Day 9 Interactive Companion Game</p>
        <p className="text-[10px] font-normal text-slate-300 normal-case">
          Designed based on the State Curriculum worksheets for Dwitvaksharamulu &amp; Ottulu. Works on all modern web engines.
        </p>
      </footer>
    </div>
  );
}
