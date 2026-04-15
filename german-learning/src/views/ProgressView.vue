<template>
  <div class="progress-view">
    <div class="page-header">
      <h1>Your Progress</h1>
      <p>Track your learning journey</p>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <span class="stat-icon">📊</span>
        <div class="stat-content">
          <span class="stat-value">{{ totalScore }}</span>
          <span class="stat-label">Total Score</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">✅</span>
        <div class="stat-content">
          <span class="stat-value">{{ completedExercises }}/{{ totalExercises }}</span>
          <span class="stat-label">Exercises Completed</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">📚</span>
        <div class="stat-content">
          <span class="stat-value">{{ completedTopics }}/{{ totalTopics }}</span>
          <span class="stat-label">Topics Started</span>
        </div>
      </div>
    </div>

    <div class="progress-by-topic">
      <h2>Progress by Topic</h2>
      <div class="topic-progress-list">
        <div v-for="topic in grammarStore.topics" :key="topic.id" class="topic-progress-item">
          <div class="topic-info">
            <h3>{{ topic.title }}</h3>
            <span class="level-badge">{{ topic.level }}</span>
          </div>
          <div class="progress-details">
            <div class="progress-stats">
              <span>{{ getCompletedCount(topic.id) }}/{{ topic.exercises.length }} exercises</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${getProgressPercentage(topic.id)}%` }"
                :class="getProgressClass(getProgressPercentage(topic.id))"
              ></div>
            </div>
            <router-link :to="`/grammar/${topic.id}`" class="continue-btn">
              {{ getCompletedCount(topic.id) > 0 ? 'Continue' : 'Start' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="reset-section">
      <button @click="confirmReset = true" class="reset-btn">
        🗑️ Reset All Progress
      </button>
      
      <div v-if="confirmReset" class="confirm-modal">
        <div class="modal-content">
          <h3>Reset Progress?</h3>
          <p>This action cannot be undone. All your progress will be lost.</p>
          <div class="modal-actions">
            <button @click="confirmReset = false" class="cancel-btn">Cancel</button>
            <button @click="resetAllProgress" class="confirm-reset-btn">Reset Progress</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrammarStore } from '../stores/grammar';

const grammarStore = useGrammarStore();
const confirmReset = ref(false);

const totalScore = computed(() => grammarStore.getTotalScore);

const totalExercises = computed(() => {
  return grammarStore.topics.reduce((sum, topic) => sum + topic.exercises.length, 0);
});

const completedExercises = computed(() => {
  let count = 0;
  grammarStore.topics.forEach(topic => {
    const progress = grammarStore.getUserProgressForTopic(topic.id);
    if (progress) {
      count += progress.completedExercises.length;
    }
  });
  return count;
});

const totalTopics = computed(() => grammarStore.topics.length);

const completedTopics = computed(() => {
  let count = 0;
  grammarStore.topics.forEach(topic => {
    const progress = grammarStore.getUserProgressForTopic(topic.id);
    if (progress && progress.completedExercises.length > 0) {
      count++;
    }
  });
  return count;
});

function getCompletedCount(topicId: string): number {
  const progress = grammarStore.getUserProgressForTopic(topicId);
  return progress?.completedExercises.length ?? 0;
}

function getProgressPercentage(topicId: string): number {
  const topic = grammarStore.getTopicById(topicId);
  if (!topic) return 0;
  const completed = getCompletedCount(topicId);
  return Math.round((completed / topic.exercises.length) * 100);
}

function getProgressClass(percentage: number): string {
  if (percentage === 100) return 'complete';
  if (percentage >= 50) return 'halfway';
  return 'started';
}

function resetAllProgress() {
  grammarStore.resetProgress();
  confirmReset.value = false;
}
</script>

<style scoped>
.progress-view {
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

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-by-topic {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.progress-by-topic h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.topic-progress-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.topic-progress-item {
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.topic-progress-item:hover {
  border-color: #4a90a4;
  background: #f8fafc;
}

.topic-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.topic-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  flex: 1;
}

.level-badge {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.progress-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-stats span {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-bar {
  height: 10px;
  background: #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease;
}

.progress-fill.started {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.progress-fill.halfway {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

.progress-fill.complete {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.continue-btn {
  display: inline-block;
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 144, 164, 0.3);
}

.reset-section {
  position: relative;
}

.reset-btn {
  background: #fee2e2;
  color: #dc2626;
  border: 2px solid #fecaca;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.reset-btn:hover {
  background: #fecaca;
  border-color: #fca5a5;
}

.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cancel-btn {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.confirm-reset-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-reset-btn:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.75rem;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .topic-progress-item {
    padding: 1rem;
  }

  .topic-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
