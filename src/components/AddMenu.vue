<template>
  <div class="add-menu">
    <button class="add-button" @click="addNewItem">
      ✙ Добавить позицию
    </button>

    <div v-if="menuItems.length === 0" class="empty-state">
      <p>Тут пока пустота...</p>
    </div>

    <div v-else>
      <div v-for="(item, index) in menuItems" :key="item.id" class="menu-item">
        <div class="menu-input-container">
          <input v-model="item.name" placeholder="Название" class="menu-input" />
          <input v-model="item.price" type="number" placeholder="Цена" class="menu-input price-input" />
          <button class="delete-button" @click="removeItem(index)">⛌</button>
        </div>

        <div class="payer-selection">
          <span class="payer-label">Заплатил:</span>
          <select v-model="item.payer" class="payer-dropdown">
            <option value="" disabled>Выберите</option>
            <option v-for="person in peopleStore.people" :key="person.id" :value="person.id">
              {{ person.name }}
            </option>
          </select>
        </div>

        <div class="people-selection">
          <div class="people-list">
            <div
              @click="toggleAllSelection(item)"
              :class="{ selected: item.selectedPeople.length === peopleStore.people.length }"
              class="person-chip all-chip"
            >
              <div class="avatar">♾️</div>
              <span class="person-name">Все</span>
            </div>

            <div
              v-for="person in peopleStore.people"
              :key="person.id"
              @click="togglePersonSelection(item, person)"
              :class="{ selected: item.selectedPeople.includes(person.id) }"
              class="person-chip"
            >
              <div class="avatar">{{ person.name ? person.name.charAt(0).toUpperCase() : '?' }}</div>
              <span class="person-name">{{ person.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="summary">
      <p>Промежуточный итог: <strong>{{ totalAmount }} ₽</strong></p>
      <button class="calculate-button" :disabled="!isReadyToCalculate" @click="goToResult">Посчитать!</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePeopleStore } from '@/stores/peopleStore'
import '@/css/style.sass'

export default {
  setup() {
    const peopleStore = usePeopleStore()
    const menuItems = ref([])
    const router = useRouter()

    const addNewItem = () => {
      menuItems.value.push({
        id: Date.now(),
        name: '',
        price: 0,
        selectedPeople: [],
        payer: ''
      })
    }

    const removeItem = (index) => {
      menuItems.value.splice(index, 1)
    }

    const togglePersonSelection = (item, person) => {
      const index = item.selectedPeople.indexOf(person.id)
      if (index === -1) {
        item.selectedPeople.push(person.id)
      } else {
        item.selectedPeople.splice(index, 1)
      }
    }

    const toggleAllSelection = (item) => {
      if (item.selectedPeople.length === peopleStore.people.length) {
        item.selectedPeople = [] 
      } else {
        item.selectedPeople = peopleStore.people.map(person => person.id)
      }
    }

    const totalAmount = computed(() => {
      return menuItems.value.reduce((sum, item) => sum + Number(item.price), 0)
    })

    const isReadyToCalculate = computed(() => {
      return menuItems.value.length > 0 && menuItems.value.every(item => 
        item.name.trim() !== '' &&
        Number(item.price) > 0 &&
        item.selectedPeople.length > 0 &&
        item.payer !== ''
      )
    })

    const goToResult = () => {
      if (isReadyToCalculate.value) {
        router.push({
          path: '/result',
          query: { menu: JSON.stringify(menuItems.value) }
        });
      }
    };

    return { 
      peopleStore, 
      menuItems, 
      addNewItem, 
      removeItem, 
      togglePersonSelection, 
      toggleAllSelection, 
      totalAmount, 
      isReadyToCalculate, 
      goToResult 
    }
  }
}
</script>
