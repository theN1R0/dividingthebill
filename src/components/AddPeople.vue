<template>
  <div class="add-people">
    <v-btn class="add-button" @click="addNewPerson">
      ✙ Добавить человека
    </v-btn>

    <div class="people-list">
      <div v-if="peopleStore.people.length === 0" class="empty-state">
        <h4>Список людей пуст</h4>
        <p>Вы можете добавить людей по кнопке выше</p>
      </div>

      <ul>
        <li 
          v-for="(person, index) in peopleStore.people" 
          :key="person.id" 
          class="person-entry"
        >
          <v-avatar class="avatar">
            {{ person.name ? person.name.charAt(0).toUpperCase() : '?' }}
          </v-avatar>

          <input 
            v-model="peopleStore.people[index].name" 
            class="person-input"
            placeholder="Введите имя"
          />

          <v-btn 
            icon 
            class="delete-button" 
            @click="removePerson(person.id)"
          >
            ✖
          </v-btn>
        </li>
      </ul>
    </div>

    <v-btn class="next-button" @click="submitPeople">
      {{ buttonText }}
    </v-btn>
  </div>
</template>


<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePeopleStore } from '@/stores/peopleStore'
import '@/css/style.sass'

export default {
  setup() {
    const peopleStore = usePeopleStore()
    const buttonText = ref('Дальше!')
    const timeoutId = ref(null)
    const router = useRouter()

    const addNewPerson = () => {
      peopleStore.addPerson('')
    }

    const submitPeople = () => {
      if (peopleStore.people.length < 2) {
        showError('Добавьте хотя бы 2 человека!')
        return
      }

      const allNamesFilled = peopleStore.people.every(person => person.name.trim())
      if (!allNamesFilled) {
        showError('У всех должны быть имена!')
        return
      }

      console.log('Список пользователей:', peopleStore.people)
      router.push('/add-menu')
    }

    const removePerson = (id) => {
      peopleStore.removePerson(id)
    }

    const showError = (message) => {
      buttonText.value = message

      if (timeoutId.value) {
        clearTimeout(timeoutId.value)
      }

      timeoutId.value = setTimeout(() => {
        buttonText.value = 'Дальше!'
      }, 5000)
    }

    return { peopleStore, submitPeople, removePerson, addNewPerson, buttonText }
  }
}
</script>
