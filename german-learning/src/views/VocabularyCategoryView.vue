<template>
  <div class="vocabulary-category-view">
    <div v-if="category" class="category-content">
      <!-- Header -->
      <div class="category-header" :class="`bg-${category.color}`">
        <router-link to="/vocabulary" class="back-link">← Back to Vocabulary</router-link>
        <div class="header-content">
          <span class="category-icon">{{ category.icon }}</span>
          <div class="header-text">
            <h1 class="category-title">{{ category.title }}</h1>
            <p class="category-description">{{ category.description }}</p>
            <div class="category-meta">
              <span class="level-badge" :class="`level-${category.level.toLowerCase()}`">{{ category.level }}</span>
              <span class="word-count">{{ category.words.length }} words</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="activeTab = 'list'" :class="['action-btn', { active: activeTab === 'list' }]">
          <span class="btn-icon">📋</span>
          <span>View Word List</span>
        </button>
        <button @click="startFlashcards" :class="['action-btn', { active: activeTab === 'flashcards' }]">
          <span class="btn-icon">🃏</span>
          <span>Start Flashcards</span>
        </button>
        <button @click="startExercises" :class="['action-btn', { active: activeTab === 'exercises' }]">
          <span class="btn-icon">✏️</span>
          <span>Do Exercises</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Word List -->
        <div v-if="activeTab === 'list'" class="word-list-section">
          <h2 class="section-title">All Words ({{ category.words.length }})</h2>
          <div class="word-list">
            <div v-for="(word, index) in category.words" :key="index" class="word-card">
              <div class="word-main">
                <span v-if="word.article" class="article" :class="getArticleClass(word.article)">
                  {{ word.article }}
                </span>
                <span class="german-word">{{ word.german }}</span>
                <span v-if="word.plural" class="plural">(Plural: {{ word.plural }})</span>
              </div>
              <div class="word-translation">{{ word.english }}</div>
              <div v-if="word.example" class="word-example">
                <strong>Example:</strong> {{ word.example }}
              </div>
            </div>
          </div>
        </div>

        <!-- Flashcards -->
        <div v-if="activeTab === 'flashcards'" class="flashcards-section">
          <FlashcardComponent 
            :words="category.words" 
            :categoryId="category.id"
          />
        </div>

        <!-- Exercises -->
        <div v-if="activeTab === 'exercises'" class="exercises-section">
          <VocabularyExerciseComponent 
            :words="category.words" 
            :categoryId="category.id"
          />
        </div>
      </div>
    </div>

    <!-- Loading/Error State -->
    <div v-else class="not-found">
      <span class="not-found-icon">😕</span>
      <h2>Category not found</h2>
      <p>The vocabulary category you're looking for doesn't exist.</p>
      <router-link to="/vocabulary" class="back-btn">Browse All Categories</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVocabularyStore } from '../stores/vocabulary';
import type { VocabularyCategory } from '../types';
import FlashcardComponent from '../components/vocabulary/FlashcardComponent.vue';
import VocabularyExerciseComponent from '../components/vocabulary/VocabularyExerciseComponent.vue';

const route = useRoute();
const vocabularyStore = useVocabularyStore();

const activeTab = ref<'list' | 'flashcards' | 'exercises'>('list');

const category = computed(() => {
  const slug = route.params.categorySlug as string;
  return vocabularyStore.getCategoryBySlug(slug);
});

function getArticleClass(article: string): string {
  if (article === 'der') return 'article-masculine';
  if (article === 'die') return 'article-feminine';
  if (article === 'das') return 'article-neuter';
  return '';
}

function startFlashcards() {
  activeTab.value = 'flashcards';
}

function startExercises() {
  activeTab.value = 'exercises';
}

onMounted(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.vocabulary-category-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-header {
  padding: 2rem;
  border-radius: 16px;
  color: white;
}

.bg-blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.bg-green { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); }
.bg-orange { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
.bg-purple { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }
.bg-red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.bg-teal { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); }

.back-link {
  display: inline-block;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: white;
  transform: translateX(-4px);
}

.header-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.category-icon {
  font-size: 4rem;
  line-height: 1;
}

.header-text {
  flex: 1;
}

.category-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.category-description {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.category-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.level-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
}

.word-count {
  font-size: 0.875rem;
  opacity: 0.9;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
}

.action-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
}

.action-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.btn-icon {
  font-size: 2rem;
}

.tab-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.word-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.word-card {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.word-card:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}

.word-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.article {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.article-masculine {
  background: #dbeafe;
  color: #1d4ed8;
}

.article-feminine {
  background: #fce7f3;
  color: #be185d;
}

.article-neuter {
  background: #fef3c7;
  color: #92400e;
}

.german-word {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
}

.plural {
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
}

.word-translation {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 0.5rem;
}

.word-example {
  font-size: 0.875rem;
  color: #64748b;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.not-found h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.back-btn {
  display: inline-block;
  background: #667eea;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .category-meta {
    justify-content: center;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .category-title {
    font-size: 1.5rem;
  }
}
</style>
