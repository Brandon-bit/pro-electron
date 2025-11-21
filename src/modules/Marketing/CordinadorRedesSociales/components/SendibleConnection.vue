<template>
  <div class="sendible-connection">
    <div class="connection-card">
      <!-- Header -->
      <div class="connection-header">
        <div class="connection-info">
          <div class="connection-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" class="icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h3 class="connection-title">Sendible</h3>
            <p class="connection-subtitle">Gestión de redes sociales</p>
          </div>
        </div>
        
        <div class="connection-status" :class="statusClass">
          <span class="status-dot"></span>
          <span class="status-text">{{ statusText }}</span>
        </div>
      </div>

      <!-- Connected State -->
      <div v-if="sendibleStore.isSendibleConnected" class="connection-content">
        <div class="alert alert--success">
          <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <div>
            <h4 class="alert-title">¡Conectado exitosamente!</h4>
            <p class="alert-message">Tu cuenta de Sendible está activa y lista para usar</p>
          </div>
        </div>

        <!-- Profiles Summary -->
        <div v-if="profileCount > 0" class="profiles-summary">
          <h4 class="profiles-title">
            <svg class="profiles-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            Perfiles disponibles ({{ profileCount }})
          </h4>
          <div class="profiles-grid">
            <div 
              v-for="profile in displayProfiles" 
              :key="profile.id"
              class="profile-item"
            >
              <img 
                v-if="profile.avatar_url"
                :src="profile.avatar_url" 
                :alt="profile.service_username"
                class="profile-avatar"
                @error="handleImageError"
              >
              <div v-else class="profile-avatar profile-avatar--placeholder">
                {{ profile.service_username.charAt(0).toUpperCase() }}
              </div>
              <div class="profile-info">
                <p class="profile-name">{{ profile.service_username }}</p>
                <p class="profile-type">{{ profile.service_type }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="connection-actions">
          <button 
            @click="refreshProfiles" 
            class="btn btn--secondary"
            :disabled="sendibleStore.loading"
          >
            <svg class="btn-icon" :class="{ 'spin': sendibleStore.loading }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
            </svg>
            Actualizar Perfiles
          </button>
          
          <button 
            @click="showDisconnectModal = true" 
            class="btn btn--danger"
            :disabled="sendibleStore.loading"
          >
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
            </svg>
            Desconectar
          </button>
        </div>
      </div>

      <!-- Disconnected State -->
      <div v-else class="connection-content">
        <div class="alert alert--warning">
          <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div>
            <h4 class="alert-title">No conectado</h4>
            <p class="alert-message">Conecta tu cuenta de Sendible para comenzar a publicar</p>
          </div>
        </div>

        <!-- Features List -->
        <div class="features-list">
          <h4 class="features-title">¿Qué puedes hacer con Sendible?</h4>
          <ul class="features-items">
            <li class="feature-item">
              <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Publicar en múltiples redes sociales simultáneamente
            </li>
            <li class="feature-item">
              <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Programar publicaciones para fechas específicas
            </li>
            <li class="feature-item">
              <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Gestionar perfiles de Facebook, Instagram, Twitter, LinkedIn
            </li>
            <li class="feature-item">
              <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Subir imágenes y videos a tus publicaciones
            </li>
          </ul>
        </div>

        <!-- Connect Button -->
        <div class="connection-actions connection-actions--center">
          <button 
            @click="connectToSendible" 
            class="btn btn--primary btn--large"
            :disabled="sendibleStore.loading"
          >
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
            {{ sendibleStore.loading ? 'Conectando...' : 'Conectar con Sendible' }}
          </button>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="sendibleStore.currentError" class="alert alert--error">
        <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <div class="alert-content">
          <h4 class="alert-title">Error</h4>
          <p class="alert-message">{{ sendibleStore.currentError }}</p>
        </div>
        <button @click="sendibleStore.clearError()" class="alert-close">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Disconnect Modal -->
    <div v-if="showDisconnectModal" class="modal" @click.self="showDisconnectModal = false">
      <div class="modal-content">
        <h3 class="modal-title">Confirmar desconexión</h3>
        <p class="modal-message">
          ¿Estás seguro de que quieres desconectar tu cuenta de Sendible? 
          Esto eliminará todos los perfiles vinculados y no podrás publicar hasta que te conectes nuevamente.
        </p>
        <div class="modal-actions">
          <button @click="showDisconnectModal = false" class="btn btn--secondary">
            Cancelar
          </button>
          <button 
            @click="disconnectSendible" 
            class="btn btn--danger"
            :disabled="sendibleStore.loading"
          >
            Desconectar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSendibleStore } from '@/store/sendible'

