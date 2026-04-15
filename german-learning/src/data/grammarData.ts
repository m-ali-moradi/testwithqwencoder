import type { GrammarTopic } from '../types';

export const grammarData: GrammarTopic[] = [
  {
    id: 'articles-nominative',
    title: 'Artikel im Nominativ (Articles in Nominative)',
    level: 'A1',
    description: 'Learn about German articles (der, die, das) in the nominative case.',
    content: `
## Deutsche Artikel im Nominativ

In German, every noun has a gender: masculine (männlich), feminine (weiblich), or neuter (sächlich).

### Definite Articles (Bestimmte Artikel)
- **der** - masculine (der Mann, der Tisch)
- **die** - feminine (die Frau, die Lampe)
- **das** - neuter (das Kind, das Buch)
- **die** - plural (die Männer, die Frauen, die Kinder)

### Indefinite Articles (Unbestimmte Artikel)
- **ein** - masculine/neuter (ein Mann, ein Kind)
- **eine** - feminine (eine Frau)

### Tips for Remembering Genders
1. Many nouns ending in -ung, -heit, -keit are feminine
2. Many nouns ending in -chen, -lein are neuter
3. Many nouns ending in -er, -en are masculine
`,
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
    title: 'Verbkonjugation (Verb Conjugation)',
    level: 'A1',
    description: 'Learn how to conjugate regular German verbs in present tense.',
    content: `
## Verbkonjugation im Präsens

Regular German verbs follow a predictable pattern when conjugated.

### Steps to Conjugate a Regular Verb
1. Find the infinitive (e.g., **machen**, **lernen**, **spielen**)
2. Remove the **-en** ending to get the stem (mach-, lern-, spiel-)
3. Add the appropriate ending based on the subject

### Endings for Regular Verbs
| Person | Ending | Example: machen |
|--------|--------|-----------------|
| ich | -e | ich mache |
| du | -st | du machst |
| er/sie/es | -t | er macht |
| wir | -en | wir machen |
| ihr | -t | ihr macht |
| sie/Sie | -en | sie machen |

### Important Notes
- Some verbs have stem changes (e.g., sprechen → du sprichst)
- The verb "sein" (to be) is completely irregular
`,
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
    title: 'Akkusativ (Accusative Case)',
    level: 'A1',
    description: 'Understanding the accusative case and when to use it.',
    content: `
## Der Akkusativ

The accusative case is used for the direct object of a sentence (the thing being acted upon).

### Article Changes in Accusative
Only the masculine article changes!

| Gender | Nominative | Accusative |
|--------|------------|------------|
| Masculine | der | den |
| Feminine | die | die |
| Neuter | das | das |
| Plural | die | die |

### When to Use Accusative
1. Direct objects: Ich sehe **den Mann**. (I see the man)
2. After certain prepositions: für, durch, gegen, ohne, um
3. With certain verbs: haben, sehen, kaufen, essen, trinken

### Examples with Prepositions
- für (for): Das Geschenk ist **für den Vater**.
- durch (through): Wir gehen **durch den Park**.
- ohne (without): Ich trinke Kaffee **ohne Zucker**.
`,
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
    title: 'Modalverben (Modal Verbs)',
    level: 'A2',
    description: 'Learn about German modal verbs and how to use them.',
    content: `
## Modalverben

Modal verbs express ability, permission, obligation, or desire. They are used with another verb in the infinitive.

### The Six Modal Verbs
1. **können** - can, to be able to
2. **müssen** - must, have to
3. **dürfen** - may, to be allowed to
4. **wollen** - want to
5. **sollen** - should, ought to
6. **mögen** - to like (möchten = would like)

### Conjugation Pattern
Modal verbs are irregular and change their stem in singular forms.

| Person | können | müssen | wollen |
|--------|--------|--------|--------|
| ich | kann | muss | will |
| du | kannst | musst | willst |
| er/sie/es | kann | muss | will |
| wir | können | müssen | wollen |
| ihr | könnt | müsst | wollt |
| sie/Sie | können | müssen | wollen |

### Sentence Structure
Main clause: Subject + Modal Verb + ... + Infinitive
- Ich **kann** Deutsch **sprechen**.
- Du **musst** heute **arbeiten**.
`,
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
    title: 'Dativ (Dative Case)',
    level: 'A2',
    description: 'Understanding the dative case and indirect objects.',
    content: `
## Der Dativ

The dative case is used for the indirect object (the recipient of an action).

### Article Changes in Dative
All genders change in dative!

| Gender | Nominative | Dative |
|--------|------------|--------|
| Masculine | der | dem |
| Feminine | die | der |
| Neuter | das | dem |
| Plural | die | den (+n to noun if possible) |

### When to Use Dative
1. Indirect objects: Ich gebe **dem Mann** das Buch.
2. After certain prepositions: aus, bei, mit, nach, seit, von, zu, gegenüber
3. With certain verbs: geben, helfen, danken, gehören, gefallen

### Dative Prepositions
- **mit** (with): Ich fahre **mit dem Bus**.
- **von** (from): Das ist ein Geschenk **von meiner Freundin**.
- **zu** (to): Ich gehe **zur Schule**. (zu + der = zur)
- **bei** (at/near): Ich wohne **bei meinen Eltern**.
`,
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
