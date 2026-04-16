import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { vocabularyData } from '../data/vocabularyData';
import type { VocabularyCategory } from '../types';

export const useVocabularyStore = defineStore('vocabulary', () => {
  const categories = ref<VocabularyCategory[]>(vocabularyData);
  const userProgress = ref<Record<string, { learnedWords: string[]; lastPracticed: Date | null }>>({});

  const getAllCategories = computed(() => categories.value);

  const getCategoryBySlug = (slug: string) => {
    return categories.value.find(cat => cat.slug === slug);
  };

  const getFilteredCategories = (level?: string, searchQuery?: string) => {
    let filtered = categories.value;

    if (level) {
      filtered = filtered.filter(cat => cat.level === level);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cat => 
        cat.title.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.keywords?.some(k => k.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const getAllLevels = computed(() => {
    const levels = new Set(categories.value.map(cat => cat.level));
    return Array.from(levels);
  });

  const getTotalWordCount = computed(() => {
    return categories.value.reduce((sum, cat) => sum + cat.words.length, 0);
  });

  // Flashcard progress methods
  const getFlashcardProgressForCategory = (categoryId: string) => {
    return userProgress.value[categoryId] || { learnedWords: [], lastPracticed: null };
  };

  const updateFlashcardProgress = (categoryId: string, wordId: string, known: boolean) => {
    if (!userProgress.value[categoryId]) {
      userProgress.value[categoryId] = { learnedWords: [], lastPracticed: null };
    }
    
    if (known && !userProgress.value[categoryId].learnedWords.includes(wordId)) {
      userProgress.value[categoryId].learnedWords.push(wordId);
    }
    
    userProgress.value[categoryId].lastPracticed = new Date();
  };

  // Exercise completion method
  const recordExerciseCompletion = (categoryId: string, score: number) => {
    if (!userProgress.value[categoryId]) {
      userProgress.value[categoryId] = { learnedWords: [], lastPracticed: null };
    }
    userProgress.value[categoryId].lastPracticed = new Date();
  };

  const markWordAsLearned = (categoryId: string, wordId: string) => {
    if (!userProgress.value[categoryId]) {
      userProgress.value[categoryId] = { learnedWords: [], lastPracticed: null };
    }
    
    if (!userProgress.value[categoryId].learnedWords.includes(wordId)) {
      userProgress.value[categoryId].learnedWords.push(wordId);
    }
    
    userProgress.value[categoryId].lastPracticed = new Date();
  };

  const getLearnedWordsCount = (categoryId: string) => {
    return userProgress.value[categoryId]?.learnedWords.length || 0;
  };

  return {
    categories,
    getAllCategories,
    getCategoryBySlug,
    getFilteredCategories,
    getAllLevels,
    getTotalWordCount,
    userProgress,
    markWordAsLearned,
    getLearnedWordsCount,
    getFlashcardProgressForCategory,
    updateFlashcardProgress,
    recordExerciseCompletion
  };
});