const sendibleStore = useSendibleStore()

// State
const showDisconnectModal = ref(false)
const displayProfiles = ref<any[]>([])

// Computed
const statusClass = computed(() => {
  if (sendibleStore.loading) return 'connection-status--loading'
  return sendibleStore.isSendibleConnected ? 'connection-status--connected' : 'connection-status--disconnected'
})

const statusText = computed(() => {
  if (sendibleStore.loading) return 'Verificando...'
  return sendibleStore.isSendibleConnected ? 'Conectado' : 'Desconectado'
})

const profileCount = computed(() => displayProfiles.value.length)

// Methods
const connectToSendible = async () => {
  try {
    await sendibleStore.initiateSendibleAuth()
  } catch (error) {
    console.error('Error al conectar con Sendible:', error)
  }
}

const refreshProfiles = async () => {
  try {
    const profiles = await sendibleStore.fetchAvailableProfiles()
    displayProfiles.value = profiles.slice(0, 6)
  } catch (error) {
    console.error('Error al actualizar perfiles:', error)
  }
}

const disconnectSendible = async () => {
  try {
    const success = await sendibleStore.disconnectSendible()
    if (success) {
      showDisconnectModal.value = false
      displayProfiles.value = []
    }
  } catch (error) {
    console.error('Error al desconectar Sendible:', error)
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const parent = img.parentElement
  if (parent) {
    img.style.display = 'none'
    parent.classList.add('profile-avatar--placeholder')
    parent.textContent = img.alt.charAt(0).toUpperCase()
  }
}

// Lifecycle
onMounted(async () => {
  await sendibleStore.checkSendibleStatus()
  if (sendibleStore.isSendibleConnected) {
    await refreshProfiles()
  }
})
</script>

<style scoped>
.sendible-connection {
  width: 100%;
}

.connection-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.connection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.connection-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.connection-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon {
  width: 24px;
  height: 24px;
}

.connection-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.connection-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.connection-status--connected {
  background: #d1fae5;
  color: #065f46;
}

.connection-status--disconnected {
  background: #fee2e2;
  color: #991b1b;
}

.connection-status--loading {
  background: #fef3c7;
  color: #92400e;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.connection-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.alert {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.alert--success {
  background: #d1fae5;
  color: #065f46;
}

.alert--warning {
  background: #fef3c7;
  color: #92400e;
}

.alert--error {
  background: #fee2e2;
  color: #991b1b;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-title {
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.alert-message {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

.alert-content {
  flex: 1;
}

.alert-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.alert-close:hover {
  opacity: 1;
}

.profiles-summary {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
}

.profiles-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.profiles-icon {
  width: 20px;
  height: 20px;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.profile-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  transition: transform 0.2s;
}

.profile-item:hover {
  transform: translateY(-2px);
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-avatar--placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: #111827;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-type {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.125rem 0 0;
}

.features-list {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
}

.features-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.features-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
}

.feature-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.connection-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.connection-actions--center {
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
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
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn--danger {
  background: #fee2e2;
  color: #991b1b;
}

.btn--danger:hover:not(:disabled) {
  background: #fecaca;
}

.btn--large {
  padding: 0.875rem 2rem;
  font-size: 1rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.modal-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .connection-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .profiles-grid {
    grid-template-columns: 1fr;
  }
  
  .connection-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
