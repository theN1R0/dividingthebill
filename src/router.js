import { createRouter, createWebHistory } from 'vue-router'
import AddPeople from '@/components/AddPeople.vue'
import AddMenu from '@/components/AddMenu.vue'
import Result from '@/components/Result.vue' 

const routes = [
  { path: '/', component: AddPeople },
  { path: '/add-menu', component: AddMenu },
  { path: '/result', component: Result } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
