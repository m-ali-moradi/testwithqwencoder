<template>
  <div class="vocabulary-exercise-component">
    <div v-if="!started" class="exercise-intro">
      <h3 class="intro-title">Test Your Knowledge</h3>
      <p class="intro-description">
        Practice the {{ words.length }} words from this category with interactive exercises.
      </p>
      <div class="exercise-info">
        <div class="info-item">
          <span class="info-icon">📝</span>
          <span>Multiple choice & fill-in-blank questions</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⭐</span>
          <span>10 points per correct answer</span>
        </div>
        <div class="info-item">
          <span class="info-icon">💡</span>
          <span>Hints available for each question</span>
        </div>
      </div>
      <button @click="startExercise" class="start-btn">Start Exercise →</button>
    </div>

    <div v-else-if="completed" class="exercise-complete">
      <span class="complete-icon">🎉</span>
      <h3>Exercise Complete!</h3>
      <p class="complete-score">Your Score: {{ score }} / {{ totalPossible }}</p>
      <div class="complete-stats">
        <div class="stat-card">
          <span class="stat-value">{{ correctCount }}</span>
          <span class="stat-label">Correct</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ incorrectCount }}</span>
          <span class="stat-label">Incorrect</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ Math.round((correctCount / questions.length) * 100) }}%</span>
          <span class="stat-label">Accuracy</span>
        </div>
      </div>
      <div class="complete-actions">
        <button @click="restart" class="btn btn-restart">Try Again</button>
        <button @click="showAnswers = !showAnswers" class="btn btn-review">
          {{ showAnswers ? 'Hide' : 'Review' }} Answers
        </button>
      </div>

      <!-- Review Section -->
      <div v-if="showAnswers" class="review-section">
        <h4>Review Answers</h4>
        <div v-for="(q, index) in questions" :key="q.id" class="review-item">
          <div :class="['review-question', userAnswers[q.id] === q.correctAnswer ? 'correct' : 'incorrect']">
            <span class="question-number">{{ index + 1 }}</span>
            <p class="question-text">{{ q.question }}</p>
          </div>
          <div class="review-answer">
            <p><strong>Your answer:</strong> 
              <span :class="userAnswers[q.id] === q.correctAnswer ? 'text-correct' : 'text-incorrect'">
                {{ userAnswers[q.id] || 'No answer' }}
              </span>
            </p>
            <p v-if="userAnswers[q.id] !== q.correctAnswer"><strong>Correct answer:</strong> 
              <span class="text-correct">{{ q.correctAnswer }}</span>
            </p>
            <p class="explanation"><strong>Explanation:</strong> {{ q.explanation }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="exercise-questions">
      <!-- Progress -->
      <div class="exercise-progress">
        <div class="progress-header">
          <span>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
          <span>Score: {{ score }}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Question -->
      <div class="question-card">
        <div class="question-type-badge">{{ currentQuestion.type }}</div>
        <h3 class="question-text">{{ currentQuestion.question }}</h3>
        
        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="options-list">
          <button
            v-for="option in currentQuestion.options"
            :key="option"
            @click="selectAnswer(option)"
            :class="['option-btn', { 
              selected: userAnswers[currentQuestion.id] === option,
              disabled: answeredQuestions.has(currentQuestion.id)
            }]"
          >
            {{ option }}
          </button>
        </div>

        <!-- Fill in Blank -->
        <div v-if="currentQuestion.type === 'fill-blank'" class="fill-blank-section">
          <input
            v-model="textInput"
            type="text"
            placeholder="Type your answer here..."
            class="text-input"
            :disabled="answeredQuestions.has(currentQuestion.id)"
            @keyup.enter="submitTextAnswer"
          />
          <button 
            @click="submitTextAnswer"
            :disabled="!textInput.trim() || answeredQuestions.has(currentQuestion.id)"
            class="submit-btn"
          >
            Submit Answer
          </button>
        </div>

        <!-- Hint -->
        <div v-if="currentQuestion.hint && !showHint" class="hint-toggle">
          <button @click="showHint = true" class="hint-btn">💡 Show Hint</button>
        </div>
        <div v-if="showHint && currentQuestion.hint" class="hint-box">
          <strong>Hint:</strong> {{ currentQuestion.hint }}
        </div>
      </div>

      <!-- Feedback & Navigation -->
      <div v-if="answeredQuestions.has(currentQuestion.id)" class="feedback-section">
        <div :class="['feedback-box', isCurrentAnswerCorrect ? 'correct' : 'incorrect']">
          <span class="feedback-icon">{{ isCurrentAnswerCorrect ? '✅' : '❌' }}</span>
          <div class="feedback-content">
            <p class="feedback-title">{{ isCurrentAnswerCorrect ? 'Correct!' : 'Not quite right' }}</p>
            <p v-if="!isCurrentAnswerCorrect" class="feedback-correct">
              <strong>Correct answer:</strong> {{ currentQuestion.correctAnswer }}
            </p>
            <p class="feedback-explanation">{{ currentQuestion.explanation }}</p>
          </div>
        </div>
        
        <div class="navigation-section">
          <button 
            v-if="currentQuestionIndex < questions.length - 1"
            @click="nextQuestion"
            class="btn btn-next"
          >
            Next Question →
          </button>
          <button 
            v-else
            @click="finishExercise"
            class="btn btn-finish"
          >
            See Results 🎉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { VocabularyWord, Exercise } from '../../types';
