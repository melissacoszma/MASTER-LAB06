<script setup>

import { ref } from 'vue'
import { useMealsStore } from '@/stores/meals'
import { DAYS } from '@/stores/meals'
import DayCard from '@/components/DayCard.vue'
import MealForm from '@/components/MealForm.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const store = useMealsStore()

const showConfirm = ref(false)

function confirmClear() {
  store.clearPlan()
  showConfirm.value = false
}

</script>

<template>
  <section>
    <MealForm /> <!-- no necesita props, con pinia habla directamente con el store para añadir el plato y la vista se repinta sola, sin store necesitaríamos eventos y guardar estados para pasarlos -->

    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-slate-700">Plan semanal</h2>

      <!-- :disabled con dos puntos porque el valor es una expresión, deshabilitamos el botón cuando no hay nada que limpiar
           disabled:opacity-50 es una variante de Tailwind que aplica ese estilo solo cuando el elemento está deshabilitado. -->

      <button
        type="button"
        :disabled="store.totalMeals === 0"
        class="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        @click="showConfirm = true"
      >
        Limpiar plan
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">   
      <DayCard
        v-for="day in DAYS"
        :key="day"
        :day="day"
        :meals="store.mealsByDay[day]"
      />
    </div>

    <!-- datos abajo, eventos arriba -->
    <ConfirmDialog
      :open="showConfirm"
      title="¿Limpiar el plan semanal?"
      message="Se eliminarán todos los platos planificados. Tus favoritos no se verán afectados."
      confirm-label="Sí, limpiar"
      @confirm="confirmClear"
      @cancel="showConfirm = false"
     />

  </section>
</template>