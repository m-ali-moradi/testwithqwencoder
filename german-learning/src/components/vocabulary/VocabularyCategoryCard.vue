<template>
  <div class="vocabulary-category-card">
    <router-link :to="`/vocabulary/${category.slug}`" class="card-link">
      <div class="card-header" :class="`bg-${category.color}`">
        <span class="card-icon">{{ category.icon }}</span>
        <span class="level-badge" :class="`level-${category.level.toLowerCase()}`">{{ category.level }}</span>
      </div>
      
      <div class="card-body">
        <h3 class="card-title">{{ category.title }}</h3>
        <p class="card-description">{{ truncateDescription(category.description) }}</p>
        
        <div class="card-meta">
          <span class="meta-item">
            <span class="meta-icon">📚</span>
            {{ category.words.length }} words
          </span>
        </div>
        
        <div class="card-tags">
          <span v-for="keyword in category.keywords?.slice(0, 3)" :key="keyword" class="tag">
            {{ keyword }}
          </span>
        </div>
      </div>
      
      <div class="card-footer">
        <span class="view-btn">View Category →</span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { VocabularyCategory } from '../../types';

defineProps<{
  category: VocabularyCategory;
}>();

function truncateDescription(description: string): string {
  if (description.length > 100) {
    return description.substring(0, 97) + '...';
  }
  return description;
}
</script>

<style scoped>
.vocabulary-category-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.vocabulary-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.bg-blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.bg-green { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); }
.bg-orange { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
.bg-purple { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }
.bg-red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.bg-teal { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); }

.card-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.level-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
}

.meta-icon {
  font-size: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.card-footer {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.view-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: #667eea;
}

@media (max-width: 768px) {
  .card-header {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
</style>
