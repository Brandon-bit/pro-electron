<template>
  <div class="profile-linker">
    <div class="linker-card">
      <div class="linker-header">
        <h3 class="linker-title">
          <svg class="title-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
          Perfiles de Sendible
        </h3>
        <button 
          @click="refreshData" 
          class="btn-refresh"
          :disabled="isLoading"
        >
          <svg :class="{ 'spin': isLoading }" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && linkedProfiles.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando perfiles...</p>
      </div>

      <!-- Not Connected State -->
      <div v-else-if="!sendibleStore.isSendibleConnected" class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h4>Sendible no está conectado</h4>
        <p>Conecta tu cuenta de Sendible antes de vincular perfiles.</p>
        <router-link to="/marketing/integraciones" class="btn btn--primary">
          Ir a Integraciones
        </router-link>
      </div>

      <!-- Connected State -->
      <div v-else class="linker-content">
        <!-- Linked Profiles -->
        <div class="profiles-section">
          <h4 class="section-title">
            🔗 Perfiles Vinculados
            <span class="badge">{{ linkedProfiles.length }}</span>
          </h4>

          <div v-if="linkedProfiles.length === 0" class="empty-message">
            No hay perfiles vinculados
          </div>

          <div v-else class="profiles-list">
            <div 
              v-for="profile in linkedProfiles" 
              :key="profile.id"
              class="profile-card profile-card--linked"
            >
              <div class="profile-main">
                <img 
                  v-if="profile.profileData.avatar_url"
                  :src="profile.profileData.avatar_url" 
                  :alt="profile.profileData.service_username"
                  class="profile-avatar"
                  @error="handleImageError"
                >
                <div v-else class="profile-avatar profile-avatar--placeholder">
                  {{ profile.profileData.service_username.charAt(0).toUpperCase() }}
                </div>
                <div class="profile-info">
                  <h5>{{ profile.profileData.service_username }}</h5>
                  <p>{{ profile.profileData.service_type }}</p>
                  <small>{{ formatDate(profile.createdAt) }}</small>
                </div>
              </div>
              <button 
                @click="confirmUnlink(profile)" 
                class="btn btn--danger btn--small"
                :disabled="isLoading"
              >
                Desvincular
              </button>
            </div>
          </div>
        </div>

        <!-- Available Profiles -->
        <div class="profiles-section">
          <h4 class="section-title">
            ➕ Perfiles Disponibles
            <span class="badge">{{ unlinkedProfiles.length }}</span>
          </h4>

          <div v-if="unlinkedProfiles.length === 0" class="empty-message">
            Todos los perfiles están vinculados
          </div>

          <div v-else class="profiles-list">
            <div 
              v-for="profile in unlinkedProfiles" 
              :key="profile.id"
              class="profile-card"
            >
              <div class="profile-main">
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
                  <h5>{{ profile.service_username }}</h5>
                  <p>{{ profile.service_type }}</p>
                </div>
              </div>
              <button 
                @click="linkProfile(profile)" 
                class="btn btn--primary btn--small"
                :disabled="isLoading"
              >
                Vincular
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="alert alert--error">
        {{ error }}
        <button @click="clearError" class="alert-close">×</button>
      </div>
    </div>

    <!-- Unlink Modal -->
    <div v-if="showUnlinkModal" class="modal" @click.self="cancelUnlink">
      <div class="modal-content">
        <h3>Confirmar desvinculación</h3>
        <div v-if="profileToUnlink">
          <p><strong>{{ profileToUnlink.profileData.service_username }}</strong></p>
          <p>¿Desvincular este perfil de la marca?</p>
        </div>
        <div class="modal-actions">
          <button @click="cancelUnlink" class="btn btn--secondary">Cancelar</button>
          <button @click="executeUnlink" class="btn btn--danger" :disabled="isLoading">
            {{ isLoading ? 'Desvinculando...' : 'Desvincular' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSendibleStore, type SendibleProfile, type LinkedProfile } from '@/store/sendible'

interface Props {
  brandId: number
}

const props = defineProps<Props>()
const sendibleStore = useSendibleStore()

const linkedProfiles = ref<LinkedProfile[]>([])
const availableProfiles = ref<SendibleProfile[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const showUnlinkModal = ref(false)
const profileToUnlink = ref<LinkedProfile | null>(null)

const unlinkedProfiles = computed(() => {
  const linkedIds = linkedProfiles.value.map(p => p.sendibleProfileId)
  return availableProfiles.value.filter(profile => !linkedIds.includes(profile.id))
})

const refreshData = async () => {
  await Promise.all([fetchLinkedProfiles(), fetchAvailableProfiles()])
}

const fetchLinkedProfiles = async () => {
  try {
    isLoading.value = true
    error.value = null
    linkedProfiles.value = await sendibleStore.fetchBrandProfiles(props.brandId)
  } catch (err: any) {
    error.value = err.message || 'Error al obtener perfiles vinculados'
  } finally {
    isLoading.value = false
  }
}

const fetchAvailableProfiles = async () => {
  try {
    isLoading.value = true
    error.value = null
    availableProfiles.value = await sendibleStore.fetchAvailableProfiles()
  } catch (err: any) {
    error.value = err.message || 'Error al obtener perfiles disponibles'
  } finally {
    isLoading.value = false
  }
}

const linkProfile = async (profile: SendibleProfile) => {
  try {
    isLoading.value = true
    error.value = null
    const success = await sendibleStore.linkProfileToBrand(props.brandId, profile.id)
    if (success) await fetchLinkedProfiles()
    else throw new Error('Error al vincular perfil')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const confirmUnlink = (profile: LinkedProfile) => {
  profileToUnlink.value = profile
  showUnlinkModal.value = true
}

const cancelUnlink = () => {
  profileToUnlink.value = null
  showUnlinkModal.value = false
}

const executeUnlink = async () => {
  if (!profileToUnlink.value) return
  try {
    isLoading.value = true
    error.value = null
    const success = await sendibleStore.unlinkProfile(profileToUnlink.value.id)
    if (success) {
      await fetchLinkedProfiles()
      showUnlinkModal.value = false
      profileToUnlink.value = null
    } else throw new Error('Error al desvincular perfil')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const clearError = () => {
  error.value = null
  sendibleStore.clearError()
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

watch(() => props.brandId, async (newBrandId) => {
  if (newBrandId) await refreshData()
}, { immediate: false })

onMounted(async () => {
  if (props.brandId) await refreshData()
})
</script>

<style scoped>
.profile-linker { width: 100%; }
.linker-card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; }
.linker-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e5e7eb; }
.linker-title { display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 600; color: #111827; margin: 0; }
.title-icon { width: 24px; height: 24px; color: #667eea; }
.btn-refresh { width: 40px; height: 40px; border-radius: 8px; border: none; background: #f3f4f6; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.btn-refresh:hover:not(:disabled) { background: #e5e7eb; }
.btn-refresh svg { width: 20px; height: 20px; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-state { display: flex; flex-direction: column; align-items: center; padding: 3rem 2rem; gap: 1rem; }
.spinner { width: 48px; height: 48px; border: 4px solid #e5e7eb; border-top-color: #667eea; border-radius: 50%; animation: spin 1s linear infinite; }
.empty-state { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 3rem 2rem; gap: 1rem; }
.empty-icon { font-size: 3rem; }
.linker-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 2rem; }
.profiles-section { display: flex; flex-direction: column; gap: 1rem; }
.section-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600; color: #111827; margin: 0; }
.badge { display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 0.5rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: #e0e7ff; color: #4338ca; }
.empty-message { padding: 1rem; text-align: center; color: #6b7280; font-size: 0.875rem; background: #f9fafb; border-radius: 8px; }
.profiles-list { display: flex; flex-direction: column; gap: 0.75rem; }
.profile-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-radius: 8px; background: #f9fafb; border: 1px solid #e5e7eb; transition: all 0.2s; }
.profile-card:hover { background: #f3f4f6; }
.profile-card--linked { background: linear-gradient(to right, #d1fae5 0%, #f0fdf4 100%); border: 1px solid #a7f3d0; }
.profile-main { display: flex; align-items: center; gap: 1rem; flex: 1; }
.profile-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.profile-avatar--placeholder { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }
.profile-info { flex: 1; }
.profile-info h5 { font-weight: 600; font-size: 0.875rem; color: #111827; margin: 0 0 0.25rem; }
.profile-info p { font-size: 0.75rem; color: #6b7280; margin: 0; }
.profile-info small { font-size: 0.75rem; color: #9ca3af; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn--primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.btn--primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
.btn--secondary { background: #f3f4f6; color: #374151; }
.btn--danger { background: #fee2e2; color: #991b1b; }
.btn--danger:hover:not(:disabled) { background: #fecaca; }
.btn--small { padding: 0.375rem 0.875rem; font-size: 0.8125rem; }
.alert { position: relative; padding: 1rem; margin: 1rem 1.5rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
.alert--error { background: #fee2e2; color: #991b1b; }
.alert-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0; width: 24px; height: 24px; }
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; border-radius: 12px; padding: 1.5rem; max-width: 400px; width: 100%; margin: 1rem; }
.modal-content h3 { margin: 0 0 1rem; font-size: 1.25rem; font-weight: 600; }
.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
</style>
