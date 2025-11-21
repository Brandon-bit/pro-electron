<template>
  <div class="callback-container">
    <div class="callback-card">
      <!-- Processing State -->
      <div v-if="isProcessing" class="callback-state">
        <div class="spinner"></div>
        <h2 class="callback-title">Procesando autorización...</h2>
        <p class="callback-message">
          Estamos configurando tu conexión con Sendible. Esto puede tomar unos segundos.
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="callback-state">
        <div class="success-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="callback-title callback-title--success">¡Conexión exitosa!</h2>
        <p class="callback-message">
          Tu cuenta de Sendible ha sido conectada correctamente. Serás redirigido en breve.
        </p>
        <div class="countdown">
          <span class="countdown-number">{{ countdown }}</span>
          <span class="countdown-text">segundos</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="callback-state">
        <div class="error-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="callback-title callback-title--error">Error de conexión</h2>
        <p class="callback-message">{{ errorMessage }}</p>
        <div class="callback-actions">
          <button @click="retryConnection" class="btn btn--primary">
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            Reintentar
          </button>
          <button @click="goToIntegrations" class="btn btn--secondary">
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            Volver a Integraciones
          </button>
        </div>
      </div>

      <!-- No Code State -->
      <div v-else class="callback-state">
        <div class="warning-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="callback-title callback-title--warning">Código no encontrado</h2>
        <p class="callback-message">
          No se recibió el código de autorización de Sendible. Por favor, intenta el proceso nuevamente.
        </p>
        <div class="callback-actions">
          <button @click="goToIntegrations" class="btn btn--primary">
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            Volver a Integraciones
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSendibleStore } from '@/store/sendible'

const route = useRoute()
const router = useRouter()
const sendibleStore = useSendibleStore()

// State
const isProcessing = ref(false)
const isSuccess = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const countdown = ref(3)

// Methods
const processCallback = async () => {
  const code = route.query.code as string
  
  if (!code) {
    hasError.value = true
    errorMessage.value = 'No se recibió el código de autorización de Sendible'
    return
  }

  try {
    isProcessing.value = true
    hasError.value = false
    
    const success = await sendibleStore.handleSendibleCallback(code)
    
    if (success) {
      isSuccess.value = true
      startCountdown()
    } else {
      throw new Error(sendibleStore.currentError || 'Error desconocido en la autorización')
    }
  } catch (error: any) {
    hasError.value = true
    errorMessage.value = error.message || 'Error al procesar la autorización'
  } finally {
    isProcessing.value = false
  }
}

const startCountdown = () => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      redirectToIntegrations()
    }
  }, 1000)
}

const redirectToIntegrations = () => {
  router.push('/marketing/integraciones')
}

const retryConnection = () => {
  isSuccess.value = false
  hasError.value = false
  errorMessage.value = ''
  countdown.value = 3
  processCallback()
}

const goToIntegrations = () => {
  redirectToIntegrations()
}

// Lifecycle
onMounted(() => {
  processCallback()
})
</script>

<style scoped>
.callback-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.callback-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 3rem 2rem;
  max-width: 480px;
  width: 100%;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.callback-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 64px;
  height: 64px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #065f46;
  animation: scaleIn 0.5s ease-out;
}

.success-icon svg {
  width: 48px;
  height: 48px;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.error-icon {
  width: 80px;
  height: 80px;
  background: #fee2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #991b1b;
  animation: shake 0.5s ease-out;
}

.error-icon svg {
  width: 48px;
  height: 48px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.warning-icon {
  width: 80px;
  height: 80px;
  background: #fef3c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #92400e;
  animation: scaleIn 0.5s ease-out;
}

.warning-icon svg {
  width: 48px;
  height: 48px;
}

.callback-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.callback-title--success {
  color: #065f46;
}

.callback-title--error {
  color: #991b1b;
}

.callback-title--warning {
  color: #92400e;
}

.callback-message {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  max-width: 360px;
}

.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  min-width: 120px;
}

.countdown-number {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  font-family: 'Courier New', monospace;
  line-height: 1;
}

.countdown-text {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.callback-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
}

.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .callback-card {
    padding: 2rem 1.5rem;
  }
  
  .callback-title {
    font-size: 1.5rem;
  }
  
  .callback-message {
    font-size: 0.875rem;
  }
}
</style>
