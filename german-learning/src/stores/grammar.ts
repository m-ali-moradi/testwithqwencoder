import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GrammarTopic, UserProgress } from '../types';
import { grammarData } from '../data/grammarData';

export const useGrammarStore = defineStore('grammar', () => {
  // State
  const topics = ref<GrammarTopic[]>(grammarData);
  const userProgress = ref<Map<string, UserProgress>>(new Map());

  // Getters
  const getTopicById = computed(() => {
    return (id: string) => topics.value.find(topic => topic.id === id);
  });

  const getTopicsByLevel = computed(() => {
    return (level: string) => topics.value.filter(topic => topic.level === level);
  });

  const getAllLevels = computed(() => {
    return [...new Set(topics.value.map(topic => topic.level))].sort();
  });

  const getUserProgressForTopic = computed(() => {
    return (topicId: string) => userProgress.value.get(topicId);
  });

  const getTotalScore = computed(() => {
    let total = 0;
    userProgress.value.forEach(progress => {
      total += progress.score;
    });
    return total;
  });

  // Actions
  function recordExerciseCompletion(
    topicId: string,
    exerciseId: string,
    isCorrect: boolean
  ) {
    const progress = userProgress.value.get(topicId) || {
      topicId,
      completedExercises: [],
      score: 0,
      lastAttempt: new Date()
    };

    if (!progress.completedExercises.includes(exerciseId)) {
      progress.completedExercises.push(exerciseId);
    }

    if (isCorrect) {
      progress.score += 10;
    }

    progress.lastAttempt = new Date();
    userProgress.value.set(topicId, progress);
  }

  function resetProgress(topicId?: string) {
    if (topicId) {
      userProgress.value.delete(topicId);
    } else {
      userProgress.value.clear();
    }
  }

  function getExerciseAttempts(topicId: string, exerciseId: string): number {
    const progress = userProgress.value.get(topicId);
    if (!progress) return 0;
    return progress.completedExercises.includes(exerciseId) ? 1 : 0;
  }

  return {
    // State
    topics,
    userProgress,
    // Getters
    getTopicById,
    getTopicsByLevel,
    getAllLevels,
    getUserProgressForTopic,
    getTotalScore,
    // Actions
    recordExerciseCompletion,
    resetProgress,
    getExerciseAttempts
  };
});
