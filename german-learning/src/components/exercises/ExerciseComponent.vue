<template>
  <div class="exercise-component">
    <div class="question-section">
      <div class="question-header">
        <span class="exercise-type">{{ exercise.type }}</span>
        <span class="question-number">Question {{ questionNumber }}</span>
      </div>
      <h3 class="question-text">{{ exercise.question }}</h3>
      
      <button v-if="exercise.hint" @click="showHint = !showHint" class="hint-btn">
        💡 Show Hint
      </button>
      <p v-if="showHint && exercise.hint" class="hint-text">{{ exercise.hint }}</p>
    </div>

    <!-- Multiple Choice -->
    <div v-if="exercise.type === 'multiple-choice'" class="options-container">
      <button
        v-for="(option, index) in exercise.options"
        :key="index"
        @click="selectAnswer(option)"
        :class="['option-btn', getOptionClass(option)]"
        :disabled="answered"
      >
        {{ option }}
      </button>
    </div>

    <!-- Fill in the Blank -->
    <div v-else-if="exercise.type === 'fill-blank'" class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="submitAnswer"
        type="text"
        placeholder="Type your answer..."
        :disabled="answered"
        :class="['text-input', inputClass]"
      />
      <button @click="submitAnswer" :disabled="answered || !userInput" class="submit-btn">
        Submit
      </button>
    </div>

    <!-- Feedback -->
    <div v-if="answered" :class="['feedback', isCorrect ? 'correct' : 'incorrect']">
      <div class="feedback-icon">{{ isCorrect ? '✅' : '❌' }}</div>
      <div class="feedback-content">
        <p class="feedback-title">{{ isCorrect ? 'Richtig!' : 'Leider falsch' }}</p>
        <p class="feedback-explanation">{{ exercise.explanation }}</p>
        <p v-if="!isCorrect" class="correct-answer">
          <strong>Correct answer:</strong> {{ Array.isArray(exercise.correctAnswer) 
            ? exercise.correctAnswer.join(', ') 
            : exercise.correctAnswer }}
        </p>
      </div>
    </div>

    <button v-if="answered" @click="$emit('next')" class="next-btn">
      Next Question →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Exercise } from '../../types';

const props = defineProps<{
  exercise: Exercise;
  questionNumber: number;
}>();

const emit = defineEmits<{
  next: [];
  answered: [result: { correct: boolean; exerciseId: string }];
}>();

const userInput = ref('');
const selectedOption = ref<string | null>(null);
const showHint = ref(false);
const answered = ref(false);
const isCorrect = ref(false);

const inputClass = computed(() => {
  if (!answered.value) return '';
  return isCorrect.value ? 'correct' : 'incorrect';
});

function selectAnswer(option: string) {
  if (answered.value) return;
  selectedOption.value = option;
  checkAnswer(option);
}

function submitAnswer() {
  if (answered.value || !userInput.value.trim()) return;
  checkAnswer(userInput.value.trim());
}

function checkAnswer(answer: string) {
  answered.value = true;
  
  const correctAnswers = Array.isArray(props.exercise.correctAnswer)
    ? props.exercise.correctAnswer
    : [props.exercise.correctAnswer];
  
  isCorrect.value = correctAnswers.some(
    correct => correct.toLowerCase() === answer.toLowerCase()
  );

  emit('answered', {
    correct: isCorrect.value,
    exerciseId: props.exercise.id
  });
}

function getOptionClass(option: string): string {
  if (!answered.value) return '';
  
  const correctAnswers = Array.isArray(props.exercise.correctAnswer)
    ? props.exercise.correctAnswer
    : [props.exercise.correctAnswer];
  
  if (correctAnswers.includes(option)) {
    return 'correct';
  }
  
  if (option === selectedOption.value && !isCorrect.value) {
    return 'incorrect';
  }
  
  return '';
}
</script>

<style scoped>
.exercise-component {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-section {
  margin-bottom: 2rem;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.exercise-type {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.question-number {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.hint-btn {
  background: transparent;
  border: 1px solid #fbbf24;
  color: #f59e0b;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.hint-btn:hover {
  background: #fef3c7;
}

.hint-text {
  background: #fef3c7;
  border-left: 3px solid #fbbf24;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0 8px 8px 0;
  color: #92400e;
}

.options-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.option-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #475569;
}

.option-btn:hover:not(:disabled) {
  border-color: #4a90a4;
  background: #f0f9ff;
}

.option-btn.correct {
  background: #dcfce7;
  border-color: #22c55e;
  color: #166534;
}

.option-btn.incorrect {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.input-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.text-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.text-input:focus {
  outline: none;
  border-color: #4a90a4;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.1);
}

.text-input.correct {
  border-color: #22c55e;
  background: #dcfce7;
}

.text-input.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
}

.submit-btn {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 144, 164, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.feedback.correct {
  background: #dcfce7;
  border-left: 4px solid #22c55e;
}

.feedback.incorrect {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
}

.feedback-icon {
  font-size: 2rem;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feedback.correct .feedback-title {
  color: #166534;
}

.feedback.incorrect .feedback-title {
  color: #991b1b;
}

.feedback-explanation {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.correct-answer {
  color: #64748b;
  font-size: 0.875rem;
}

.next-btn {
  background: linear-gradient(135deg, #4a90a4 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 144, 164, 0.3);
}

@media (max-width: 768px) {
  .exercise-component {
    padding: 1.5rem;
  }

  .input-container {
    flex-direction: column;
  }

  .options-container {
    grid-template-columns: 1fr;
  }
}
</style>
