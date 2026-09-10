<script setup>
import { reactive, ref } from 'vue'
import { DAYS, MEAL_TIMES, useMealsStore } from '@/stores/meals'

const store = useMealsStore() 

function blankForm() {       // función que devuelve el formulario "en blanco". No la escribimos como objeto porque vamos a reutilizarla y no queremos que arrastre valores antiguos por error   
  return {
    name: '',
    day: DAYS[0],            // por defecto lunes
    mealTime: MEAL_TIMES[0], // por defecto comida
  }
}

const form = reactive(blankForm()) // ref() para valores sueltos, reactive() para objetos, los campos se acceden directamente (form.name) y se pueden limpiar de golpe con un Object.assign (abajo)


const error = ref('')             //  mensaje de error aparte, en su propio ref(), no va dentro del form porque form representa los datos del plato y el error es estado de la interfaz

function handleSubmit() {
  
  if (!form.name.trim()) {       // sin nombre no hay plato y avisamos al usuario que tiene que escribir un plato
    error.value = 'Escribe el nombre del plato'
    return
  }

  store.addMeal({ ...form }) // enviamos una COPIA al store

  
  Object.assign(form, blankForm()) // limpiamos el formulario, Object.assign() copia los campos de blankForm() sobre el objeto Vue detecta el cambio y los inputs se vacían, 
  error.value = ''                 // form = blankForm() NO funcionaría porque reasignar la variable rompe la reactividad en lugar de actualizar el objeto!!!!!
}
</script>

<template>
  <!-- @submit.prevent: escucha el evento submit y llama a preventDefault()
       el .prevent es un modificador de evento de Vue, para no escribir event.preventDefault() a mano -->
  <form
    @submit.prevent="handleSubmit"
    class="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm" 
  >
    <h2 class="mb-3 text-lg font-semibold text-slate-700">Añadir plato</h2> 

   
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end">   <!-- items-end alinea los campos por su base, para que el botón quede a la altura de los inputs y no flotando -->

      <!--  NOMBRE -->
      
      <div class="flex-1"> <!-- flex-1 hace que este campo absorba el espacio sobrante -->
       
        <label for="meal-name" class="mb-1 block text-sm font-medium text-slate-600">
          Plato
        </label>

                                 <!-- v-model crea el enlace de doble sentido
                                 lo que escribes actualiza form.name, y si algo cambia form.name desde el códig, el input se actualiza solo
                                 por dentro es : value + @input -->
        <input
          id="meal-name"
          v-model="form.name"
          type="text"
          placeholder="Ej: Lentejas"
          class="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>


      <!--  DÍA  -->

      <div>

        <label for="meal-day" class="mb-1 block text-sm font-medium text-slate-600">
          Día
        </label>

        <select
          id="meal-day"
          v-model="form.day"
          class="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        >
                                <!-- :value con dos puntos: sin ellos, value="day" guardaría literalmente el texto "day" los dos puntos indican que lo de dentro es una expresión JS -->
          <option v-for="day in DAYS" :key="day" :value="day">
            {{ day }}
          </option>

        </select>

      </div>

      <!--  COMIDA / CENA  -->
      
      <fieldset>               <!-- fieldset + legend agrupa semánticamente las opciones bajo un título. -->
        <legend class="mb-1 text-sm font-medium text-slate-600">Momento</legend>

        <div class="flex gap-3 py-2">
          
          <label
            v-for="time in MEAL_TIMES"
            :key="time"
            class="flex cursor-pointer items-center gap-1 text-sm text-slate-700"
          >
            <!-- TODOS comparten el mismo v-model cada uno aporta su :value, y el que esté marcado es el que coincida con form.mealTime. -->
            <input
              type="radio"
              :value="time"
              v-model="form.mealTime"
            />
            {{ time }}

          </label>

        </div>

      </fieldset>

            <!-- type="submit" es lo que dispara el evento submit del form. -->
          
      <button
        type="submit" 
        class="whitespace-nowrap rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Agregar
        
      </button> 

    </div>

    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </form>
</template>