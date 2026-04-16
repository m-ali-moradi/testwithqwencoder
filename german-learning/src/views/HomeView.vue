<template>
  <div class="home-view">
    <section class="hero-section">
      <h1 class="hero-title">Learn German Online</h1>
      <p class="hero-subtitle">Master German grammar with detailed explanations and interactive exercises</p>
      <router-link to="/grammar" class="cta-button">Start Learning →</router-link>
    </section>

    <section class="features-section">
      <div class="feature-card">
        <span class="feature-icon">📚</span>
        <h3>Detailed Grammar</h3>
        <p>Comprehensive explanations of German grammar rules with examples</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">✏️</span>
        <h3>Interactive Exercises</h3>
        <p>Practice what you learn with various exercise types</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">📊</span>
        <h3>Track Progress</h3>
        <p>Monitor your learning journey and see your improvement</p>
      </div>
    </section>

    <section class="levels-section">
      <h2 class="section-title">Choose Your Level</h2>
      <div class="levels-grid">
        <div v-for="level in levels" :key="level" class="level-card" :class="`level-${level.toLowerCase()}`">
          <h3>{{ level }}</h3>
          <p>{{ getLevelDescription(level) }}</p>
          <span class="topic-count">{{ getTopicCount(level) }} topics</span>
        </div>
      </div>
    </section>

    <section class="topics-preview">
      <h2 class="section-title">Featured Topics</h2>
      <div class="topics-grid">
        <GrammarTopicCard 
          v-for="topic in featuredTopics" 
          :key="topic.id" 
          :topic="topic" 
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGrammarStore } from '../stores/grammar';
import GrammarTopicCard from '../components/grammar/GrammarTopicCard.vue';

const grammarStore = useGrammarStore();

const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

const featuredTopics = computed(() => {
  return grammarStore.topics.slice(0, 4);
});

function getLevelDescription(level: string): string {
  const descriptions: Record<string, string> = {
    A1: 'Beginner - Basic phrases and expressions',
    A2: 'Elementary - Simple communication',
    B1: 'Intermediate - Everyday situations',
    B2: 'Upper Intermediate - Complex texts',
    C1: 'Advanced - Fluent expression'
  };
  return descriptions[level] || '';
}

function getTopicCount(level: string): number {
  return grammarStore.getTopicsByLevel(level).length;
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4ade80 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: linear-gradient(135deg, #4ade80 0%, #3b82f6 100%);
}

.cta-button.secondary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(74, 222, 128, 0.3);
}

.cta-button.secondary:hover {
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}

.levels-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 2rem;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.level-card {
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.level-card:hover {
  transform: scale(1.05);
}

.level-card.level-a1 {
  border-color: #22c55e;
  background: #f0fdf4;
}

.level-card.level-a2 {
  border-color: #3b82f6;
  background: #eff6ff;
}

.level-card.level-b1 {
  border-color: #f59e0b;
  background: #fffbeb;
}

.level-card.level-b2 {
  border-color: #ea580c;
  background: #fff7ed;
}

.level-card.level-c1 {
  border-color: #dc2626;
  background: #fef2f2;
}

.level-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.level-card.level-a1 h3 { color: #166534; }
.level-card.level-a2 h3 { color: #1d4ed8; }
.level-card.level-b1 h3 { color: #92400e; }
.level-card.level-b2 h3 { color: #9a3412; }
.level-card.level-c1 h3 { color: #991b1b; }

.level-card p {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.topic-count {
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
}

.trending-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.trending-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.view-all-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  color: #5568d3;
  transform: translateX(4px);
}

.topics-preview {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.topics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
