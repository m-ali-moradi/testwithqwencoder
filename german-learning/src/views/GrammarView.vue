<template>
  <div class="grammar-view">
    <div class="page-header">
      <h1>German Grammar Topics</h1>
      <p>Choose a topic to start learning</p>
    </div>

    <div class="filter-section">
      <button
        :class="['filter-btn', { active: selectedLevel === 'all' }]"
        @click="selectedLevel = 'all'"
      >
        All Levels
      </button>
      <button
        v-for="level in levels"
        :key="level"
        :class="['filter-btn', 'level-' + level.toLowerCase(), { active: selectedLevel === level }]"
        @click="selectedLevel = level"
      >
        {{ level }}
      </button>
    </div>

    <div class="topics-grid">
      <GrammarTopicCard
        v-for="topic in filteredTopics"
        :key="topic.id"
        :topic="topic"
      />
    </div>

    <div v-if="filteredTopics.length === 0" class="no-topics">
      <p>No topics found for this level.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrammarStore } from '../stores/grammar';
import GrammarTopicCard from '../components/grammar/GrammarTopicCard.vue';

const grammarStore = useGrammarStore();

const selectedLevel = ref<string>('all');
const levels = grammarStore.getAllLevels;

const filteredTopics = computed(() => {
  if (selectedLevel.value === 'all') {
    return grammarStore.topics;
  }
  return grammarStore.getTopicsByLevel(selectedLevel.value);
});
</script>

<style scoped>
.grammar-view {
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
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #475569;
}

.filter-btn:hover {
  border-color: #4a90a4;
  background: #f0f9ff;
}

.filter-btn.active {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  border-color: transparent;
}

.filter-btn.level-a1.active {
  background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
}

.filter-btn.level-a2.active {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
}

.filter-btn.level-b1.active {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
}

.filter-btn.level-b2.active {
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
}

.filter-btn.level-c1.active {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.no-topics {
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

  .filter-section {
    justify-content: flex-start;
    overflow-x: auto;
  }

  .topics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
