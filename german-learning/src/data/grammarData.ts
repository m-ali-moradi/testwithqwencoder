import type { GrammarTopic, GrammarRule, GrammarTable, GrammarTip } from '../types';

export const grammarData: GrammarTopic[] = [
  {
    id: 'articles-nominative',
    slug: 'artikel-im-nominativ',
    title: 'Artikel im Nominativ (Articles in Nominative)',
    level: 'A1',
    category: 'Nouns',
    shortDescription: 'Learn about German articles (der, die, das) in the nominative case.',
    seoTitle: 'German Articles in Nominative Case | Der, Die, Das Explained',
    seoDescription: 'Master German nominative articles with detailed explanations, tables, and examples. Learn when to use der, die, das for masculine, feminine, and neuter nouns.',
    keywords: ['german articles', 'nominative case', 'der die das', 'german grammar A1'],
    views: 1250,
    order: 1,
    
    introduction: 'In German, every noun has a gender: masculine (männlich), feminine (weiblich), or neuter (sächlich). The article changes based on the gender and the grammatical case.',
    
    definition: 'The nominative case is used for the subject of a sentence—the person or thing performing the action.',
    
    rules: [
      {
        title: 'Definite Articles (Bestimmte Artikel)',
        description: 'Used when referring to specific nouns.',
        formula: 'der (masculine) | die (feminine) | das (neuter) | die (plural)',
        example: 'Der Mann liest. Die Frau arbeitet. Das Kind spielt.'
      },
      {
        title: 'Indefinite Articles (Unbestimmte Artikel)',
        description: 'Used when referring to non-specific nouns.',
        formula: 'ein (masculine/neuter) | eine (feminine)',
        example: 'Ein Mann liest. Eine Frau arbeitet. Ein Kind spielt.'
      },
      {
        title: 'Null Article',
        description: 'No article is used with plural indefinite nouns, materials, and abstract concepts.',
        example: 'Kinder spielen. Wasser ist wichtig. Liebe ist blind.'
      }
    ],
    
    tables: [
      {
        caption: 'Definite Articles in Nominative Case',
        headers: ['Gender', 'Article', 'Example', 'English'],
        rows: [
          ['Masculine', 'der', 'der Mann', 'the man'],
          ['Feminine', 'die', 'die Frau', 'the woman'],
          ['Neuter', 'das', 'das Kind', 'the child'],
          ['Plural', 'die', 'die Kinder', 'the children']
        ]
      },
      {
        caption: 'Indefinite Articles in Nominative Case',
        headers: ['Gender', 'Article', 'Example', 'English'],
        rows: [
          ['Masculine', 'ein', 'ein Tisch', 'a table'],
          ['Feminine', 'eine', 'eine Lampe', 'a lamp'],
          ['Neuter', 'ein', 'ein Buch', 'a book'],
          ['Plural', '-', 'Bücher', 'books']
        ]
      }
    ],
    
    tips: [
      {
        type: 'info',
        content: 'About 46% of German nouns are masculine, 34% are feminine, and 20% are neuter.'
      },
      {
        type: 'success',
        content: 'Learning tip: Always learn nouns with their article! Don\'t learn "Tisch" - learn "der Tisch".'
      },
      {
        type: 'warning',
        content: 'Warning: The grammatical gender often doesn\'t match natural gender. "Das Mädchen" (the girl) is neuter!'
      }
    ],
    
    examples: [
      {
        german: 'Der Mann liest ein Buch.',
        english: 'The man is reading a book.',
        explanation: '"Mann" is masculine, so we use "der"'
      },
      {
        german: 'Die Frau trinkt Kaffee.',
        english: 'The woman is drinking coffee.',
        explanation: '"Frau" is feminine, so we use "die"'
      },
      {
        german: 'Das Kind spielt im Garten.',
        english: 'The child is playing in the garden.',
        explanation: '"Kind" is neuter, so we use "das"'
      },
      {
        german: 'Ein Hund bellt.',
        english: 'A dog is barking.',
        explanation: '"Hund" is masculine, indefinite article is "ein"'
      }
    ],
    
    exercises: [
      {
        id: 'art-nom-1',
        type: 'multiple-choice',
        question: 'Welcher Artikel ist korrekt? ___ Frau (the woman)',
        options: ['Der', 'Die', 'Das', 'Den'],
        correctAnswer: 'Die',
        hint: 'Frau is a feminine noun',
        explanation: '"Frau" is feminine, so the correct definite article in nominative is "die".'
      },
      {
        id: 'art-nom-2',
        type: 'multiple-choice',
        question: 'Welcher Artikel ist korrekt? ___ Mann (the man)',
        options: ['Die', 'Das', 'Der', 'Des'],
        correctAnswer: 'Der',
        hint: 'Mann is a masculine noun',
        explanation: '"Mann" is masculine, so the correct definite article in nominative is "der".'
      },
      {
        id: 'art-nom-3',
        type: 'fill-blank',
        question: '___ Kind spielt. (The child is playing.)',
        correctAnswer: 'Das',
        hint: 'Kind is a neuter noun',
        explanation: '"Kind" is neuter, so the correct definite article is "das".'
      },
      {
        id: 'art-nom-4',
        type: 'multiple-choice',
        question: 'Welcher unbestimmte Artikel ist korrekt? ___ Apfel (an apple)',
        options: ['Eine', 'Ein', 'Einen', 'Einer'],
        correctAnswer: 'Ein',
        hint: 'Apfel is masculine',
        explanation: '"Apfel" is masculine, so the indefinite article is "ein".'
      }
    ]
  },
  {
    id: 'verb-conjugation',
    slug: 'verbkonjugation-praesens',
    title: 'Verbkonjugation (Verb Conjugation)',
    level: 'A1',
    category: 'Verbs',
    shortDescription: 'Learn how to conjugate regular German verbs in present tense.',
    seoTitle: 'German Verb Conjugation Present Tense | Complete Guide',
    seoDescription: 'Master German verb conjugation in present tense with clear rules, conjugation tables, and practice exercises for beginners.',
    keywords: ['german verbs', 'conjugation', 'present tense', 'verb endings', 'A1 grammar'],
    views: 980,
    order: 2,
    
    introduction: 'Regular German verbs follow a predictable pattern when conjugated. Understanding this pattern is fundamental to speaking German correctly.',
    
    definition: 'Verb conjugation is the process of changing a verb form to match the subject (person and number) of the sentence.',
    
    rules: [
      {
        title: 'Finding the Stem',
        description: 'Remove the -en ending from the infinitive to get the verb stem.',
        formula: 'Infinitive (-en) = Stem',
        example: 'machen → mach-, lernen → lern-, spielen → spiel-'
      },
      {
        title: 'Adding Endings',
        description: 'Add the appropriate ending based on the subject pronoun.',
        formula: 'Stem + Ending = Conjugated Verb'
      },
      {
        title: 'Stem-Changing Verbs',
        description: 'Some verbs change their stem vowel in du and er/sie/es forms.',
        example: 'sprechen → du sprichst, er spricht | fahren → du fährst, er fährt'
      }
    ],
    
    tables: [
      {
        caption: 'Regular Verb Conjugation Pattern',
        headers: ['Person', 'Pronoun', 'Ending', 'Example: machen'],
        rows: [
          ['1st Singular', 'ich', '-e', 'ich mache'],
          ['2nd Singular', 'du', '-st', 'du machst'],
          ['3rd Singular', 'er/sie/es', '-t', 'er macht'],
          ['1st Plural', 'wir', '-en', 'wir machen'],
          ['2nd Plural', 'ihr', '-t', 'ihr macht'],
          ['3rd Plural / Formal', 'sie/Sie', '-en', 'sie machen']
        ]
      }
    ],
    
    tips: [
      {
        type: 'info',
        content: 'The verb "sein" (to be) is completely irregular: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'
      },
      {
        type: 'success',
        content: 'Practice tip: Create flashcards with pronouns on one side and the correct ending on the other.'
      },
      {
        type: 'warning',
        content: 'Watch out: Verbs ending in -eln and -ern sometimes drop the -e in the ich form (sammeln → ich sammle).'
      }
    ],
    
    examples: [
      {
        german: 'Ich lerne Deutsch.',
        english: 'I am learning German.',
        explanation: 'lernen + ich = lerne'
      },
      {
        german: 'Du spielst Fußball.',
        english: 'You are playing soccer.',
        explanation: 'spielen + du = spielst'
      },
      {
        german: 'Er arbeitet im Büro.',
        english: 'He works in the office.',
        explanation: 'arbeiten + er = arbeitet'
      },
      {
        german: 'Wir wohnen in Berlin.',
        english: 'We live in Berlin.',
        explanation: 'wohnen + wir = wohnen'
      }
    ],
    
    exercises: [
      {
        id: 'verb-1',
        type: 'fill-blank',
        question: 'Ich ___ Deutsch. (lernen)',
        correctAnswer: 'lerne',
        hint: 'First person singular ending is -e',
        explanation: 'For "ich", we add -e to the stem: lern + e = lerne'
      },
      {
        id: 'verb-2',
        type: 'fill-blank',
        question: 'Du ___ Fußball. (spielen)',
        correctAnswer: 'spielst',
        hint: 'Second person singular ending is -st',
        explanation: 'For "du", we add -st to the stem: spiel + st = spielst'
      },
      {
        id: 'verb-3',
        type: 'multiple-choice',
        question: 'Was ist korrekt? Er ___ Wasser. (trinken)',
        options: ['trinke', 'trinkst', 'trinkt', 'trinken'],
        correctAnswer: 'trinkt',
        hint: 'Third person singular ending is -t',
        explanation: 'For "er", we add -t to the stem: trink + t = trinkt'
      },
      {
        id: 'verb-4',
        type: 'fill-blank',
        question: 'Wir ___ in München. (wohnen)',
        correctAnswer: 'wohnen',
        hint: 'First person plural keeps the full infinitive form',
        explanation: 'For "wir", we use the full infinitive: wohnen'
      }
    ]
  },
  {
    id: 'accusative-case',
    slug: 'akkusativ-faelle',
    title: 'Akkusativ (Accusative Case)',
    level: 'A1',
    category: 'Cases',
    shortDescription: 'Understanding the accusative case and when to use it.',
    seoTitle: 'German Accusative Case Explained | Akkusativ Grammar Guide',
    seoDescription: 'Complete guide to the German accusative case. Learn article changes, accusative prepositions, and when to use direct objects.',
    keywords: ['akkusativ', 'accusative case', 'german cases', 'direct object', 'den der die das'],
    views: 875,
    order: 3,
    
    introduction: 'The accusative case is one of the four German grammatical cases. It primarily marks the direct object of a sentence.',
    
    definition: 'The accusative case indicates the direct object—the person or thing directly affected by the action of the verb.',
    
    rules: [
      {
        title: 'Only Masculine Changes',
        description: 'In the accusative case, only the masculine article changes. All others remain the same.',
        formula: 'der → den | ein → einen'
      },
      {
        title: 'Accusative Prepositions',
        description: 'These prepositions always require the accusative case:',
        example: 'durch, für, gegen, ohne, um, bis, entlang'
      },
      {
        title: 'Accusative Verbs',
        description: 'Some verbs always take an accusative object.',
        example: 'haben, sehen, kaufen, essen, trinken, suchen, finden'
      }
    ],
    
    tables: [
      {
        caption: 'Article Changes in Accusative Case',
        headers: ['Gender', 'Nominative', 'Accusative', 'Change'],
        rows: [
          ['Masculine', 'der', 'den', '✓ Changes'],
          ['Feminine', 'die', 'die', '— Same'],
          ['Neuter', 'das', 'das', '— Same'],
          ['Plural', 'die', 'die', '— Same']
        ]
      },
      {
        caption: 'Indefinite Articles in Accusative',
        headers: ['Gender', 'Nominative', 'Accusative'],
        rows: [
          ['Masculine', 'ein', 'einen'],
          ['Feminine', 'eine', 'eine'],
          ['Neuter', 'ein', 'ein']
        ]
      }
    ],
    
    tips: [
      {
        type: 'success',
        content: 'Memory trick: Ask "Wen oder was?" (Whom or what?) to find the accusative object.'
      },
      {
        type: 'info',
        content: 'The preposition "für" (for) is very common and always takes accusative.'
      },
      {
        type: 'warning',
        content: 'Two-way prepositions (Wechselpräpositionen) can take either accusative or dative depending on movement.'
      }
    ],
    
    examples: [
      {
        german: 'Ich habe einen Hund.',
        english: 'I have a dog.',
        explanation: '"Hund" is the direct object, masculine accusative: einen'
      },
      {
        german: 'Sie kauft das Buch.',
        english: 'She buys the book.',
        explanation: '"Buch" is neuter, accusative stays "das"'
      },
      {
        german: 'Wir sehen die Frau.',
        english: 'We see the woman.',
        explanation: '"Frau" is feminine, accusative stays "die"'
      },
      {
        german: 'Er sucht den Schlüssel.',
        english: 'He is looking for the key.',
        explanation: '"Schlüssel" is masculine direct object: den'
      }
    ],
    
    exercises: [
      {
        id: 'akk-1',
        type: 'multiple-choice',
        question: 'Ich sehe ___ Mann. (the man)',
        options: ['der', 'die', 'das', 'den'],
        correctAnswer: 'den',
        hint: 'Mann is masculine and is the direct object',
        explanation: 'Masculine direct objects change from "der" to "den" in accusative.'
      },
      {
        id: 'akk-2',
        type: 'fill-blank',
        question: 'Sie hat ___ Katze. (a cat)',
        correctAnswer: 'eine',
        hint: 'Katze is feminine',
        explanation: 'Feminine articles do not change in accusative. "Eine Katze" stays "eine Katze".'
      },
      {
        id: 'akk-3',
        type: 'multiple-choice',
        question: 'Wir kaufen ___ Auto. (the car)',
        options: ['der', 'die', 'das', 'den'],
        correctAnswer: 'das',
        hint: 'Auto is neuter',
        explanation: 'Neuter articles do not change in accusative. "Das Auto" stays "das Auto".'
      },
      {
        id: 'akk-4',
        type: 'fill-blank',
        question: 'Das Geschenk ist für ___ Mutter. (the mother)',
        correctAnswer: 'die',
        hint: 'Mutter is feminine, and "für" requires accusative',
        explanation: 'Feminine articles stay the same in accusative: die Mutter'
      }
    ]
  },
  {
    id: 'modal-verbs',
    slug: 'modalverben-deutsch',
    title: 'Modalverben (Modal Verbs)',
    level: 'A2',
    category: 'Verbs',
    shortDescription: 'Learn about German modal verbs and how to use them.',
    seoTitle: 'German Modal Verbs Complete Guide | Können, Müssen, Wollen',
    seoDescription: 'Master all six German modal verbs with conjugation tables, usage rules, and examples. Learn können, müssen, dürfen, wollen, sollen, mögen.',
    keywords: ['modal verbs', 'können müssen wollen', 'german modals', 'A2 grammar', 'verb conjugation'],
    views: 720,
    order: 4,
    
    introduction: 'Modal verbs are special auxiliary verbs that express ability, permission, obligation, or desire. They modify the meaning of another verb.',
    
    definition: 'Modal verbs (Modalverben) are used with a main verb in the infinitive to express modality—how an action relates to reality, necessity, or possibility.',
    
    rules: [
      {
        title: 'Sentence Structure',
        description: 'The modal verb is conjugated and placed in position 2. The main verb goes to the end in infinitive form.',
        formula: 'Subject + Modal Verb + ... + Main Verb (Infinitive)'
      },
      {
        title: 'Stem Changes',
        description: 'Most modal verbs change their stem in singular forms (ich, du, er/sie/es).',
        example: 'können → ich kann | müssen → ich muss | wollen → ich will'
      },
      {
        title: 'No -t in Third Person',
        description: 'Unlike regular verbs, modal verbs don\'t add -t in the third person singular if they already have a stem change.',
        example: 'er kann (not er kannt) | sie muss (not sie musst)'
      }
    ],
    
    tables: [
      {
        caption: 'The Six Modal Verbs Conjugation',
        headers: ['Person', 'können', 'müssen', 'dürfen', 'wollen', 'sollen', 'mögen'],
        rows: [
          ['ich', 'kann', 'muss', 'darf', 'will', 'soll', 'mag'],
          ['du', 'kannst', 'musst', 'darfst', 'willst', 'sollst', 'magst'],
          ['er/sie/es', 'kann', 'muss', 'darf', 'will', 'soll', 'mag'],
          ['wir', 'können', 'müssen', 'dürfen', 'wollen', 'sollen', 'mögen'],
          ['ihr', 'könnt', 'müsst', 'dürft', 'wollt', 'sollt', 'mögt'],
          ['sie/Sie', 'können', 'müssen', 'dürfen', 'wollen', 'sollen', 'mögen']
        ]
      },
      {
        caption: 'Modal Verb Meanings',
        headers: ['Verb', 'Meaning', 'Example'],
        rows: [
          ['können', 'can, to be able to', 'Ich kann schwimmen.'],
          ['müssen', 'must, have to', 'Ich muss arbeiten.'],
          ['dürfen', 'may, to be allowed to', 'Darf ich hier rauchen?'],
          ['wollen', 'want to', 'Wir wollen gehen.'],
          ['sollen', 'should, ought to', 'Du sollst lernen.'],
          ['mögen', 'to like', 'Ich mag Pizza.']
        ]
      }
    ],
    
    tips: [
      {
        type: 'info',
        content: '"Möchten" (would like) is technically the subjunctive form of "mögen" but is often taught as a separate modal.'
      },
      {
        type: 'success',
        content: 'In spoken German, the main verb is sometimes omitted if clear from context: "Kannst du Englisch?" instead of "Kannst du Englisch sprechen?"'
      },
      {
        type: 'warning',
        content: 'Don\'t confuse "wollen" (want) with "werden" (will/become)—they look similar but have different meanings!'
      }
    ],
    
    examples: [
      {
        german: 'Ich kann schwimmen.',
        english: 'I can swim.',
        explanation: 'können expresses ability'
      },
      {
        german: 'Du musst lernen.',
        english: 'You must study.',
        explanation: 'müssen expresses obligation'
      },
      {
        german: 'Wir wollen nach Hause gehen.',
        english: 'We want to go home.',
        explanation: 'wollen expresses desire, main verb "gehen" at the end'
      },
      {
        german: 'Sie möchte Kaffee trinken.',
        english: 'She would like to drink coffee.',
        explanation: 'möchten (from mögen) expresses polite desire'
      }
    ],
    
    exercises: [
      {
        id: 'modal-1',
        type: 'fill-blank',
        question: 'Ich ___ Deutsch sprechen. (können)',
        correctAnswer: 'kann',
        hint: 'First person singular of können is irregular',
        explanation: 'können becomes "kann" in first person singular.'
      },
      {
        id: 'modal-2',
        type: 'multiple-choice',
        question: 'Du ___ jetzt schlafen. (müssen)',
        options: ['müsse', 'musst', 'muss', 'müsst'],
        correctAnswer: 'musst',
        hint: 'Second person singular of müssen',
        explanation: 'müssen conjugates to "musst" for "du".'
      },
      {
        id: 'modal-3',
        type: 'fill-blank',
        question: 'Wir ___ ins Kino gehen. (wollen)',
        correctAnswer: 'wollen',
        hint: 'First person plural keeps the infinitive form',
        explanation: 'For "wir", modal verbs keep the infinitive form: wollen'
      },
      {
        id: 'modal-4',
        type: 'multiple-choice',
        question: '___ Sie mir helfen? (können - formal)',
        options: ['Kann', 'Kannst', 'Können', 'Könnt'],
        correctAnswer: 'Können',
        hint: 'Formal "Sie" uses third person plural form',
        explanation: 'The formal "Sie" always takes the third person plural form: Können'
      }
    ]
  },
  {
    id: 'dative-case',
    slug: 'dativ-faelle',
    title: 'Dativ (Dative Case)',
    level: 'A2',
    category: 'Cases',
    shortDescription: 'Understanding the dative case and indirect objects.',
    seoTitle: 'German Dative Case Complete Guide | Dativ Grammar Rules',
    seoDescription: 'Learn the German dative case with comprehensive explanations, article tables, dative prepositions, and practice exercises.',
    keywords: ['dativ', 'dative case', 'indirect object', 'german grammar', 'dem der den'],
    views: 650,
    order: 5,
    
    introduction: 'The dative case marks the indirect object—the recipient or beneficiary of an action. It\'s essential for expressing who receives something.',
    
    definition: 'The dative case indicates the indirect object, typically answering the questions "Wem?" (to whom?) or "Wo?" (where? - with certain prepositions).',
    
    rules: [
      {
        title: 'All Genders Change',
        description: 'Unlike accusative, ALL genders change their articles in dative.',
        formula: 'der → dem | die → der | das → dem | die → den (+n to noun)'
      },
      {
        title: 'Dative Prepositions',
        description: 'These prepositions always require dative:',
        example: 'aus, außer, bei, mit, nach, seit, von, zu, gegenüber'
      },
      {
        title: 'Dative Verbs',
        description: 'Some verbs always take a dative object:',
        example: 'geben, helfen, danken, gehören, gefallen, antworten, folgen'
      }
    ],
    
    tables: [
      {
        caption: 'Definite Articles in Dative Case',
        headers: ['Gender', 'Nominative', 'Dative', 'Example'],
        rows: [
          ['Masculine', 'der', 'dem', 'dem Mann'],
          ['Feminine', 'die', 'der', 'der Frau'],
          ['Neuter', 'das', 'dem', 'dem Kind'],
          ['Plural', 'die', 'den', 'den Kindern (+n)']
        ]
      },
      {
        caption: 'Indefinite Articles & Possessives in Dative',
        headers: ['Gender', 'Indefinite', 'Possessive (mein)'],
        rows: [
          ['Masculine', 'einem', 'meinem'],
          ['Feminine', 'einer', 'meiner'],
          ['Neuter', 'einem', 'meinem'],
          ['Plural', '-', 'meinen']
        ]
      }
    ],
    
    tips: [
      {
        type: 'success',
        content: 'Memory aid: Think of dative as the "giving" case. You give TO someone (dem Mann, der Frau).'
      },
      {
        type: 'info',
        content: 'Plural nouns in dative get an extra -n at the end if they don\'t already end in -n or -s.'
      },
      {
        type: 'warning',
        content: 'Contractions: zu + dem = zum | zu + der = zur | bei + dem = beim'
      }
    ],
    
    examples: [
      {
        german: 'Ich gebe dem Kind ein Spielzeug.',
        english: 'I give the child a toy.',
        explanation: '"Kind" is indirect object, neuter dative: dem'
      },
      {
        german: 'Sie hilft der Frau.',
        english: 'She helps the woman.',
        explanation: '"Frau" is indirect object, feminine dative: der'
      },
      {
        german: 'Wir fahren mit dem Zug.',
        english: 'We travel by train.',
        explanation: '"mit" always requires dative: dem Zug'
      },
      {
        german: 'Das Buch gehört den Kindern.',
        english: 'The book belongs to the children.',
        explanation: 'Plural dative adds -n: den Kindern'
      }
    ],
    
    exercises: [
      {
        id: 'dat-1',
        type: 'multiple-choice',
        question: 'Ich helfe ___ Mann. (the man)',
        options: ['der', 'die', 'das', 'dem'],
        correctAnswer: 'dem',
        hint: 'Mann is masculine and "helfen" requires dative',
        explanation: 'Masculine dative changes from "der" to "dem".'
      },
      {
        id: 'dat-2',
        type: 'fill-blank',
        question: 'Sie spricht mit ___ Lehrerin. (the teacher)',
        correctAnswer: 'der',
        hint: 'Lehrerin is feminine, "mit" requires dative',
        explanation: 'Feminine dative changes from "die" to "der".'
      },
      {
        id: 'dat-3',
        type: 'multiple-choice',
        question: 'Wir gehen zu ___ Bank. (the bank)',
        options: ['der', 'die', 'das', 'dem'],
        correctAnswer: 'der',
        hint: 'Bank is feminine, "zu" requires dative',
        explanation: 'Feminine dative: der Bank. (zu + der = zur)'
      },
      {
        id: 'dat-4',
        type: 'fill-blank',
        question: 'Ich danke ___ Eltern. (the parents)',
        correctAnswer: 'den',
        hint: 'Eltern is plural',
        explanation: 'Plural dative changes from "die" to "den" and adds -n to the noun if possible.'
      }
    ]
  }
];