import { useVocabularyStore } from '../../stores/vocabulary';

const props = defineProps<{
  words: VocabularyWord[];
  categoryId: string;
}>();

const vocabularyStore = useVocabularyStore();

const started = ref(false);
const completed = ref(false);
const questions = ref<Exercise[]>([]);
const currentQuestionIndex = ref(0);
const userAnswers = ref<Record<string, string>>({});
const answeredQuestions = ref<Set<string>>(new Set());
const score = ref(0);
const showHint = ref(false);
const textInput = ref('');
const showAnswers = ref(false);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const totalPossible = computed(() => questions.value.length * 10);

const correctCount = computed(() => {
  return questions.value.filter(q => userAnswers.value[q.id] === q.correctAnswer).length;
});

const incorrectCount = computed(() => {
  return questions.value.length - correctCount.value;
});

const isCurrentAnswerCorrect = computed(() => {
  const answer = userAnswers.value[currentQuestion.value.id];
  return answer === currentQuestion.value.correctAnswer;
});

function generateQuestions(): Exercise[] {
  const generatedQuestions: Exercise[] = [];
  
  // Generate multiple choice questions
  props.words.forEach((word, index) => {
    // German to English
    const wrongAnswers = props.words
      .filter((_, i) => i !== index)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english);
    
    generatedQuestions.push({
      id: `mc-${index}`,
      type: 'multiple-choice',
      question: `What does "${word.german}" mean?`,
      options: [word.english, ...wrongAnswers].sort(() => Math.random() - 0.5),
      correctAnswer: word.english,
      hint: word.article ? `The article is ${word.article}` : undefined,
      explanation: `"${word.german}" translates to "${word.english}"${word.example ? `. Example: ${word.example}` : ''}`
    });

    // English to German (for some words)
    if (index % 2 === 0) {
      const wrongGerman = props.words
        .filter((_, i) => i !== index)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.german);
      
      generatedQuestions.push({
        id: `mc-reverse-${index}`,
        type: 'multiple-choice',
        question: `How do you say "${word.english}" in German?`,
        options: [word.german, ...wrongGerman].sort(() => Math.random() - 0.5),
        correctAnswer: word.german,
        hint: `It starts with "${word.german.charAt(0)}"`,
        explanation: `"${word.english}" in German is "${word.german}"`
      });
    }

    // Fill in blank
    if (index % 3 === 0 && word.example) {
      const blankedExample = word.example.replace(new RegExp(word.german, 'gi'), '___');
      
      generatedQuestions.push({
        id: `fill-${index}`,
        type: 'fill-blank',
        question: `Fill in the blank: ${blankedExample}`,
        correctAnswer: word.german,
        hint: `First letter: ${word.german.charAt(0)}`,
        explanation: `The complete word is "${word.german}"`
      });
    }
  });

  // Shuffle and limit to 10 questions
  return generatedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
}

