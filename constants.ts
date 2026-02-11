import { Unit, UserProgress } from './types';

export const UNITS: Unit[] = [
  {
    id: 1,
    title: "Unit 1",
    topic: "Local Environment",
    description: "Explore traditional crafts and places of interest.",
    color: "bg-emerald-500",
    image: "https://picsum.photos/400/200?random=1",
    vocab: [
      {
        id: "v1",
        word: "Artisan",
        pronunciation: "/ˈɑːtɪzən/",
        meaning: "Thợ thủ công",
        example: "The artisan created a beautiful clay vase.",
        image: "https://picsum.photos/200/200?random=10"
      },
      {
        id: "v2",
        word: "Handicraft",
        pronunciation: "/ˈhændikrɑːft/",
        meaning: "Sản phẩm thủ công",
        example: "This village is famous for its bamboo handicrafts.",
        image: "https://picsum.photos/200/200?random=11"
      },
      {
        id: "v3",
        word: "Attraction",
        pronunciation: "/əˈtrækʃn/",
        meaning: "Điểm hấp dẫn, thu hút",
        example: "Ha Long Bay is a major tourist attraction in Vietnam.",
        image: "https://picsum.photos/200/200?random=12"
      }
    ],
    listening: {
      id: "l1",
      title: "A Visit to Bat Trang Village",
      transcript: "Last Sunday, Mi and her parents visited Bat Trang pottery village. It is about 13 kilometers from central Hanoi. They saw many artisans making pottery. Mi learned how to make a vase from clay. She felt very happy because she made a small gift for her grandmother.",
      questions: [
        {
          question: "Where did Mi go last Sunday?",
          options: ["Dong Ho Village", "Bat Trang Village", "Van Phuc Village", "Ha Long Bay"],
          correctAnswer: 1
        },
        {
          question: "How far is it from central Hanoi?",
          options: ["30 km", "3 km", "13 km", "33 km"],
          correctAnswer: 2
        },
        {
          question: "What did Mi make?",
          options: ["A cup", "A bowl", "A plate", "A vase"],
          correctAnswer: 3
        }
      ]
    },
    speaking: [
      {
        id: "s1",
        sentence: "The artisans are moulding clay to make traditional pots.",
        context: "Describing what you see in a workshop."
      },
      {
        id: "s2",
        sentence: "I like going to this village because it is very peaceful.",
        context: "Expressing preference."
      }
    ]
  },
  {
    id: 2,
    title: "Unit 2",
    topic: "City Life",
    description: "Discussing city life features and problems.",
    color: "bg-indigo-500",
    image: "https://picsum.photos/400/200?random=2",
    vocab: [
      {
        id: "v2-1",
        word: "Bustling",
        pronunciation: "/ˈbʌslɪŋ/",
        meaning: "Nhộn nhịp, huyên náo",
        example: "Ho Chi Minh City is a bustling metropolis.",
        image: "https://picsum.photos/200/200?random=20"
      },
      {
        id: "v2-2",
        word: "Metro",
        pronunciation: "/ˈmetrəʊ/",
        meaning: "Tàu điện ngầm/đô thị",
        example: "The new metro line will reduce traffic jams.",
        image: "https://picsum.photos/200/200?random=21"
      }
    ],
    listening: {
      id: "l2",
      title: "Living in the Big City",
      transcript: "Living in a big city has both advantages and disadvantages. It offers good job opportunities and entertainment. However, traffic congestion and air pollution are serious problems. Many young people still prefer the city because of its bustling lifestyle.",
      questions: [
        {
          question: "What is a disadvantage of city life mentioned?",
          options: ["Entertainment", "Traffic congestion", "Good jobs", "Shopping"],
          correctAnswer: 1
        }
      ]
    },
    speaking: [
      {
        id: "s2-1",
        sentence: "The traffic is always heavy during rush hour.",
        context: "Complaining about traffic."
      }
    ]
  },
  {
    id: 9,
    title: "Unit 9",
    topic: "World Englishes",
    description: "Discover English varieties and how it connects the world.",
    color: "bg-blue-500",
    image: "https://picsum.photos/400/200?random=9",
    vocab: [
      {
        id: "v9-1",
        word: "Variety",
        pronunciation: "/vəˈraɪəti/",
        meaning: "Sự đa dạng / Biến thể",
        example: "American English and British English are two varieties of the same language.",
        image: "https://picsum.photos/200/200?random=91"
      },
      {
        id: "v9-2",
        word: "Bilingual",
        pronunciation: "/baɪˈlɪŋɡwəl/",
        meaning: "Song ngữ",
        example: "She is bilingual because she speaks both Vietnamese and English perfectly.",
        image: "https://picsum.photos/200/200?random=92"
      },
      {
        id: "v9-3",
        word: "Fluent",
        pronunciation: "/ˈfluːənt/",
        meaning: "Trôi chảy",
        example: "To be fluent in English, you need to practice speaking every day.",
        image: "https://picsum.photos/200/200?random=93"
      },
      {
        id: "v9-4",
        word: "Concentric",
        pronunciation: "/kənˈsentrɪk/",
        meaning: "Đồng tâm",
        example: "Kachru's model of World Englishes consists of three concentric circles.",
        image: "https://picsum.photos/200/200?random=94"
      },
      {
        id: "v9-5",
        word: "Official language",
        pronunciation: "/əˈfɪʃl ˈlæŋɡwɪdʒ/",
        meaning: "Ngôn ngữ chính thức",
        example: "English is an official language in Singapore and India.",
        image: "https://picsum.photos/200/200?random=95"
      },
      {
        id: "v9-6",
        word: "Translate",
        pronunciation: "/trænzˈleɪt/",
        meaning: "Dịch",
        example: "Can you translate this sentence into Vietnamese?",
        image: "https://picsum.photos/200/200?random=96"
      },
      {
        id: "v9-7",
        word: "Copy",
        pronunciation: "/ˈkɒpi/",
        meaning: "Sao chép, bắt chước",
        example: "Don't just copy the teacher; try to understand the meaning.",
        image: "https://picsum.photos/200/200?random=97"
      },
      {
        id: "v9-8",
        word: "Look up",
        pronunciation: "/lʊk ʌp/",
        meaning: "Tra cứu (từ điển)",
        example: "If you don't know a word, look it up in the dictionary.",
        image: "https://picsum.photos/200/200?random=98"
      },
      {
        id: "v9-9",
        word: "Pick up",
        pronunciation: "/pɪk ʌp/",
        meaning: "Học lỏm, học nhanh",
        example: "Children can pick up a new language very quickly.",
        image: "https://picsum.photos/200/200?random=99"
      },
      {
        id: "v9-10",
        word: "Go over",
        pronunciation: "/ɡəʊ ˈəʊvə(r)/",
        meaning: "Xem lại, kiểm tra lại",
        example: "Let's go over the grammar rules before the test.",
        image: "https://picsum.photos/200/200?random=100"
      }
    ],
    listening: {
      id: "l9",
      title: "English Around the World",
      transcript: "English is spoken in many countries around the world. In the United Kingdom, the USA, and Australia, it is the mother tongue. In countries like India and Singapore, it is an official language used in government and schools. There are many varieties of English, but we can all understand each other. This makes English a global language that connects people.",
      questions: [
        {
          question: "Where is English the mother tongue?",
          options: ["Vietnam", "The USA", "France", "Japan"],
          correctAnswer: 1
        },
        {
          question: "In India, English is...",
          options: ["A foreign language", "An official language", "Not used", "Only for tourists"],
          correctAnswer: 1
        },
        {
          question: "What does English do for people?",
          options: ["Confuses them", "Separates them", "Connects them", "Bores them"],
          correctAnswer: 2
        }
      ]
    },
    speaking: [
      {
        id: "s9-1",
        sentence: "English is an official language in many countries.",
        context: "Stating a fact about English."
      },
      {
        id: "s9-2",
        sentence: "I want to become fluent in English to travel the world.",
        context: "Talking about your goals."
      }
    ],
    pronunciation: {
      id: "p9",
      topic: "Word Stress: -ion and -ity",
      rule: "Words ending in -ion: Stress falls on the syllable before -ion.\nWords ending in -ity: Stress falls on the third syllable from the end.",
      words: [
        { word: "Education", syllables: ["ed", "u", "ca", "tion"], stressIndex: 2 },
        { word: "Population", syllables: ["pop", "u", "la", "tion"], stressIndex: 2 },
        { word: "Ability", syllables: ["a", "bil", "i", "ty"], stressIndex: 1 },
        { word: "Nationality", syllables: ["na", "tion", "al", "i", "ty"], stressIndex: 2 }
      ]
    },
    grammar: {
      id: "g9",
      topic: "Defining Relative Clauses",
      rule: "We use defining relative clauses to identify which person or thing we are talking about. \n\n• **Who**: for people\n• **Which**: for things/animals\n• **That**: for people or things",
      questions: [
        {
          question: "The student _____ speaks English best is Minh.",
          options: ["which", "who", "where"],
          correctAnswer: 1
        },
        {
          question: "This is the book _____ connects cultures.",
          options: ["who", "which", "whose"],
          correctAnswer: 1
        },
        {
          question: "English is a language _____ is used globally.",
          options: ["that", "who", "whom"],
          correctAnswer: 0
        },
        {
          question: "The girl _____ sits next to me is fluent in French.",
          options: ["which", "who", "where"],
          correctAnswer: 1
        }
      ]
    }
  }
];

export const MOCK_CLASSMATES = [
  { name: "Nguyen Van A", xp: 1800, classId: "9A", id: "hs001" },
  { name: "Tran Thi B", xp: 1650, classId: "9A", id: "hs002" },
  { name: "Le Hoang C", xp: 1400, classId: "9A", id: "hs003" },
  { name: "Pham Minh D", xp: 1200, classId: "9A", id: "hs004" },
  { name: "Vu Thu E", xp: 950, classId: "9A", id: "hs005" },
];

export const INITIAL_USER: UserProgress = {
  profile: {
    name: "Student",
    classId: "9A",
    studentId: "guest"
  },
  xp: 0,
  level: 1,
  streak: 0,
  completedUnits: [],
  badges: []
};