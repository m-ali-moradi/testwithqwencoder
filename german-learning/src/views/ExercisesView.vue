<template>
  <div class="exercises-view">
    <div class="page-header">
      <h1>All Exercises</h1>
      <p>Practice your German skills with these exercises</p>
    </div>

    <div class="filter-section">
      <select v-model="selectedLevel" class="level-select">
        <option value="all">All Levels</option>
        <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
      </select>
    </div>

    <div class="exercises-list">
      <div v-for="topic in filteredTopics" :key="topic.id" class="topic-exercises">
        <h2 class="topic-title">{{ topic.title }}</h2>
        <span class="level-badge">{{ topic.level }}</span>
        
        <div class="exercise-items">
          <div 
            v-for="exercise in topic.exercises" 
            :key="exercise.id"
            :class="['exercise-item', getExerciseClass(topic.id, exercise.id)]"
          >
            <div class="exercise-info">
              <span class="exercise-type-badge">{{ exercise.type }}</span>
              <p class="exercise-question">{{ exercise.question }}</p>
            </div>
            <div class="exercise-status">
              <span v-if="isExerciseCompleted(topic.id, exercise.id)" class="completed-badge">
                ✅ Completed
              </span>
              <span v-else class="pending-badge">⏳ Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredTopics.length === 0" class="no-exercises">
      <p>No exercises found for this level.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrammarStore } from '../stores/grammar';

const grammarStore = useGrammarStore();

const selectedLevel = ref<string>('all');
const levels = grammarStore.getAllLevels;

const filteredTopics = computed(() => {
  if (selectedLevel.value === 'all') {
    return grammarStore.topics;
  }
  return grammarStore.getTopicsByLevel(selectedLevel.value);
});

function isExerciseCompleted(topicId: string, exerciseId: string): boolean {
  const progress = grammarStore.getUserProgressForTopic(topicId);
  return progress?.completedExercises.includes(exerciseId) ?? false;
}

function getExerciseClass(topicId: string, exerciseId: string): string {
  if (isExerciseCompleted(topicId, exerciseId)) {
    return 'completed';
  }
  return 'pending';
}
</script>

<style scoped>
.exercises-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 1rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #64748b;
  font-size: 1.125rem;
}

.filter-section {
  display: flex;
  justify-content: center;
}

.level-select {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #475569;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.level-select:hover {
  border-color: #4a90a4;
}

.level-select:focus {
  outline: none;
  border-color: #4a90a4;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.1);
}

.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.topic-exercises {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.topic-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  padding-right: 80px;
}

.level-badge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.exercise-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.exercise-item.completed {
  border-color: #22c55e;
  background: #f0fdf4;
}

.exercise-item.pending {
  border-color: #fbbf24;
  background: #fffbeb;
}

.exercise-item:hover {
  transform: translateX(4px);
}

.exercise-info {
  flex: 1;
}

.exercise-type-badge {
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.exercise-question {
  color: #475569;
  font-weight: 500;
  margin: 0;
}

.exercise-status {
  flex-shrink: 0;
  margin-left: 1rem;
}

.completed-badge {
  display: inline-block;
  color: #166534;
  font-weight: 600;
  font-size: 0.875rem;
}

.pending-badge {
  display: inline-block;
  color: #92400e;
  font-weight: 600;
  font-size: 0.875rem;
}

.no-exercises {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #64748b;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.75rem;
  }

  .topic-title {
    font-size: 1.25rem;
    padding-right: 0;
    margin-bottom: 1rem;
  }

  .level-badge {
    position: static;
  }

  .exercise-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .exercise-status {
    margin-left: 0;
  }
}
</style>