function startExercise() {
  questions.value = generateQuestions();
  currentQuestionIndex.value = 0;
  userAnswers.value = {};
  answeredQuestions.value = new Set();
  score.value = 0;
  started.value = true;
  completed.value = false;
  showHint.value = false;
  textInput.value = '';
}

function selectAnswer(answer: string) {
  if (answeredQuestions.value.has(currentQuestion.value.id)) return;
  
  userAnswers.value[currentQuestion.value.id] = answer;
  answeredQuestions.value.add(currentQuestion.value.id);
  
  if (answer === currentQuestion.value.correctAnswer) {
    score.value += 10;
  }
  
  vocabularyStore.recordExerciseCompletion(
    props.categoryId,
    currentQuestion.value.id,
    answer === currentQuestion.value.correctAnswer
  );
}

function submitTextAnswer() {
  if (!textInput.value.trim() || answeredQuestions.value.has(currentQuestion.value.id)) return;
  
  const answer = textInput.value.trim();
  selectAnswer(answer);
  textInput.value = '';
}

function nextQuestion() {
  showHint.value = false;
  currentQuestionIndex.value++;
}

function finishExercise() {
  completed.value = true;
}

function restart() {
  startExercise();
}

watch(() => props.words, () => {
  if (started.value && !completed.value) {
    questions.value = generateQuestions();
  }
}, { deep: true });
</script>

<style scoped>
.vocabulary-exercise-component {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.exercise-intro,
.exercise-complete {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.intro-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.intro-description {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.exercise-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #475569;
}

.info-icon {
  font-size: 1.25rem;
}

.start-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.complete-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.exercise-complete h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.complete-score {
  font-size: 1.25rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 2rem;
}

.complete-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.complete-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-restart {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.btn-review {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
}

.btn-review:hover {
  border-color: #667eea;
  color: #667eea;
}

.review-section {
  margin-top: 2rem;
  text-align: left;
}

.review-section h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.review-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.review-question {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.review-question.correct {
  background: #dcfce7;
}

.review-question.incorrect {
  background: #fee2e2;
}

.question-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
}

.question-text {
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.review-answer p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #475569;
}

.text-correct {
  color: #166534;
  font-weight: 600;
}

.text-incorrect {
  color: #991b1b;
  font-weight: 600;
}

.explanation {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
  font-style: italic;
}

/* Exercise Questions */
.exercise-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-header {
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

.question-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.options-list {
  display: grid;
  gap: 0.75rem;
}

.option-btn {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.option-btn:hover:not(.disabled) {
  border-color: #667eea;
  background: #f1f5f9;
}

.option-btn.selected {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.option-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fill-blank-section {
  display: flex;
  gap: 1rem;
}

.text-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  padding: 1rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint-toggle {
  margin-top: 1rem;
}

.hint-btn {
  background: none;
  border: none;
  color: #92400e;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem;
}

.hint-btn:hover {
  text-decoration: underline;
}

.hint-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef3c7;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #92400e;
}

.feedback-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feedback-box {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.feedback-box.correct {
  background: #dcfce7;
  border-left: 4px solid #16a34a;
}

.feedback-box.incorrect {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
}

.feedback-icon {
  font-size: 2rem;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.feedback-correct {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.feedback-explanation {
  font-size: 0.875rem;
  color: #475569;
}

.navigation-section {
  display: flex;
  justify-content: flex-end;
}

.btn-next,
.btn-finish {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
}

.btn-next:hover,
.btn-finish:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .complete-stats {
    grid-template-columns: 1fr;
  }

  .fill-blank-section {
    flex-direction: column;
  }

  .question-text {
    font-size: 1rem;
  }
}
</style>
