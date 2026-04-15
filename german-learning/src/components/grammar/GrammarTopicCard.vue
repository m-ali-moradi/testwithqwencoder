<template>
  <div class="topic-card" :class="`level-${topic.level.toLowerCase()}`">
    <div class="card-header">
      <span class="level-badge">{{ topic.level }}</span>
      <h3 class="topic-title">{{ topic.title }}</h3>
    </div>
    <p class="topic-description">{{ topic.description }}</p>
    <div class="card-footer">
      <span class="exercise-count">{{ topic.exercises.length }} exercises</span>
      <router-link :to="`/grammar/${topic.id}`" class="start-btn">
        Start Learning →
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GrammarTopic } from '../../types';

defineProps<{
  topic: GrammarTopic;
}>();
</script>

<style scoped>
.topic-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #4a90a4;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.topic-card.level-a1 {
  border-left-color: #4ade80;
}

.topic-card.level-a2 {
  border-left-color: #60a5fa;
}

.topic-card.level-b1 {
  border-left-color: #fbbf24;
}

.topic-card.level-b2 {
  border-left-color: #f97316;
}

.topic-card.level-c1 {
  border-left-color: #ef4444;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.level-badge {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.level-a1 .level-badge {
  background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
}

.level-a2 .level-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
}

.level-b1 .level-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
}

.level-b2 .level-badge {
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
}

.level-c1 .level-badge {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
}

.topic-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  flex: 1;
}

.topic-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exercise-count {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.start-btn {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.start-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 8px rgba(74, 144, 164, 0.3);
}

@media (max-width: 768px) {
  .topic-card {
    padding: 1rem;
  }

  .topic-title {
    font-size: 1rem;
  }
}
</style>
