import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/grammar',
    name: 'Grammar',
    component: () => import('../views/GrammarView.vue')
  },
  {
    path: '/grammar/:topicId',
    name: 'GrammarTopic',
    component: () => import('../views/TopicView.vue'),
    props: true
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/ExercisesView.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('../views/ProgressView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
