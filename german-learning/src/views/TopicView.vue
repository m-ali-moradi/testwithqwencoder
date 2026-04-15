<template>
  <div class="topic-view" v-if="topic">
    <nav class="breadcrumb">
      <router-link to="/grammar">Grammar</router-link>
      <span>/</span>
      <span>{{ topic.title }}</span>
    </nav>

    <div class="topic-header">
      <span class="level-badge">{{ topic.level }}</span>
      <h1>{{ topic.title }}</h1>
      <p class="topic-description">{{ topic.description }}</p>
    </div>

    <div class="content-tabs">
      <button
        :class="['tab-btn', { active: activeTab === 'learn' }]"
        @click="activeTab = 'learn'"
      >
        📖 Learn
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'examples' }]"
        @click="activeTab = 'examples'"
      >
        💡 Examples
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'exercises' }]"
        @click="activeTab = 'exercises'"
      >
        ✏️ Exercises
      </button>
    </div>

    <!-- Learn Tab -->
    <div v-if="activeTab === 'learn'" class="tab-content">
      <div class="content-card">
        <div class="markdown-content" v-html="renderedContent"></div>
      </div>
    </div>

    <!-- Examples Tab -->
    <div v-if="activeTab === 'examples'" class="tab-content">
      <div class="examples-grid">
        <div v-for="(example, index) in topic.examples" :key="index" class="example-card">
          <div class="example-german">{{ example.german }}</div>
          <div class="example-english">{{ example.english }}</div>
          <div v-if="example.explanation" class="example-explanation">
            💡 {{ example.explanation }}
          </div>
        </div>
      </div>
    </div>

    <!-- Exercises Tab -->
    <div v-if="activeTab === 'exercises'" class="tab-content">
      <div class="exercises-container">
        <div v-if="!exerciseCompleted" class="exercise-progress">
          <span>Exercise {{ currentExerciseIndex + 1 }} of {{ topic.exercises.length }}</span>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${((currentExerciseIndex + 1) / topic.exercises.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <ExerciseComponent
          v-if="!exerciseCompleted && currentExercise"
          :exercise="currentExercise"
          :questionNumber="currentExerciseIndex + 1"
          @answered="handleAnswer"
          @next="nextExercise"
        />

        <div v-if="exerciseCompleted" class="completion-screen">
          <div class="completion-icon">🎉</div>
          <h2>Exercises Completed!</h2>
          <p class="score-display">Score: {{ score }} / {{ topic.exercises.length * 10 }}</p>
          <button @click="restartExercises" class="restart-btn">Try Again</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <h1>Topic Not Found</h1>
    <router-link to="/grammar" class="back-link">← Back to Grammar</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useGrammarStore } from '../stores/grammar';
import ExerciseComponent from '../components/exercises/ExerciseComponent.vue';

const grammarStore = useGrammarStore();

const props = defineProps<{
  topicId: string;
}>();

const topic = computed(() => grammarStore.getTopicById(props.topicId));
const activeTab = ref<'learn' | 'examples' | 'exercises'>('learn');

const currentExerciseIndex = ref(0);
const score = ref(0);
const exerciseCompleted = ref(false);

const currentExercise = computed(() => {
  if (!topic.value) return null;
  return topic.value.exercises[currentExerciseIndex.value];
});

// Simple markdown-like rendering
const renderedContent = computed(() => {
  if (!topic.value) return '';
  let content = topic.value.content;
  
  // Convert headers
  content = content.replace(/## (.*?)(?=\n|$)/g, '<h2>$1</h2>');
  content = content.replace(/### (.*?)(?=\n|$)/g, '<h3>$1</h3>');
  
  // Convert bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert lists
  content = content.replace(/^\- (.*?)(?=\n|$)/gm, '<li>$1</li>');
  content = content.replace(/<li>(.*?)<\/li>/gs, '<ul>$&</ul>');
  
  // Convert tables (simplified)
  content = content.replace(/\|(.+?)\|/g, '<tr>$1</tr>');
  
  // Convert line breaks to paragraphs
  content = content.split('\n\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');
  
  return content;
});

function handleAnswer(result: { correct: boolean; exerciseId: string }) {
  if (result.correct) {
    score.value += 10;
  }
  
  grammarStore.recordExerciseCompletion(
    props.topicId,
    result.exerciseId,
    result.correct
  );
}

function nextExercise() {
  if (currentExerciseIndex.value < topic.value!.exercises.length - 1) {
    currentExerciseIndex.value++;
  } else {
    exerciseCompleted.value = true;
  }
}

function restartExercises() {
  currentExerciseIndex.value = 0;
  score.value = 0;
  exerciseCompleted.value = false;
}

// Reset state when topic changes
watch(() => props.topicId, () => {
  currentExerciseIndex.value = 0;
  score.value = 0;
  exerciseCompleted.value = false;
  activeTab.value = 'learn';
});
</script>

<style scoped>
.topic-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.breadcrumb a {
  color: #4a90a4;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.topic-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.level-badge {
  display: inline-block;
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.topic-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.topic-description {
  color: #64748b;
  font-size: 1.125rem;
}

.content-tabs {
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #64748b;
}

.tab-btn:hover {
  background: #f8fafc;
  color: #1a1a2e;
}

.tab-btn.active {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.markdown-content {
  line-height: 1.8;
  color: #475569;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(strong) {
  color: #1a1a2e;
}

.markdown-content :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.examples-grid {
  display: grid;
  gap: 1.5rem;
}

.example-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #4a90a4;
}

.example-german {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.example-english {
  color: #64748b;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.example-explanation {
  background: #fef3c7;
  padding: 0.75rem;
  border-radius: 8px;
  color: #92400e;
  font-size: 0.875rem;
}

.exercises-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.exercise-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #64748b;
  font-weight: 500;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  transition: width 0.3s ease;
}

.completion-screen {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.completion-screen h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.score-display {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.restart-btn {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(74, 144, 164, 0.3);
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found h1 {
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  color: #4a90a4;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .topic-header {
    padding: 1.5rem;
  }

  .topic-header h1 {
    font-size: 1.5rem;
  }

  .content-tabs {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
  }
}
</style>
