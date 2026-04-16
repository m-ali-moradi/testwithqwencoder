<template>
  <div class="flashcard-component">
    <div v-if="words.length === 0" class="empty-state">
      <p>No words available in this category.</p>
    </div>

    <div v-else class="flashcard-container">
      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-info">
          <span>Progress: {{ currentIndex + 1 }} / {{ words.length }}</span>
          <span>{{ knownCount }} known • {{ learningCount }} learning</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${((currentIndex + 1) / words.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Flashcard -->
      <div class="flashcard-wrapper">
        <div 
          class="flashcard" 
          :class="{ 'is-flipped': isFlipped }"
          @click="flipCard"
        >
          <div class="flashcard-inner">
            <!-- Front -->
            <div class="flashcard-front">
              <span class="card-label">German</span>
              <div v-if="currentWord.article" class="article-badge" :class="getArticleClass(currentWord.article)">
                {{ currentWord.article }}
              </div>
              <h3 class="card-word">{{ currentWord.german }}</h3>
              <p v-if="currentWord.plural" class="card-plural">Plural: {{ currentWord.plural }}</p>
              <p class="card-hint">Click to reveal translation</p>
            </div>

            <!-- Back -->
            <div class="flashcard-back">
              <span class="card-label">English</span>
              <h3 class="card-word">{{ currentWord.english }}</h3>
              <div v-if="currentWord.example" class="card-example">
                <strong>Example:</strong>
                <p>{{ currentWord.example }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="controls-section">
        <div class="knowledge-buttons">
          <button 
            @click.stop="markAsLearning"
            class="btn btn-learning"
            :disabled="isProcessing"
          >
            <span>📚</span> Still Learning
          </button>
          <button 
            @click.stop="markAsKnown"
            class="btn btn-known"
            :disabled="isProcessing"
          >
            <span>✅</span> I Know This
          </button>
        </div>

        <div class="navigation-buttons">
          <button 
            @click="previousCard"
            class="btn btn-nav"
            :disabled="currentIndex === 0"
          >
            ← Previous
          </button>
          <button 
            @click="nextCard"
            class="btn btn-nav"
            :disabled="currentIndex === words.length - 1"
          >
            Next →
          </button>
        </div>

        <button @click="shuffleCards" class="btn btn-shuffle">
          🔀 Shuffle Cards
        </button>
      </div>

      <!-- Completion Message -->
      <div v-if="currentIndex === words.length - 1 && allReviewed" class="completion-message">
        <span class="completion-icon">🎉</span>
        <h3>Great job!</h3>
        <p>You've reviewed all {{ words.length }} words in this category.</p>
        <p class="stats">
          Known: <strong>{{ knownCount }}</strong> | 
          Learning: <strong>{{ learningCount }}</strong>
        </p>
        <div class="completion-actions">
          <button @click="restart" class="btn btn-restart">
            🔄 Review Again
          </button>
          <router-link to="/vocabulary" class="btn btn-back">
            Browse Categories
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { VocabularyWord } from '../../types';
import { useVocabularyStore } from '../../stores/vocabulary';

const props = defineProps<{
  words: VocabularyWord[];
  categoryId: string;
}>();

const vocabularyStore = useVocabularyStore();

const currentIndex = ref(0);
const isFlipped = ref(false);
const isProcessing = ref(false);
const shuffledWords = ref<VocabularyWord[]>([...props.words]);
const allReviewed = ref(false);

const currentWord = computed(() => shuffledWords.value[currentIndex.value]);

const flashcardProgress = computed(() => {
  return vocabularyStore.getFlashcardProgressForCategory(props.categoryId);
});

const knownCount = computed(() => {
  return flashcardProgress.value?.known.length || 0;
});

const learningCount = computed(() => {
  return flashcardProgress.value?.learning.length || 0;
});

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

function markAsKnown() {
  if (isProcessing.value) return;
  isProcessing.value = true;
  
  vocabularyStore.updateFlashcardProgress(props.categoryId, currentIndex.value, true);
  
  setTimeout(() => {
    isFlipped.value = false;
    isProcessing.value = false;
    if (currentIndex.value < shuffledWords.value.length - 1) {
      currentIndex.value++;
    } else {
      allReviewed.value = true;
    }
  }, 300);
}

function markAsLearning() {
  if (isProcessing.value) return;
  isProcessing.value = true;
  
  vocabularyStore.updateFlashcardProgress(props.categoryId, currentIndex.value, false);
  
  setTimeout(() => {
    isFlipped.value = false;
    isProcessing.value = false;
    if (currentIndex.value < shuffledWords.value.length - 1) {
      currentIndex.value++;
    } else {
      allReviewed.value = true;
    }
  }, 300);
}

function nextCard() {
  if (currentIndex.value < shuffledWords.value.length - 1) {
    isFlipped.value = false;
    setTimeout(() => {
      currentIndex.value++;
    }, 200);
  }
}

function previousCard() {
  if (currentIndex.value > 0) {
    isFlipped.value = false;
    setTimeout(() => {
      currentIndex.value--;
    }, 200);
  }
}

function shuffleCards() {
  isFlipped.value = false;
  currentIndex.value = 0;
  allReviewed.value = false;
  
  // Fisher-Yates shuffle
  const shuffled = [...shuffledWords.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  shuffledWords.value = shuffled;
}

function restart() {
  currentIndex.value = 0;
  isFlipped.value = false;
  allReviewed.value = false;
  shuffledWords.value = [...props.words];
}

function getArticleClass(article: string): string {
  if (article === 'der') return 'article-masculine';
  if (article === 'die') return 'article-feminine';
  if (article === 'das') return 'article-neuter';
  return '';
}

// Reset when words prop changes
watch(() => props.words, () => {
  shuffledWords.value = [...props.words];
  currentIndex.value = 0;
  isFlipped.value = false;
  allReviewed.value = false;
}, { immediate: true });
</script>

<style scoped>
.flashcard-component {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.flashcard-wrapper {
  perspective: 1000px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 300px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.flashcard.is-flipped {
  transform: rotateY(180deg);
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.flashcard-front {
  background: white;
  border: 2px solid #e2e8f0;
}

.flashcard-back {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: rotateY(180deg);
}

.card-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  margin-bottom: 1rem;
}

.article-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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

.card-word {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.flashcard-back .card-word {
  color: white;
}

.card-plural {
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
}

.flashcard-back .card-plural {
  color: rgba(255, 255, 255, 0.8);
}

.card-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 1rem;
}

.card-example {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.card-example p {
  margin-top: 0.5rem;
  font-style: italic;
  opacity: 0.9;
}

.controls-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.knowledge-buttons,
.navigation-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-learning {
  background: #fef3c7;
  color: #92400e;
}

.btn-learning:hover:not(:disabled) {
  background: #fde68a;
}

.btn-known {
  background: #dcfce7;
  color: #166534;
}

.btn-known:hover:not(:disabled) {
  background: #bbf7d0;
}

.btn-nav {
  background: #f1f5f9;
  color: #475569;
}

.btn-nav:hover:not(:disabled) {
  background: #e2e8f0;
}

.btn-shuffle {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
}

.btn-shuffle:hover {
  border-color: #667eea;
  color: #667eea;
}

.btn-restart {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.btn-back {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  text-decoration: none;
}

.btn-back:hover {
  border-color: #667eea;
  color: #667eea;
}

.completion-message {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.completion-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.completion-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.completion-message p {
  color: #64748b;
  margin-bottom: 0.5rem;
}

.stats {
  font-size: 1rem;
  margin: 1rem 0;
}

.stats strong {
  color: #667eea;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .flashcard {
    height: 250px;
  }

  .card-word {
    font-size: 1.5rem;
  }

  .knowledge-buttons,
  .navigation-buttons {
    width: 100%;
  }

  .btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
