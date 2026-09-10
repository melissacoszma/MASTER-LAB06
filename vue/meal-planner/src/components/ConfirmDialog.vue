<script setup>
// PROPS: lo que el padre le da a este componente

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '¿Estás segura?' },
  message: { type: String, default: '' },
  confirmLabel: { type: String, default: 'Confirmar' },
})

// EMITS: los eventos que este componente puede lanzar hacia su padre

const emit = defineEmits(['confirm', 'cancel'])

</script>

<template>
 
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="emit('cancel')"
  >
    <!-- el .self de arriba es clave: hace que el click solo cuente si se ha hecho sobre ESTE elemento exacto -->

    <div class="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">

      <h3 class="mb-2 text-base font-semibold text-slate-800">{{ title }}</h3>

      <p v-if="message" class="mb-4 text-sm text-slate-600">{{ message }}</p>

      <div class="flex justify-end gap-2">

        <button
          type="button"
          class="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          @click="emit('cancel')"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </button>

      </div>

    </div>

  </div>

</template>