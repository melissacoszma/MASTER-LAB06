<script setup>

import { RouterView } from 'vue-router'

</script>

<template>
 
  <div class="min-h-screen bg-slate-50">                                 <!-- min-h-screen: ocupa como minimo el alto de la ventana para que el fondo gris cubra toda la pantalla aunque haya poco contenido -->

    
    <header class="border-b border-slate-200 bg-white">                  <!-- La cabecera está FUERA del RouterView: se queda fija al navegar entre vistas -->
    
      <div class="mx-auto max-w-6xl px-4 py-4">                          <!-- mx-auto + max-w-6xl: centra el contenido y le pone un ancho máximo para que no se estire en pantallas grandes -->
        <h1 class="text-xl font-bold text-slate-800">🍽️ Meal Planner</h1>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
