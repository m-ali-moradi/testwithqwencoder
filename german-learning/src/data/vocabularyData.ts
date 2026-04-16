import type { VocabularyCategory } from '../types';

export const vocabularyData: VocabularyCategory[] = [
  {
    id: 'greetings',
    slug: 'greetings-and-introductions',
    title: 'Greetings & Introductions',
    description: 'Essential phrases for meeting people, saying hello and goodbye, and introducing yourself in German.',
    level: 'A1',
    icon: '👋',
    color: 'blue',
    seoTitle: 'Learn German Greetings & Introductions - Essential A1 Vocabulary',
    seoDescription: 'Master essential German greetings, introductions, and polite phrases. Perfect for beginners starting their German journey.',
    keywords: ['hallo', 'tschüss', 'guten tag', 'introductions', 'greetings'],
    words: [
      { id: 'g1', german: 'Hallo', english: 'Hello', example: 'Hallo, wie geht es dir?', pronunciation: '/ˈhalo/', tags: ['greeting', 'informal'] },
      { id: 'g2', german: 'Guten Morgen', english: 'Good morning', example: 'Guten Morgen! Hast du gut geschlafen?', pronunciation: '/ˌɡuːtn̩ ˈmɔʁɡn̩/', tags: ['greeting', 'morning'] },
      { id: 'g3', german: 'Guten Tag', english: 'Good day / Hello', example: 'Guten Tag, mein Name ist Anna.', pronunciation: '/ˌɡuːtn̩ ˈtaːk/', tags: ['greeting', 'formal'] },
      { id: 'g4', german: 'Guten Abend', english: 'Good evening', example: 'Guten Abend, willkommen!', pronunciation: '/ˌɡuːtn̩ ˈaːbn̩t/', tags: ['greeting', 'evening'] },
      { id: 'g5', german: 'Gute Nacht', english: 'Good night', example: 'Gute Nacht und träum schön.', pronunciation: '/ˌɡuːtə ˈnaxt/', tags: ['farewell', 'night'] },
      { id: 'g6', german: 'Tschüss', english: 'Bye (informal)', example: 'Tschüss, bis morgen!', pronunciation: '/tʃyːs/', tags: ['farewell', 'informal'] },
      { id: 'g7', german: 'Auf Wiedersehen', english: 'Goodbye (formal)', example: 'Auf Wiedersehen, Herr Müller.', pronunciation: '/aʊf ˈviːdɐˌzeːən/', tags: ['farewell', 'formal'] },
      { id: 'g8', german: 'Bis später', english: 'See you later', example: 'Bis später im Café!', pronunciation: '/bɪs ˈʃpɛːtɐ/', tags: ['farewell', 'informal'] },
      { id: 'g9', german: 'Wie heißt du?', english: 'What is your name? (informal)', example: 'Hallo, wie heißt du?', pronunciation: '/viː haɪ̯st duː/', tags: ['question', 'introduction'] },
      { id: 'g10', german: 'Ich heiße...', english: 'My name is...', example: 'Ich heiße Thomas.', pronunciation: '/ɪç ˈhaɪ̯sə/', tags: ['introduction'] },
      { id: 'g11', german: 'Freut mich', english: 'Nice to meet you', example: 'Freut mich, dich kennenzulernen.', pronunciation: '/fʁɔɪ̯t mɪç/', tags: ['polite', 'introduction'] },
      { id: 'g12', german: 'Wie geht es Ihnen?', english: 'How are you? (formal)', example: 'Guten Tag, wie geht es Ihnen?', pronunciation: '/viː ɡeːt ɛs ˈiːnən/', tags: ['question', 'formal'] },
      { id: 'g13', german: 'Mir geht es gut', english: 'I am doing well', example: 'Danke, mir geht es gut.', pronunciation: '/miːɐ̯ ɡeːt ɛs ɡuːt/', tags: ['response'] },
    ]
  },
];
