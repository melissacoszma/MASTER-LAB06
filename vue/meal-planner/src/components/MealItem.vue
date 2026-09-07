<script setup>
defineProps({
  meal: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="flex items-center justify-between gap-2 rounded bg-slate-50 px-2 py-1 text-sm">
    <span class="text-slate-700">{{ meal.name }}</span>
    <!-- Aquí irán los botones (eliminar / editar / favorito) -->
  </li>
</template>
