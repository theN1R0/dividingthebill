import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('people', {
  state: () => ({
    people: []
  }),
  actions: {
    addPerson(name = '') {
      this.people.push({ id: Date.now(), name })
    },
    removePerson(id) {
      this.people = this.people.filter(person => person.id !== id)
    }
  }
})
