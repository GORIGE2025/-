import { LetterOttuPair, TeluguWord, SentenceExercise, QuizQuestion } from '../types';

export const LETTER_OTTU_PAIRS: LetterOttuPair[] = [
  { id: 'pa', letter: 'ప', ottu: '్ప', displayOttu: '◌్ప', name: 'ప ఒత్తు (pa-ottu)' },
  { id: 'ba', letter: 'బ', ottu: '్బ', displayOttu: '◌్బ', name: 'బ ఒత్తు (ba-ottu)' },
  { id: 'ma', letter: 'మ', ottu: '్మ', displayOttu: '◌్మ', name: 'మ ఒత్తు (ma-ottu)' },
  { id: 'ya', letter: 'య', ottu: '్య', displayOttu: '◌్య', name: 'య ఒత్తు (ya-ottu)' },
  { id: 'ra', letter: 'ర', ottu: '్ర', displayOttu: '◌్ర', name: 'ర ఒత్తు (ra-ottu)' },
  { id: 'va', letter: 'వ', ottu: '్వ', displayOttu: '◌్వ', name: 'వ ఒత్తు (va-ottu)' },
  { id: 'sha', letter: 'శ', ottu: '్శ', displayOttu: '◌్శ', name: 'శ ఒత్తు (sha-ottu)' },
  { id: 'ssa', letter: 'ష', ottu: '్ష', displayOttu: '◌్ష', name: 'ష ఒత్తు (ssa-ottu)' },
  { id: 'sa', letter: 'స', ottu: '్స', displayOttu: '◌్స', name: 'స ఒత్తు (sa-ottu)' },
  { id: 'ha', letter: 'హ', ottu: '్హ', displayOttu: '◌్హ', name: 'హ ఒత్తు (ha-ottu)' }
];

