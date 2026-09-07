<script setup>

import { useMealsStore } from '@/stores/meals'
import { DAYS } from '@/stores/meals'
import DayCard from '@/components/DayCard.vue'

const store = useMealsStore()

// --- DATOS DE PRUEBA ---------------
// El if es importante: al navegar a favoritos y volver, esta vista se
// desmonta y se vuelve a montar, así que este código se ejecutaría otra vez
// y verías los platos duplicados. Comprobando que el plan está vacío
// solo siembra la primera vez.
if (store.totalMeals === 0) {
  store.addMeal({ name: 'Lentejas', day: 'Lunes', mealTime: 'Comida' })
  store.addMeal({ name: 'Tortilla', day: 'Lunes', mealTime: 'Cena' })
  store.addMeal({ name: 'Pollo al horno', day: 'Miércoles', mealTime: 'Comida' })
}


</script>

<template>
  <section>
    <h2 class="mb-4 text-lg font-semibold text-slate-700">Plan semanal</h2>

  
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <!-- Recorremos la constante DAYS, no las claves del objeto.
           Así el orden de la semana está garantizado

           :key le da a Vue una identidad estable para cada elemento,
           y así al añadir o quitar cosas reutiliza los nodos correctos
           en lugar de repintar la lista entera. -->
           
      <DayCard
        v-for="day in DAYS"
        :key="day"
        :day="day"
        :meals="store.mealsByDay[day]"
      />
    </div>
  </section>
</template>