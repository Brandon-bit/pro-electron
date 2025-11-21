<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getPublicSurveyService, submitPublicResponseService } from '../services/benchmarkingService';
import DynamicQuestionRenderer from '../components/DynamicQuestionRenderer.vue';
import type { Survey, Template, Question } from '../types/benchmarkingTypes';

const route = useRoute();
const token = route.params.token as string;

// State
const survey = ref<Survey | null>(null);
const template = ref<Template | null>(null);
const responses = ref<Record<string, any>>({});
const loading = ref(true);
const submitting = ref(false);
const error = ref<string | null>(null);
const submitted = ref(false);

// Computed
const questions = computed(() => template.value?.questions || []);

const isActive = computed(() => {
  if (!survey.value) return false;
  
  const now = new Date();
  const start = survey.value.startDate ? new Date(survey.value.startDate) : null;
  const end = survey.value.endDate ? new Date(survey.value.endDate) : null;
  
  if (start && now < start) return false;
  if (end && now > end) return false;
  
  return survey.value.status === 'active';
});

// Validation
function validateResponses(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  questions.value.forEach((q: Question) => {
    const value = responses.value[q.id];
    
    // Check required fields
    if (q.required && (value === undefined || value === null || value === '')) {
      errors.push(`La pregunta "${q.text}" es obligatoria`);
      return;
    }
    
    if (!value) return;
    
    // Validate email
    if (q.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push(`"${q.text}" debe ser un email válido`);
      }
    }
    
    // Validate phone
    if (q.type === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        errors.push(`"${q.text}" debe ser un teléfono válido`);
      }
    }
    
    // Validate scale range
    if ((q.type === 'scale' || q.type === 'stars') && q.scaleMin && q.scaleMax) {
      const numValue = Number(value);
      if (numValue < q.scaleMin || numValue > q.scaleMax) {
        errors.push(`"${q.text}" debe estar entre ${q.scaleMin} y ${q.scaleMax}`);
      }
    }
    
    // Validate checkbox (at least one if required)
    if (q.type === 'checkbox' && q.required) {
      if (!Array.isArray(value) || value.length === 0) {
        errors.push(`Debe seleccionar al menos una opción en "${q.text}"`);
      }
    }
  });
  
  return { valid: errors.length === 0, errors };
}

// Load survey
async function loadSurvey() {
  try {
    loading.value = true;
    error.value = null;
    
    const data = await getPublicSurveyService(token);
    console.log('Survey data received:', data);
    
    // El backend puede devolver Survey/Template (mayúsculas) o survey/template (minúsculas)
    survey.value = data.survey || (data as any).Survey;
    template.value = data.template || (data as any).Template;
    
    if (!survey.value || !template.value) {
      throw new Error('Datos de encuesta incompletos');
    }
  } catch (err: any) {
    console.error('Error loading survey:', err);
    error.value = err.response?.data?.message || err.message || 'No se pudo cargar la encuesta';
  } finally {
    loading.value = false;
  }
}

// Submit responses
async function handleSubmit() {
  // Validate
  const validation = validateResponses();
  if (!validation.valid) {
    alert('Por favor completa todos los campos requeridos:\n\n' + validation.errors.join('\n'));
    return;
  }
  
  try {
    submitting.value = true;
    error.value = null;
    
    await submitPublicResponseService(token, responses.value);
    submitted.value = true;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err: any) {
    console.error('Error submitting response:', err);
    error.value = err.response?.data?.message || 'Error al enviar las respuestas';
    alert('Error al enviar las respuestas. Por favor intenta de nuevo.');
  } finally {
    submitting.value = false;
  }
}

// Lifecycle
onMounted(() => {
  loadSurvey();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow-lg p-12 text-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4 text-gray-600">Cargando encuesta...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error && !survey" class="bg-white rounded-lg shadow-lg p-12 text-center">
        <div class="text-error text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error</h2>
        <p class="text-gray-600">{{ error }}</p>
        <button @click="loadSurvey" class="btn btn-primary mt-6">
          Reintentar
        </button>
      </div>
      
      <!-- Thank You Page (After Submission) -->
      <div v-else-if="submitted" class="bg-white rounded-lg shadow-lg p-12 text-center">
        <div class="text-success text-6xl mb-4">✓</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">¡Gracias por tu participación!</h2>
        <p class="text-lg text-gray-600 mb-2">
          Tus respuestas han sido enviadas exitosamente.
        </p>
        <p class="text-gray-500">
          Apreciamos mucho tu tiempo y opinión.
        </p>
        <div class="mt-8 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-gray-600">
            Puedes cerrar esta ventana de forma segura.
          </p>
        </div>
      </div>
      
      <!-- Survey Form -->
      <div v-else-if="survey && template" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
          <h1 class="text-3xl font-bold mb-2">{{ survey.title }}</h1>
          <p class="text-blue-100">{{ survey.description }}</p>
          
          <!-- Survey Info -->
          <div class="mt-4 flex flex-wrap gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="opacity-75">Tipo:</span>
              <span class="badge badge-lg bg-white/20 border-white/30">
                {{ survey.type === 'mystery' ? 'Mystery Shopper' : 'Benchmarking' }}
              </span>
            </div>
            <div v-if="template.category" class="flex items-center gap-2">
              <span class="opacity-75">Categoría:</span>
              <span class="badge badge-lg bg-white/20 border-white/30">
                {{ template.category }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Inactive Survey Warning -->
        <div v-if="!isActive" class="bg-warning/10 border-l-4 border-warning p-6">
          <div class="flex items-start gap-3">
            <span class="text-warning text-2xl">⚠️</span>
            <div>
              <h3 class="font-bold text-warning mb-1">Encuesta no disponible</h3>
              <p class="text-sm text-gray-700">
                Esta encuesta no está activa actualmente o está fuera del período de respuestas.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Form Content -->
        <div v-else class="p-8">
          <!-- Instructions -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p class="text-sm text-gray-700">
              <span class="font-semibold">Instrucciones:</span> 
              Por favor responde todas las preguntas marcadas con 
              <span class="text-error">*</span> (son obligatorias).
            </p>
          </div>
          
          <!-- Questions -->
          <DynamicQuestionRenderer 
            v-model="responses"
            :questions="questions"
          />
          
          <!-- Submit Button -->
          <div class="mt-8 flex justify-end gap-4">
            <button 
              @click="handleSubmit"
              :disabled="submitting"
              class="btn btn-primary btn-lg"
            >
              <span v-if="submitting" class="loading loading-spinner"></span>
              <span v-else>Enviar Respuestas</span>
            </button>
          </div>
          
          <!-- Error Message -->
          <div v-if="error" class="alert alert-error mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500">
          Powered by Benchmarking & Mystery Shopper System
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