export const TELUGU_WORDS: TeluguWord[] = [
  // Pa ottu words
  { word: 'తప్పు', meaning: 'Wrong / Mistake', ottuType: 'ప', brokenWord: 'తపు', correctSyllable: 'ప్పు', incorrectSyllable: 'పు' },
  { word: 'పప్పుచారు', meaning: 'Lentil Soup (Sambar)', ottuType: 'ప', brokenWord: 'పపుచారు', correctSyllable: 'ప్పు', incorrectSyllable: 'పు' },
  { word: 'చెప్పులు', meaning: 'Sandals / Shoes', ottuType: 'ప', brokenWord: 'చెపులు', correctSyllable: 'ప్పు', incorrectSyllable: 'పు' },
  { word: 'నిప్పు', meaning: 'Fire / Ember', ottuType: 'ప', brokenWord: 'నిపు', correctSyllable: 'ప్పు', incorrectSyllable: 'పు' },
  { word: 'అప్పడం', meaning: 'Papad / Crisp Flatbread', ottuType: 'ప', brokenWord: 'అపడం', correctSyllable: 'ప్ప', incorrectSyllable: 'ప' },

  // Ba ottu words
  { word: 'డబ్బా', meaning: 'Box / Container', ottuType: 'బ', brokenWord: 'డబా', correctSyllable: 'బ్బా', incorrectSyllable: 'బా' },
  { word: 'డబ్బు సంచి', meaning: 'Money Purse / Bag', ottuType: 'బ', brokenWord: 'డబు సంచి', correctSyllable: 'బ్బు', incorrectSyllable: 'బు' },
  { word: 'రుబ్బురోలు', meaning: 'Grinding Stone', ottuType: 'బ', brokenWord: 'రుబురోలు', correctSyllable: 'బ్బు', incorrectSyllable: 'బు' },
  { word: 'రబ్బరు', meaning: 'Eraser / Rubber', ottuType: 'బ', brokenWord: 'రబురు', correctSyllable: 'బ్బు', incorrectSyllable: 'బు' },
  { word: 'మబ్బు', meaning: 'Cloud', ottuType: 'బ', brokenWord: 'మబు', correctSyllable: 'బ్బు', incorrectSyllable: 'బు' },
  { word: 'గబ్బిలం', meaning: 'Bat (animal)', ottuType: 'బ', brokenWord: 'గబిలం', correctSyllable: 'బ్బి', incorrectSyllable: 'బి' },

  // Ma ottu words
  { word: 'కొమ్మలు', meaning: 'Tree Branches', ottuType: 'మ', brokenWord: 'కొమలు', correctSyllable: 'మ్మ', incorrectSyllable: 'మ' },
  { word: 'బామ్మ మాట', meaning: 'Grandmother\'s Advice', ottuType: 'మ', brokenWord: 'బామ మాట', correctSyllable: 'మ్మ', incorrectSyllable: 'మ' },
  { word: 'తుమ్మ జిగురు', meaning: 'Acacia Tree Gum', ottuType: 'మ', brokenWord: 'తుమ జిగురు', correctSyllable: 'మ్మ', incorrectSyllable: 'మ' },
  { word: 'దుమ్ము ధూళి', meaning: 'Dust & Dirt', ottuType: 'మ', brokenWord: 'దుము ధూళి', correctSyllable: 'మ్ము', incorrectSyllable: 'ము' },
  { word: 'బొమ్మ', meaning: 'Doll / Toy', ottuType: 'మ', brokenWord: 'బొమ', correctSyllable: 'మ్మ', incorrectSyllable: 'మ' },

  // Ya ottu words
  { word: 'తియ్యన', meaning: 'Sweetness', ottuType: 'య', brokenWord: 'తియన', correctSyllable: 'య్య', incorrectSyllable: 'య' },
  { word: 'బియ్యం', meaning: 'Uncooked Rice', ottuType: 'య', brokenWord: 'బియం', correctSyllable: 'య్యం', incorrectSyllable: 'యం' },
  { word: 'అయ్యగారు', meaning: 'Gentleman / Master', ottuType: 'య', brokenWord: 'అయగారు', correctSyllable: 'య్య', incorrectSyllable: 'య' },
  { word: 'వియ్యాలవారు', meaning: 'In-Laws / Relatives', ottuType: 'య', brokenWord: 'వియాలవారు', correctSyllable: 'య్యా', incorrectSyllable: 'యా' },
  { word: 'నెయ్యి', meaning: 'Ghee (Clarified Butter)', ottuType: 'య', brokenWord: 'నెయి', correctSyllable: 'య్యి', incorrectSyllable: 'యి' },
  { word: 'కొయ్యబొమ్మ', meaning: 'Wooden Toy', ottuType: 'య', brokenWord: 'కొయబొమ్మ', correctSyllable: 'య్య', incorrectSyllable: 'య' },

  // Ra ottu words
  { word: 'ఎర్రని', meaning: 'Red in color', ottuType: 'ర', brokenWord: 'ఎరని', correctSyllable: 'ర్ర', incorrectSyllable: 'ర' },
  { word: 'తుర్రుమని', meaning: 'In a quick flash / Zooming', ottuType: 'ర', brokenWord: 'తురుమని', correctSyllable: 'ర్రు', incorrectSyllable: 'రు' },
  { word: 'జీలకర్ర', meaning: 'Cumin Seeds', ottuType: 'ర', brokenWord: 'జీలకర', correctSyllable: 'ర్ర', incorrectSyllable: 'ర' },
  { word: 'బుర్రమీసాలు', meaning: 'Big curled Mustache', ottuType: 'ర', brokenWord: 'బురమీసాలు', correctSyllable: 'ర్ర', incorrectSyllable: 'ర' },
  { word: 'చిర్రుబుర్రు', meaning: 'Grumbling angrily', ottuType: 'ర', brokenWord: 'చిరుబురు', correctSyllable: 'ర్రు', incorrectSyllable: 'రు' }
];

