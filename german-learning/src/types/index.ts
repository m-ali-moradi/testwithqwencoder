export interface GrammarRule {
  title: string;
  description: string;
  formula?: string; // e.g., "Subject + Verb + Object"
  example?: string;
}

export interface GrammarTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface GrammarTip {
  type: 'warning' | 'info' | 'success';
  content: string;
}

export interface GrammarTopic {
  id: string;
  slug: string; // For SEO-friendly URLs
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'Nouns' | 'Verbs' | 'Cases' | 'Syntax' | 'Adjectives' | 'Pronouns' | 'Tenses';
  shortDescription: string;
  
  // SEO Metadata
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  
  // Rich Content Sections (flexible structure)
  introduction?: string;
  definition?: string;
  rules: GrammarRule[];
  tables?: GrammarTable[];
  tips?: GrammarTip[];
  examples?: Example[];
  
  exercises: Exercise[];
  views?: number; // For trending logic
  order?: number; // For sorting
}

export interface Example {
  german: string;
  english: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  explanation: string;
}

export interface UserProgress {
  topicId: string;
  completedExercises: string[];
  score: number;
  lastAttempt: Date;
}

export interface FilterOptions {
  levels?: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[];
  categories?: string[];
  searchQuery?: string;
}
