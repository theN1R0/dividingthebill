import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuItems: []
  }),
  actions: {
    addNewItem(item) {
      this.menuItems.push(item)
    },
    removeItem(index) {
      this.menuItems.splice(index, 1)
    },
    setMenuItems(items) {
      this.menuItems = items || []
    }
  }
})
