<template>
  <div class="result-page">
    <h1 class="title">Результаты</h1>

    <div class="tabs">
      <v-btn 
        class="tab-button" 
        :class="{ active: activeTab === 'who-to-whom' }" 
        @click="activeTab = 'who-to-whom'"
      >
        Кто - кому
      </v-btn>

      <v-btn 
        class="tab-button" 
        :class="{ active: activeTab === 'whom-to-who' }" 
        @click="activeTab = 'whom-to-who'"
      >
        Кому - кто
      </v-btn>
    </div>

    <div class="result-list">
      <div v-if="activeTab === 'who-to-whom'">
        <div v-for="(debts, item) in detailedDebts" :key="item" class="menu-block">
          <h2>За блюдо "{{ item }}"</h2>
          <div v-for="(debtsList, debtor) in debts" :key="debtor" class="debt-block">
            <h3>Пользователь {{ debtor }} должен:</h3>
            <p v-for="debt in debtsList" :key="debt.to">
              {{ debt.to }} - {{ debt.amount }} ₽
            </p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'whom-to-who'">
        <div v-for="(creditors, person) in detailedWhomToWho" :key="person" class="menu-block">
          <h2>Пользователю {{ person }} должны</h2>
          <div v-for="(debtsList, item) in creditors" :key="item" class="debt-block">
            <h3>За блюдо "{{ item }}"</h3>
            <p v-for="debt in debtsList" :key="debt.from">
              {{ debt.from }} - {{ debt.amount }} ₽
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePeopleStore } from '@/stores/peopleStore'
import { useMenuStore } from '@/stores/menuStore'
import '@/css/style.sass'

export default {
  setup() {
    const route = useRoute()
    const activeTab = ref('who-to-whom')
    const peopleStore = usePeopleStore()
    const menuStore = useMenuStore()

    const menuItems = computed(() => menuStore.menuItems)

    const detailedDebts = computed(() => {
      let debtsPerItem = {}

      menuItems.value.forEach(item => {
        if (!item.payer || item.selectedPeople.length === 0) return

        const payer = peopleStore.people.find(p => p.id === item.payer)?.name
        if (!payer) return

        const amountPerPerson = Number(item.price) / item.selectedPeople.length

        item.selectedPeople.forEach(personId => {
          const debtor = peopleStore.people.find(p => p.id === personId)?.name
          if (!debtor || debtor === payer) return

          if (!debtsPerItem[item.name]) {
            debtsPerItem[item.name] = {}
          }

          if (!debtsPerItem[item.name][debtor]) {
            debtsPerItem[item.name][debtor] = []
          }

          debtsPerItem[item.name][debtor].push({ to: payer, amount: amountPerPerson.toFixed(2) })
        })
      })

      return debtsPerItem
    })

    const detailedWhomToWho = computed(() => {
      let result = {}

      Object.entries(detailedDebts.value).forEach(([item, debts]) => {
        Object.entries(debts).forEach(([debtor, payments]) => {
          payments.forEach(({ to, amount }) => {
            if (!result[to]) {
              result[to] = {}
            }
            if (!result[to][item]) {
              result[to][item] = []
            }
            result[to][item].push({ from: debtor, amount })
          })
        })
      })

      return result
    })

    return { activeTab, detailedDebts, detailedWhomToWho }
  }
}
</script>
