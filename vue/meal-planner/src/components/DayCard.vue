<script setup>
import { computed } from 'vue'
import { MEAL_TIMES } from '@/stores/meals'
import MealItem from './MealItem.vue'



const props = defineProps({                                                     // defineProps declara qué datos recibe este componente desde fuera.
  day: {
    type: String,
    required: true,                                                            // vue avisa por consola si falta
  },
  meals: {
    type: Array,                                                               // los valores por defecto de arrays y objetos se tienen que declarar como una FUNCIÓN que los devuelve
    default: () => [],                                                         // si usamos `default: []` directamente todas las instancias del componente compartirían el mismo array y se pisarían
  },
})


const mealsByTime = computed(() =>                                             // recorremos MEAL_TIMES para agrupar los platos de este dia por momentos así los bloques salen siempre en el mismo orden

  MEAL_TIMES.map((time) => ({
    time,
    items: props.meals.filter((meal) => meal.mealTime === time),
  }))
)


const isEmpty = computed(() => props.meals.length === 0)                      // para mostrar un mensaje cuando el día esta vacio
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <h3 class="mb-3 font-semibold text-slate-800">{{ day }}</h3>

                                                                  
    <p v-if="isEmpty" class="text-sm italic text-slate-400">                  <!-- v-if / v-else: si el día no tiene nada, mostramos un aviso -->
      Sin platos planificados
    </p>

    <div v-else class="space-y-3">
      
      <div v-for="group in mealsByTime" :key="group.time">                   <!-- group es cada { time, items } que devuelve el computed -->
        
        <template v-if="group.items.length">                                 <!-- etiqueta fantasma, no genera ningún elemento en el HTML final -->
         
          <p class="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">  <!-- uppercase + tracking-wide: truco tipográfico para que un texto pequeño funcione como etiqueta de sección. -->
            {{ group.time }}
          </p>

          <ul class="space-y-1">
          
            <MealItem
              v-for="meal in group.items"
              :key="meal.id"
              :meal="meal"
            />
          </ul>
        </template>
      </div>
    </div>
  </article>
</template>