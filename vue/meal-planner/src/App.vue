<script setup>

import { RouterView } from 'vue-router'
import { useMealsStore } from '@/stores/meals'

const store = useMealsStore()

// datos de prueba
store.addMeal({ name: 'Lentejas', day: 'Lunes', mealTime: 'Comida' })
store.addMeal({ name: 'Tortilla', day: 'Lunes', mealTime: 'Cena' })
store.addMeal({ name: 'Pollo al horno', day: 'Miércoles', mealTime: 'Comida' })

</script>



<template>

<h1 class="text-2xl font-bold">Prueba del store</h1>
  <!-- <pre> respeta saltos de línea y espacios.
       JSON.stringify con el 2 final formatea el objeto indentado.
       Es la forma más rápida de inspeccionar un estado mientras desarrollas. -->
  <pre class="text-sm">{{ JSON.stringify(store.mealsByDay, null, 2) }}</pre>
  <RouterView />

</template>

<style scoped></style>
