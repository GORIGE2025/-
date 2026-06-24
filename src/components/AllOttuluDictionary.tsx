import React, { useState, useMemo } from 'react';
import { ALL_TELUGU_CONSONANTS_DICTIONARY, CompleteDictionaryItem } from '../data/teluguData';
import { Volume2, Search, BookOpen, Layers, Check, Sparkles, Languages } from 'lucide-react';
import { audioEffects } from '../utils/audio';

// Consonant group divisions for traditional Telugu learning
const CONSONANT_GROUPS = [
  { id: 'all', name: 'అన్నీ (All)' },
  { id: 'ka-cha', name: 'క - జ వర్గం (Ka - Ja)', letters: ['క', 'ఖ', 'గ', 'ఘ', 'చ', 'ఛ', 'జ', 'ఝ'] },
  { id: 'ta-da', name: 'ట - ణ వర్గం (Ta - Na)', letters: ['ట', 'ఠ', 'డ', 'ఢ', 'ణ'] },
  { id: 'ta-pa', name: 'త - భ వర్గం (Ta - Bha)', letters: ['త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ'] },
  { id: 'ya-ra', name: 'య - వ వర్గం (Ya - Va)', letters: ['మ', 'య', 'ర', 'ల', 'వ'] },
  { id: 'sha-rra', name: 'శ - ఱ వర్గం (Sha - Rra)', letters: ['శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'] },
];

