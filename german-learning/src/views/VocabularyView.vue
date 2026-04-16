<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVocabularyStore } from '../stores/vocabulary';
import { useRouter } from 'vue-router';

const router = useRouter();
const vocabularyStore = useVocabularyStore();

const searchQuery = ref('');
const selectedLevel = ref<string>('');

const filteredCategories = computed(() => {
  return vocabularyStore.getFilteredCategories(
    selectedLevel.value || undefined,
    searchQuery.value || undefined
  );
});

const levels = vocabularyStore.getAllLevels;

const navigateToCategory = (slug: string) => {
  router.push(`/vocabulary/${slug}`);
};

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    A1: 'bg-green-100 text-green-800',
    A2: 'bg-blue-100 text-blue-800',
    B1: 'bg-yellow-100 text-yellow-800',
    B2: 'bg-orange-100 text-orange-800',
    C1: 'bg-red-100 text-red-800',
    C2: 'bg-purple-100 text-purple-800'
  };
  return colors[level] || 'bg-gray-100 text-gray-800';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">German Vocabulary</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Expand your German vocabulary with curated word lists organized by topic and difficulty level.
          Practice with flashcards and exercises to master new words.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ vocabularyStore.categories.length }}</div>
          <div class="text-gray-600 mt-1">Categories</div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ vocabularyStore.getTotalWordCount }}</div>
          <div class="text-gray-600 mt-1">Total Words</div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ levels.length }}</div>
          <div class="text-gray-600 mt-1">Difficulty Levels</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Categories</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, description, or keywords..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Level Filter -->
          <div class="md:w-48">
            <label for="level" class="block text-sm font-medium text-gray-700 mb-2">Filter by Level</label>
            <select
              id="level"
              v-model="selectedLevel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Levels</option>
              <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          @click="navigateToCategory(category.slug)"
        >
          <!-- Card Header with Icon -->
          <div :class="`bg-${category.color}-100 p-6`">
            <div class="flex items-center justify-between">
              <span class="text-4xl">{{ category.icon }}</span>
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', getLevelColor(category.level)]">
                {{ category.level }}
              </span>
            </div>
          </div>
          
          <!-- Card Body -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {{ category.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ category.description }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ category.words.length }} words</span>
              <span class="text-indigo-600 font-medium group-hover:text-indigo-800">
                View Category →
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCategories.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