export const SENTENCE_EXERCISES: SentenceExercise[] = [
  {
    id: 's1',
    original: 'అమ పపుచారు, అపడాలు చేసింది.',
    corrected: 'అమ్మ పప్పుచారు, అప్పడాలు చేసింది.',
    translation: 'Mother made dal soup and papads.',
    blanks: [
      {
        wordIdx: 0,
        incorrect: 'అమ',
        correct: 'అమ్మ',
        baseLetter: 'మ',
        correctOttu: '్మ',
        options: ['్మ', '్ప', '్వ']
      },
      {
        wordIdx: 1,
        incorrect: 'పపుచారు,',
        correct: 'పప్పుచారు,',
        baseLetter: 'పు',
        correctOttu: '్ప',
        options: ['్ప', '్బ', '్మ']
      },
      {
        wordIdx: 2,
        incorrect: 'అపడాలు',
        correct: 'అప్పడాలు',
        baseLetter: 'ప',
        correctOttu: '్ప',
        options: ['్ప', '్మ', '్ర']
      }
    ]
  },
  {
    id: 's2',
    original: 'అవకు, తాతకు ఇచ్చింది. పిలలకు వడించింది.',
    corrected: 'అవ్వకు, తాతకు ఇచ్చింది. పిల్లలకు వడ్డించింది.',
    translation: 'Gave to grandma and grandpa. Served to the children.',
    blanks: [
      {
        wordIdx: 0,
        incorrect: 'అవకు,',
        correct: 'అవ్వకు,',
        baseLetter: 'వ',
        correctOttu: '్వ',
        options: ['్వ', '్మ', '్య']
      },
      {
        wordIdx: 3,
        incorrect: 'పిలలకు',
        correct: 'పిల్లలకు',
        baseLetter: 'ల',
        correctOttu: '్ల',
        options: ['్ల', '్స', '్మ']
      },
      {
        wordIdx: 4,
        incorrect: 'వడించింది.',
        correct: 'వడ్డించింది.',
        baseLetter: 'డి',
        correctOttu: '్డ',
        options: ['్డ', '్త', '్ప']
      }
    ]
  },
  {
    id: 's3',
    original: 'అందరూ సంతోషంగా తినారు.',
    corrected: 'అందరూ సంతోషంగా తిన్నారు.',
    translation: 'Everyone ate happily.',
    blanks: [
      {
        wordIdx: 2,
        incorrect: 'తినారు.',
        correct: 'తిన్నారు.',
        baseLetter: 'నా',
        correctOttu: '్న',
        options: ['్న', '్మ', '్ర']
      }
    ]
  },
  {
    id: 's4',
    original: 'అమ్మ కవంతో మజ్జిగ చేసింది.',
    corrected: 'అమ్మ కవ్వంతో మజ్జిగ చేసింది.',
    translation: 'Mother churned the buttermilk with a hand blender.',
    blanks: [
      {
        wordIdx: 1,
        incorrect: 'కవంతో',
        correct: 'కవ్వంతో',
        baseLetter: 'వ',
        correctOttu: '్వ',
        options: ['్వ', '్ప', '్మ']
      }
    ]
  },
  {
    id: 's5',
    original: '9 అంకె 81 ని నిశేషంగా భాగిస్తుంది.',
    corrected: '9 అంకె 81 ని నిశ్శేషంగా భాగిస్తుంది.',
    translation: 'The number 9 divides 81 completely without remainder.',
    blanks: [
      {
        wordIdx: 4,
        incorrect: 'నిశేషంగా',
        correct: 'నిశ్శేషంగా',
        baseLetter: 'శే',
        correctOttu: '్శ',
        options: ['్శ', '్ష', '్స']
      }
    ]
  },
  {
    id: 's6',
    original: 'కొత్త మువలు సవడి చేశాయి.',
    corrected: 'కొత్త మువ్వలు సవ్వడి చేశాయి.',
    translation: 'The new anklet bells made a sweet ringing sound.',
    blanks: [
      {
        wordIdx: 1,
        incorrect: 'మువలు',
        correct: 'మువ్వలు',
        baseLetter: 'వ',
        correctOttu: '్వ',
        options: ['్వ', '్మ', '్ప']
      },
      {
        wordIdx: 2,
        incorrect: 'సవడి',
        correct: 'సవ్వడి',
        baseLetter: 'వ',
        correctOttu: '్వ',
        options: ['్వ', '్ల', '్స']
      }
    ]
  },
  {
    id: 's7',
    original: 'బసు ఎక్కేటప్పుడు వరుస పధతి పాటించాలి.',
    corrected: 'బస్సు ఎక్కేటప్పుడు వరుస పద్ధతి పాటించాలి.',
    translation: 'A queue system must be followed when boarding the bus.',
    blanks: [
      {
        wordIdx: 0,
        incorrect: 'బసు',
        correct: 'బస్సు',
        baseLetter: 'సు',
        correctOttu: '్స',
        options: ['్స', '్శ', '్ష']
      },
      {
        wordIdx: 3,
        incorrect: 'పధతి',
        correct: 'పద్ధతి',
        baseLetter: 'ధ',
        correctOttu: '్ధ',
        options: ['్ధ', '్త', '్డ']
      }
    ]
  },
  {
    id: 's8',
    original: 'ఆరోగ్యకరమైన అలవాట్లు ఆయుషును పెంచుతాయి.',
    corrected: 'ఆరోగ్యకరమైన అలవాట్లు ఆయుష్షును పెంచుతాయి.',
    translation: 'Healthy habits prolong life span.',
    blanks: [
      {
        wordIdx: 3,
        incorrect: 'ఆయుషును',
        correct: 'ఆయుష్షును',
        baseLetter: 'షు',
        correctOttu: '్ష',
        options: ['్ష', '్స', '్శ']
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: "కింది వాటిలో 'మ' ఒత్తు గల పదం ఏది?",
    options: ['తప్పు', 'కొమ్మలు', 'బియ్యం', 'రబ్బరు'],
    correctAnswer: 'కొమ్మలు',
    explanation: "'కొమ్మలు' పదంలో 'మ' అక్షరానికి 'మ' ఒత్తు (్మ) జతచేయబడింది. కావున ఇది మ-ఒత్తు పదం."
  },
  {
    id: 'q2',
    question: "'రబ్బరు' పదంలో ఏ ఒత్తు ఉంది?",
    options: ['ప ఒత్తు', 'య ఒత్తు', 'మ ఒత్తు', 'బ ఒత్తు'],
    correctAnswer: 'బ ఒత్తు',
    explanation: "'రబ్బరు' పదంలో 'బ' అక్షరానికి 'బ' ఒత్తు (్బ) చేరింది."
  },
  {
    id: 'q3',
    question: "కింది వాటిలో 'య' ఒత్తు పదం ఏది?",
    options: ['నిప్పు', 'జీలకర్ర', 'తియ్యన', 'డబ్బా'],
    correctAnswer: 'తియ్యన',
    explanation: "'తియ్యన' లో 'య' అక్షరానికి 'య' ఒత్తు (్య) జత చేయబడింది."
  },
  {
    id: 'q4',
    question: "'జీలకర్ర' పదంలో సరైన ద్విత్వాక్షరం ఏది?",
    options: ['ప్ప', 'ర్ర', 'మ్మ', 'బ్బ'],
    correctAnswer: 'ర్ర',
    explanation: "'జీలకర్ర' లో 'ర' కు 'ర' ఒత్తు (్ర) చేరి 'ర్ర' అనే ద్విత్వాక్షరం ఏర్పడింది."
  },
  {
    id: 'q5',
    question: "ద్విత్వాక్షరం అంటే ఏమిటి?",
    options: [
      'ఒక హల్లుకు అదే హల్లు ఒత్తుగా చేరడం',
      'ఒక హల్లుకు వేరే హల్లు ఒత్తుగా చేరడం',
      'మూడు హల్లులు కలిసి రావడం',
      'అచ్చులు మాత్రమే ఉండడం'
    ],
    correctAnswer: 'ఒక హల్లుకు అదే హల్లు ఒత్తుగా చేరడం',
    explanation: "ఒక హల్లు అక్షరానికి అదే హల్లు యొక్క ఒత్తు గుర్తు జతకూడితే దానిని ద్విత్వాక్షరం అంటారు (ఉదా: క్క, గ్గ, మ్మ)."
  }
];

export interface CompleteDictionaryItem {
  letter: string;
  ottu: string;
  name: string;
  words: {
    word: string;
    meaning: string;
    syllable: string; // the highlighted double consonant syllable
  }[];
}

export const ALL_TELUGU_CONSONANTS_DICTIONARY: CompleteDictionaryItem[] = [
  {
    letter: 'క',
    ottu: '్క',
    name: 'క ఒత్తు (ka-ottu)',
    words: [
      { word: 'కుక్క', meaning: 'Dog', syllable: 'క్క' },
      { word: 'అక్క', meaning: 'Elder Sister', syllable: 'క్క' },
      { word: 'ముక్కు', meaning: 'Nose', syllable: 'క్కు' },
      { word: 'చక్కెర', meaning: 'Sugar', syllable: 'क्के' }
    ]
  },
  {
    letter: 'ఖ',
    ottu: '్ఖ',
    name: 'ఖ ఒత్తు (kha-ottu)',
    words: [
      { word: 'మూర్ఖుడు', meaning: 'Foolish Person', syllable: 'ర్ఖు' },
      { word: 'దుఃఖము', meaning: 'Sorrow / Grief', syllable: 'ఖ' }
    ]
  },
  {
    letter: 'గ',
    ottu: '్గ',
    name: 'గ ఒత్తు (ga-ottu)',
    words: [
      { word: 'మొగ్గ', meaning: 'Flower Bud', syllable: 'గ్గ' },
      { word: 'అగ్గిపెట్టె', meaning: 'Matchbox', syllable: 'గ్గి' },
      { word: 'సిగ్గు', meaning: 'Shyness / Shame', syllable: 'గ్గు' },
      { word: 'దగ్గు', meaning: 'Cough', syllable: 'గ్గు' }
    ]
  },
  {
    letter: 'ఘ',
    ottu: '్ఘ',
    name: 'ఘ ఒత్తు (gha-ottu)',
    words: [
      { word: 'ఘోరము', meaning: 'Terrible (Base)', syllable: 'ఘ' },
      { word: 'దీర్ఘము', meaning: 'Long vowel / Length', syllable: 'ర్ఘ' }
    ]
  },
  {
    letter: 'చ',
    ottu: '్చ',
    name: 'చ ఒత్తు (cha-ottu)',
    words: [
      { word: 'పిచ్చుక', meaning: 'Sparrow', syllable: 'చ్చు' },
      { word: 'పచ్చడి', meaning: 'Pickle / Chutney', syllable: 'చ్చ' },
      { word: 'నిచ్చెన', meaning: 'Ladder', syllable: 'చ్చె' },
      { word: 'రచ్చబండ', meaning: 'Village Community Platform', syllable: 'చ్చ' }
    ]
  },
  {
    letter: 'ఛ',
    ottu: '్ఛ',
    name: 'ఛ ఒత్తు (chha-ottu)',
    words: [
      { word: 'పృచ్ఛకుడు', meaning: 'Inquirer', syllable: 'చ్ఛు' },
      { word: 'ఉచ్ఛ్వాసము', meaning: 'Inhalation', syllable: 'చ్ఛ్వా' }
    ]
  },
  {
    letter: 'జ',
    ottu: '్జ',
    name: 'జ ఒత్తు (ja-ottu)',
    words: [
      { word: 'గుజ్జు', meaning: 'Pulp / Juice', syllable: 'జ్జు' },
      { word: 'బజ్జీలు', meaning: 'Fried Fritters', syllable: 'జ్జీ' },
      { word: 'గజ్జెలు', meaning: 'Anklet Bells', syllable: 'జ్జె' },
      { word: 'సజ్జలు', meaning: 'Pearl Millet', syllable: 'జ్జ' }
    ]
  },
  {
    letter: 'ఝ',
    ottu: '్ఝ',
    name: 'ఝ ఒత్తు (jha-ottu)',
    words: [
      { word: 'ఉజ్ఝ్వల', meaning: 'Radiant / Splendid', syllable: 'జ్ఝ్వ' },
      { word: 'నిర్ఝరము', meaning: 'Waterfall / Stream', syllable: 'ర్ఝ' }
    ]
  },
  {
    letter: 'ట',
    ottu: '్ట',
    name: 'ట ఒత్తు (ta-ottu)',
    words: [
      { word: 'పెట్టె', meaning: 'Box / Chest', syllable: 'ట్టె' },
      { word: 'చెట్టు', meaning: 'Tree', syllable: 'ట్టు' },
      { word: 'పట్టణము', meaning: 'Town / City', syllable: 'ట్ట' },
      { word: 'తట్ట', meaning: 'Basket / Tray', syllable: 'ట్ట' }
    ]
  },
  {
    letter: 'ఠ',
    ottu: '్ఠ',
    name: 'ఠ ఒత్తు (tha-ottu)',
    words: [
      { word: 'అట్టహాసము', meaning: 'Loud Boisterous Laughter', syllable: 'ట్ట' },
      { word: 'పాఠశాల', meaning: 'School (aspirated character)', syllable: 'ఠ' }
    ]
  },
  {
    letter: 'డ',
    ottu: '్డ',
    name: 'డ ఒత్తు (da-ottu)',
    words: [
      { word: 'లడ్డు', meaning: 'Laddoo Sweet', syllable: 'డ్డు' },
      { word: 'గొడ్డలి', meaning: 'Axe', syllable: 'డ్డ' },
      { word: 'వడ్డించు', meaning: 'To Serve Food', syllable: 'డ్డి' },
      { word: 'గుడ్డు', meaning: 'Egg', syllable: 'డ్డు' }
    ]
  },
  {
    letter: 'ఢ',
    ottu: '్ఢ',
    name: 'ఢ ఒత్తు (dha-ottu)',
    words: [
      { word: 'గూఢము', meaning: 'Secret / Deep', syllable: 'ఢ' },
      { word: 'ఢమఢమ', meaning: 'Sound of drum', syllable: 'ఢ' }
    ]
  },
  {
    letter: 'ణ',
    ottu: '్ణ',
    name: 'ణ ఒత్తు (na-ottu)',
    words: [
      { word: 'ఉణ్ణి', meaning: 'Woolen fabric', syllable: 'ణ్ణి' },
      { word: 'కణ్ణన్', meaning: 'Lord Krishna (Dialect)', syllable: 'ణ్ణ' },
      { word: 'నిర్ణయము', meaning: 'Decision / Resolution', syllable: 'ర్ణ' }
    ]
  },
  {
    letter: 'త',
    ottu: '్త',
    name: 'త ఒత్తు (ta-ottu)',
    words: [
      { word: 'అత్త', meaning: 'Aunt / Mother-in-law', syllable: 'త్త' },
      { word: 'నత్త', meaning: 'Snail', syllable: 'త్త' },
      { word: 'సుత్తి', meaning: 'Hammer', syllable: 'త్తి' },
      { word: 'కత్తెర', meaning: 'Scissors', syllable: 'త్తె' }
    ]
  },
  {
    letter: 'థ',
    ottu: '్థ',
    name: 'థ ఒత్తు (tha-ottu)',
    words: [
      { word: 'జత్థా', meaning: 'Sikh Troop / Group', syllable: 'త్థా' },
      { word: 'పితృస్వామ్యము', meaning: 'Patriarchy', syllable: 'మ్య' }
    ]
  },
  {
    letter: 'ద',
    ottu: '్ద',
    name: 'ద ఒత్తు (da-ottu)',
    words: [
      { word: 'ఎద్దు', meaning: 'Bull / Ox', syllable: 'ద్దు' },
      { word: 'ముద్ద', meaning: 'Lump of Food', syllable: 'ద్ద' },
      { word: 'అద్దము', meaning: 'Mirror', syllable: 'ద్ద' },
      { word: 'పెద్ద', meaning: 'Big / Elder', syllable: 'ద్ద' }
    ]
  },
  {
    letter: 'ధ',
    ottu: '్ధ',
    name: 'ధ ఒత్తు (dha-ottu)',
    words: [
      { word: 'ఉద్ధండ', meaning: 'Formidable / Mighty', syllable: 'ద్ధం' },
      { word: 'ప్రసిద్ధ', meaning: 'Famous / Well-known', syllable: 'ద్ధ' }
    ]
  },
  {
    letter: 'న',
    ottu: '్న',
    name: 'న ఒత్తు (na-ottu)',
    words: [
      { word: 'అన్న', meaning: 'Elder Brother', syllable: 'న్న' },
      { word: 'వెన్నెల', meaning: 'Moonlight', syllable: 'న్నె' },
      { word: 'కన్ను', meaning: 'Eye', syllable: 'న్ను' },
      { word: 'జొన్నలు', meaning: 'Sorghum / Jowar', syllable: 'న్న' }
    ]
  },
  {
    letter: 'ప',
    ottu: '్ప',
    name: 'ప ఒత్తు (pa-ottu)',
    words: [
      { word: 'కప్ప', meaning: 'Frog', syllable: 'ప్ప' },
      { word: 'తప్పు', meaning: 'Wrong / Error', syllable: 'ప్పు' },
      { word: 'చెప్పులు', meaning: 'Slippers / Sandals', syllable: 'ప్పు' },
      { word: 'నిప్పు', meaning: 'Fire / Ember', syllable: 'ప్పు' }
    ]
  },
  {
    letter: 'ఫ',
    ottu: '్ఫ',
    name: 'ఫ ఒత్తు (pha-ottu)',
    words: [
      { word: 'ముస్తఫా', meaning: 'Mustafa (Name)', syllable: 'ఫా' },
      { word: 'షరీఫ్', meaning: 'Sharif (Name)', syllable: 'ఫ్' }
    ]
  },
  {
    letter: 'బ',
    ottu: '్బ',
    name: 'బ ఒత్తు (ba-ottu)',
    words: [
      { word: 'డబ్బా', meaning: 'Tin Box / Container', syllable: 'బ్బా' },
      { word: 'మబ్బు', meaning: 'Cloud', syllable: 'బ్బు' },
      { word: 'రబ్బరు', meaning: 'Eraser / Rubber', syllable: 'బ్బ' },
      { word: 'గబ్బిలం', meaning: 'Bat (mammal)', syllable: 'బ్బి' }
    ]
  },
  {
    letter: 'భ',
    ottu: '్భ',
    name: 'భ ఒత్తు (bha-ottu)',
    words: [
      { word: 'గర్భము', meaning: 'Womb / Pregnancy', syllable: 'ర్భ' },
      { word: 'నిర్భయ', meaning: 'Fearless', syllable: 'ర్భ' }
    ]
  },
  {
    letter: 'మ',
    ottu: '్మ',
    name: 'మ ఒత్తు (ma-ottu)',
    words: [
      { word: 'అమ్మ', meaning: 'Mother', syllable: 'మ్మ' },
      { word: 'తమ్ముడు', meaning: 'Younger Brother', syllable: 'మ్ము' },
      { word: 'బొమ్మ', meaning: 'Doll / Toy', syllable: 'మ్మ' },
      { word: 'కొమ్మ', meaning: 'Branch of tree', syllable: 'మ్మ' }
    ]
  },
  {
    letter: 'య',
    ottu: '్య',
    name: 'య ఒత్తు (ya-ottu)',
    words: [
      { word: 'నెయ్యి', meaning: 'Ghee / Clarified Butter', syllable: 'య్యి' },
      { word: 'తియ్యన', meaning: 'Sweetness', syllable: 'య్య' },
      { word: 'కొయ్య', meaning: 'Wood', syllable: 'య్య' },
      { word: 'బియ్యం', meaning: 'Uncooked Rice', syllable: 'య్యం' }
    ]
  },
  {
    letter: 'ర',
    ottu: '్ర',
    name: 'ర ఒత్తు (ra-ottu)',
    words: [
      { word: 'కర్ర', meaning: 'Wood / Stick', syllable: 'ర్ర' },
      { word: 'గొర్రె', meaning: 'Sheep', syllable: 'ర్రె' },
      { word: 'జీలకర్ర', meaning: 'Cumin', syllable: 'ర్ర' },
      { word: 'బుర్ర', meaning: 'Head / Brain', syllable: 'ర్ర' }
    ]
  },
  {
    letter: 'ల',
    ottu: '్ల',
    name: 'ల ఒత్తు (la-ottu)',
    words: [
      { word: 'పిల్లి', meaning: 'Cat', syllable: 'ల్లి' },
      { word: 'బల్లి', meaning: 'Lizard', syllable: 'ల్లి' },
      { word: 'మల్లెపూవు', meaning: 'Jasmine Flower', syllable: 'ల్లె' },
      { word: 'తల్లి', meaning: 'Mother', syllable: 'ల్లి' }
    ]
  },
  {
    letter: 'వ',
    ottu: '్వ',
    name: 'వ ఒత్తు (va-ottu)',
    words: [
      { word: 'అవ్వ', meaning: 'Grandmother', syllable: 'వ్వ' },
      { word: 'పువ్వు', meaning: 'Flower', syllable: 'వ్వు' },
      { word: 'మవ్వము', meaning: 'Softness / Youth', syllable: 'వ్వ' },
      { word: 'కవ్వము', meaning: 'Churning Stick', syllable: 'వ్వ' }
    ]
  },
  {
    letter: 'శ',
    ottu: '్శ',
    name: 'శ ఒత్తు (sha-ottu)',
    words: [
      { word: 'నిశ్శబ్దము', meaning: 'Silence', syllable: 'శ్శ' },
      { word: 'నిశ్శేషము', meaning: 'Completely divisible', syllable: 'శ్శే' }
    ]
  },
  {
    letter: 'ష',
    ottu: '్ష',
    name: 'ష ఒత్తు (ssa-ottu)',
    words: [
      { word: 'ఆయుష్షు', meaning: 'Longevity / Lifespan', syllable: 'ష్షు' },
      { word: 'కల్మషము', meaning: 'Impurity', syllable: 'ల్మ' }
    ]
  },
  {
    letter: 'స',
    ottu: '్స',
    name: 'స ఒత్తు (sa-ottu)',
    words: [
      { word: 'బస్సు', meaning: 'Bus', syllable: 'స్సు' },
      { word: 'మనస్సు', meaning: 'Mind / Heart', syllable: 'స్సు' },
      { word: 'ధనుస్సు', meaning: 'Bow (weapon)', syllable: 'స్సు' },
      { word: 'తపస్సు', meaning: 'Penance / Meditation', syllable: 'స్సు' }
    ]
  },
  {
    letter: 'హ',
    ottu: '్హ',
    name: 'హ ఒత్తు (ha-ottu)',
    words: [
      { word: 'అహ్లాదము', meaning: 'Pleasantness (Combination)', syllable: 'హ్లా' },
      { word: 'మధ్యాహ్నము', meaning: 'Afternoon', syllable: 'హ్న' }
    ]
  },
  {
    letter: 'ళ',
    ottu: '్ళ',
    name: 'ళ ఒత్తు (la-ottu)',
    words: [
      { word: 'కాళ్ళు', meaning: 'Legs / Feet', syllable: 'ళ్ళు' },
      { word: 'గోళ్ళు', meaning: 'Nails (finger/toe)', syllable: 'ళ్ళు' },
      { word: 'పెళ్ళి', meaning: 'Marriage / Wedding', syllable: 'ళ్ళి' },
      { word: 'నీళ్ళు', meaning: 'Water', syllable: 'ళ్ళు' }
    ]
  },
  {
    letter: 'క్ష',
    ottu: '్క్ష',
    name: 'క్ష ఒత్తు (ksha-ottu)',
    words: [
      { word: 'రక్ష', meaning: 'Protection', syllable: 'క్ష' },
      { word: 'శిక్ష', meaning: 'Punishment / Training', syllable: 'క్ష' },
      { word: 'పక్షులు', meaning: 'Birds', syllable: 'క్షు' }
    ]
  },
  {
    letter: 'ఱ',
    ottu: '్ఱ',
    name: 'ఱ ఒత్తు (rra-ottu)',
    words: [
      { word: 'గుఱ్ఱము', meaning: 'Horse', syllable: 'ఱ్ఱ' },
      { word: 'బుఱ్ఱ', meaning: 'Brain / Clay Pot', syllable: 'ఱ్ఱ' },
      { word: 'పిట్టగోడ', meaning: 'Parapet wall (Related word)', syllable: 'ట్ట' }
    ]
  }
];
