<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Survey } from '../types/benchmarkingTypes';

// Props y Emits
const props = defineProps<{
  modelValue: boolean;
  survey: Survey | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'generateUrl', surveyId: string): void;
}>();

// Lógica Interna del Modal
const modalRef = ref<HTMLDialogElement | null>(null);
const copied = ref(false);

// Computed
const hasPublicUrl = computed(() => !!props.survey?.publicUrl);
const publicUrl = computed(() => props.survey?.publicUrl || '');

// Generar URL pública
const handleGenerateUrl = () => {
  if (props.survey) {
    emit('generateUrl', props.survey.id);
  }
};

// Copiar URL al portapapeles
const copyToClipboard = async () => {
  if (publicUrl.value) {
    try {
      await navigator.clipboard.writeText(publicUrl.value);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }
};

// Abrir URL en nueva pestaña
const openInNewTab = () => {
  if (publicUrl.value) {
    window.open(publicUrl.value, '_blank');
  }
};

// Cierra el modal
const closeModal = () => {
  copied.value = false;
  emit('update:modelValue', false);
};

// Sincronización con <dialog>
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        Compartir Estudio
      </h3>
      <p class="py-2 text-sm text-base-content/70">
        {{ hasPublicUrl ? 'Comparte este enlace público con tus evaluadores' : 'Genera un enlace público para compartir este estudio' }}
      </p>

      <div class="space-y-4 mt-6">
        
        <!-- Sin URL generada -->
        <div v-if="!hasPublicUrl" class="text-center py-8">
          <div class="text-6xl mb-4">🔗</div>
          <h4 class="text-lg font-semibold mb-2">Genera un Enlace Público</h4>
          <p class="text-sm text-gray-500 mb-6">
            Crea un enlace único que podrás compartir con tus evaluadores para que respondan la encuesta
          </p>
          <button 
            class="btn btn-primary gap-2" 
            @click="handleGenerateUrl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
            Generar Enlace
          </button>
        </div>

        <!-- Con URL generada -->
        <div v-else class="space-y-4">
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Enlace público generado exitosamente</span>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">URL Pública</span>
            </label>
            <div class="join w-full">
              <input 
                type="text" 
                :value="publicUrl" 
                readonly 
                class="input input-bordered join-item flex-1 font-mono text-sm"
              />
              <button 
                class="btn join-item btn-primary"
                @click="copyToClipboard"
              >
                <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ copied ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>

          <div class="flex gap-2">
            <button 
              class="btn btn-outline flex-1 gap-2"
              @click="openInNewTab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Abrir en Nueva Pestaña
            </button>
          </div>

          <div class="bg-base-200 rounded-lg p-4">
            <h5 class="font-semibold mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              Instrucciones
            </h5>
            <ul class="text-sm space-y-1 text-base-content/70">
              <li>• Comparte este enlace con tus evaluadores</li>
              <li>• No requiere autenticación para responder</li>
              <li>• Las respuestas se guardarán automáticamente</li>
              <li>• Puedes ver los resultados en la pestaña "Resultados"</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button class="btn" @click="closeModal">Cerrar</button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>
