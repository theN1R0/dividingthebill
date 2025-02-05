<template>
	<navbar />
	<div class="app">
	  <router-view />
	</div>
  </template>
  
  <script>
  import AddPeople from '@/components/AddPeople.vue'
  
  export default {
	components: {
	  AddPeople
	}
  }
  </script>
  