export default function AllOttuluDictionary() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');
  const [flippedWordIndex, setFlippedWordIndex] = useState<string | null>(null);

  // Play audio for a letter/word
  const pronounceText = (text: string) => {
    audioEffects.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'te-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter letters based on selected consonant group
  const filteredLetters = useMemo(() => {
    if (selectedGroup === 'all') {
      return ALL_TELUGU_CONSONANTS_DICTIONARY;
    }
    const group = CONSONANT_GROUPS.find(g => g.id === selectedGroup);
    if (!group || !group.letters) return ALL_TELUGU_CONSONANTS_DICTIONARY;
    return ALL_TELUGU_CONSONANTS_DICTIONARY.filter(item => group.letters?.includes(item.letter));
  }, [selectedGroup]);

  // Gather all words across selected letters, matching search queries
  const allWordsList = useMemo(() => {
    const list: { letter: string; name: string; word: string; meaning: string; syllable: string }[] = [];
    
    // We search through either filtered letters or all letters if there's a search query
    const targetSource = searchQuery ? ALL_TELUGU_CONSONANTS_DICTIONARY : filteredLetters;

    targetSource.forEach(item => {
      // If we clicked a specific letter and we are not searching, filter by that letter
      if (selectedLetter && item.letter !== selectedLetter && !searchQuery) return;

      item.words.forEach(w => {
        // Search criteria: match word, meaning, or letter
        const matchQuery = !searchQuery || 
          w.word.includes(searchQuery) || 
          w.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.letter === searchQuery ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (matchQuery) {
          list.push({
            letter: item.letter,
            name: item.name,
            word: w.word,
            meaning: w.meaning,
            syllable: w.syllable
          });
        }
      });
    });

    return list;
  }, [filteredLetters, selectedLetter, searchQuery]);

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
    setSelectedLetter(null); // Reset letter filter when group changes
    audioEffects.playClick();
  };

  const handleLetterSelect = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null); // Deselect
    } else {
      setSelectedLetter(letter);
    }
    audioEffects.playClick();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-amber-100 space-y-6" id="all-ottulu-dictionary">
      {/* Dictionary Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-50 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500 text-white">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-amber-950">
              తెలుగు సర్వ ఒత్తుల పద నిఘంటువు (Telugu All Ottulu Dictionary)
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            తెలుగు భాషలోని అన్ని హల్లుల ఒత్తులు (క నుండి ఱ వరకు) మరియు వాటి ద్విత్వ పదాల సమగ్ర సంకలనం.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold gap-1 self-stretch md:self-auto">
          <button
            onClick={() => { setViewMode('grid'); audioEffects.playClick(); }}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            📋 పదాల జాబితా (List)
          </button>
          <button
            onClick={() => { setViewMode('cards'); audioEffects.playClick(); }}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg transition-all ${viewMode === 'cards' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            🎴 ఫ్లాష్ కార్డ్స్ (Flashcards)
          </button>
        </div>
      </div>

      {/* Search and Consonant Groups Filter */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none" />
          <input
            type="text"
            placeholder="అక్షరం లేదా పదం లేదా ఆంగ్ల అర్థం రాయండి... (Search by word, letter, meaning... e.g. కుక్క, పిల్లి, Dog)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-50/70 focus:bg-white border-2 border-amber-100 focus:border-amber-400 rounded-2xl text-sm font-medium transitionOutline text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Consonant Group Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-amber-50/50 rounded-2xl border border-amber-100/60">
          {CONSONANT_GROUPS.map((group) => (
            <button
              key={group.id}
              onClick={() => handleGroupSelect(group.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${selectedGroup === group.id ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-900/80 hover:bg-amber-100/60'}`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid of Letters / Ottulu Badges */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-amber-900/70 uppercase tracking-widest flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> హల్లులు మరియు ఒత్తుల ఎంపిక (Select Consonant Subscript)
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {filteredLetters.map((item) => {
            const isSelected = selectedLetter === item.letter;
            return (
              <button
                key={item.letter}
                onClick={() => handleLetterSelect(item.letter)}
                className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105' 
                    : 'bg-amber-50/20 hover:bg-amber-50/80 border-amber-100 hover:border-amber-200 text-slate-800'
                }`}
                title={item.name}
              >
                <span className="text-sm font-semibold">{item.letter}</span>
                <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-amber-800'}`}>{item.ottu}</span>
                {isSelected && (
                  <span className="absolute -top-1 -right-1 bg-white text-amber-600 rounded-full p-0.5 border border-amber-400">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Container */}
      <div className="border-t border-slate-100 pt-6 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>పదాలు ({allWordsList.length})</span>
              {selectedLetter && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-black">
                  &apos;{selectedLetter}&apos; అక్షర ఒత్తు పదాలు
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-400">అక్షరాన్ని తాకి లేదా కింది పదాల ఉచ్చారణ వినడానికి &quot;Listen&quot; నొక్కండి.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> అభ్యాసం చేయి!
            </span>
          </div>
        </div>

        {allWordsList.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm font-semibold text-slate-500">ఈ అక్షరానికి లేదా శోధనకు సరిపోయే పదాలు కనుగొనబడలేదు.</p>
            <p className="text-xs text-slate-400 mt-1">దయచేసి వేరే అక్షరాన్ని లేదా కీవర్డ్ శోధనను ప్రయత్నించండి.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of Words */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allWordsList.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-amber-200 rounded-2xl p-4 transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-2xl font-black text-slate-800 flex items-baseline">
                      {item.word.split('').map((char, charIdx) => {
                        // Highlight the double consonant syllable if matched
                        const isSyllable = item.syllable.includes(char);
                        return (
                          <span 
                            key={charIdx} 
                            className={isSyllable ? "text-amber-600 bg-amber-50 px-0.5 rounded-md font-extrabold" : "font-black"}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </h5>
                    <span className="text-[10px] bg-slate-200/60 font-black text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.letter} ఒత్తు
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium italic mt-1">
                    <Languages className="w-3.5 h-3.5 text-slate-400" />
                    <span>&ldquo;{item.meaning}&rdquo;</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => pronounceText(item.word)}
                    className="flex-1 py-1.5 bg-white hover:bg-amber-500 hover:text-white border border-slate-200 hover:border-amber-500 rounded-xl text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive Flashcard / Memorization Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allWordsList.map((item, idx) => {
              const cardId = `card-${idx}`;
              const isFlipped = flippedWordIndex === cardId;

              return (
                <div 
                  key={idx}
                  onClick={() => {
                    setFlippedWordIndex(isFlipped ? null : cardId);
                    pronounceText(item.word);
                  }}
                  className={`h-40 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative select-none ${
                    isFlipped 
                      ? 'bg-amber-50 border-amber-400 shadow-md scale-[1.02]' 
                      : 'bg-white hover:bg-slate-50/50 border-slate-100 hover:border-amber-200 shadow-xs'
                  }`}
                >
                  {/* Card Front: Word with highlighted syllable */}
                  {!isFlipped ? (
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded-full">
                          {item.letter} ఒత్తు పదం
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Click to Flip</span>
                      </div>
                      
                      <div className="text-center py-2">
                        <h5 className="text-3xl font-black text-slate-800 tracking-wide">
                          {item.word}
                        </h5>
                      </div>

                      <div className="flex justify-center items-center text-xs text-amber-700/80 font-bold gap-1">
                        <Volume2 className="w-3.5 h-3.5" /> విను మరియు తిప్పు
                      </div>
                    </div>
                  ) : (
                    /* Card Back: Meaning + breakdown */
                    <div className="absolute inset-0 p-5 bg-amber-50/70 rounded-2xl flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-amber-600 text-white font-black px-2 py-0.5 rounded-full">
                          ఆంగ్ల అర్థం (English Meaning)
                        </span>
                        <span className="text-[10px] text-amber-600 font-bold uppercase">Active</span>
                      </div>

                      <div className="text-center py-2 space-y-1">
                        <p className="text-2xl font-black text-amber-950">&ldquo;{item.meaning}&rdquo;</p>
                        <p className="text-xs text-slate-500 font-semibold">
                          ద్విత్వాక్షరం: <span className="text-sm font-bold text-amber-700">{item.syllable}</span>
                        </p>
                      </div>

                      <p className="text-[10px] text-slate-400 font-bold text-center">Click to see word</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
