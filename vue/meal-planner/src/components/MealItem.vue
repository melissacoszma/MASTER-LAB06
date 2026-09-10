<script setup>

import { ref, reactive } from 'vue'
import { DAYS, MEAL_TIMES, useMealsStore } from '@/stores/meals'


const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
})

const store = useMealsStore()

const isEditing = ref(false) // estado local de componente estado de interfaz, no va al store 

const draft = reactive({    // lo llamamos al editar, inicia vacio
  name: '',
  day: '',
  mealTime: '',
})

function startEdit() {
                                 // dentro del <script> se accede a las props con props.x solo en <template> podemos escribir meal a secas
  draft.name = props.meal.name
  draft.day = props.meal.day
  draft.mealTime = props.meal.mealTime
  isEditing.value = true
}

function saveEdit() {
  if (!draft.name.trim()) return  // no dejamos guardar sin nombre

  store.updateMeal(props.meal.id, { ...draft })
  isEditing.value = false
}

function cancelEdit() {

  // no hace falta limpiar el borrador: startEdit lo sobrescribe entero

  isEditing.value = false
}

</script>

<template>

 <li class="rounded bg-slate-50 px-2 py-1 text-sm">

 <!--  MODO EDICIÓN  -->
   
    <div v-if="isEditing" class="flex flex-col gap-2"> 

      <!-- @keyup.enter y @keyup.esc son el equivalente a event.key === 'Key' -->
      <input
        v-model="draft.name"
        type="text"
        class="w-full rounded border border-slate-300 px-2 py-1"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />

      <div class="flex gap-2">
        <!-- para poder cambiar el nombre O EL DÍA, el select va aquí dentro -->
        <select
          v-model="draft.day"
          class="flex-1 rounded border border-slate-300 px-2 py-1"
        >
          <option v-for="day in DAYS" :key="day" :value="day">{{ day }}</option>
        </select>

        <!-- ya que estamos permitimos mover de comida a cena para no tener que borrar y volver a crear  -->
        <select
          v-model="draft.mealTime"
          class="rounded border border-slate-300 px-2 py-1"
        >
          <option v-for="time in MEAL_TIMES" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>

      <div class="flex gap-2">

         <!-- vamos a confirmar el type="button" en todos los botones para evitar posibles errores  -->

        <button
          type="button" 
          class="rounded bg-slate-800 px-2 py-1 text-xs text-white hover:bg-slate-700"
          @click="saveEdit"
        >
          Guardar
        </button>
        <button
          type="button"
          class="rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
          @click="cancelEdit"
        >
          Cancelar
        </button>
      </div>
    </div>

 <!--  MODO NORMAL  -->
    <div v-else class="flex items-center justify-between gap-2">
      
      <span class="min-w-0 flex-1 truncate text-slate-700">{{ meal.name }}</span>  <!-- truncate corta con puntos suspensivos si el nombre es largo - min-w-0 es imprescindible para que truncate funcione dentro de un flex: sin él, el elemento se niega a encogerse -->


      <div class="flex shrink-0 gap-1">       <!-- shrink-0 impide que los botones se compriman cuando el nombre del plato es largo -->

        <!-- FAVORITO -->
  
        <button
          type="button"
          class="rounded px-1 hover:bg-slate-200"
          :title="store.isFavorite(meal.name) ? 'Quitar de favoritos' : 'Marcar como favorito'"
          @click="store.toggleFavorite(meal.name)"
        >
          {{ store.isFavorite(meal.name) ? '⭐' : '☆' }}
        </button>

        <!-- EDITAR -->
        <button
          type="button"
          class="rounded px-1 hover:bg-slate-200"
          title="Editar"
          @click="startEdit"
        >
          ✏️
        </button>

        <!-- ELIMINAR -->
        
        <button
          type="button"
          class="rounded px-1 hover:bg-slate-200"
          title="Eliminar"
          @click="store.removeMeal(meal.id)"
        >
          🗑️
        </button>
      </div>
    </div>
  </li>

</template>
