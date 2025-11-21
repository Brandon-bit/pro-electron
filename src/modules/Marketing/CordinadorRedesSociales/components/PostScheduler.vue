<template>
  <div class="post-scheduler">
    <form @submit.prevent="handleSubmit" class="scheduler-form">
      <!-- Brand Selector -->
      <div class="form-group">
        <label class="form-label">
          Marca <span class="required">*</span>
        </label>
        <select v-model="formData.selectedBrandId" class="form-select" required>
          <option value="">Selecciona una marca</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.nombreMarca }}
          </option>
        </select>
      </div>

      <!-- Profile Checkboxes -->
      <div v-if="formData.selectedBrandId" class="form-group">
        <label class="form-label">
          Perfiles de Sendible <span class="required">*</span>
        </label>
        
        <div v-if="loadingProfiles" class="loading-box">
          <div class="spinner-small"></div>
          <span>Cargando perfiles...</span>
        </div>

        <div v-else-if="brandProfiles.length === 0" class="alert alert--warning">
          Esta marca no tiene perfiles vinculados.
          <router-link :to="`/marketing/gestion-de-marcas`" class="alert-link">
            Vincular perfiles
          </router-link>
        </div>

        <div v-else class="profiles-checkboxes">
          <label 
            v-for="profile in brandProfiles" 
            :key="profile.id"
            class="checkbox-card"
            :class="{ 'checkbox-card--checked': formData.selectedProfileIds.includes(profile.id) }"
          >
            <input 
              type="checkbox" 
              :value="profile.id"
              v-model="formData.selectedProfileIds"
              class="checkbox-input"
            >
            <div class="checkbox-content">
              <img 
                v-if="profile.profileData.avatar_url"
                :src="profile.profileData.avatar_url" 
                :alt="profile.profileData.service_username"
                class="checkbox-avatar"
              >
              <div v-else class="checkbox-avatar checkbox-avatar--placeholder">
                {{ profile.profileData.service_username.charAt(0).toUpperCase() }}
              </div>
              <div class="checkbox-info">
                <span class="checkbox-name">{{ profile.profileData.service_username }}</span>
                <span class="checkbox-type">{{ profile.profileData.service_type }}</span>
              </div>
              <div class="checkbox-check">✓</div>
            </div>
          </label>
        </div>
      </div>

      <!-- Post Content -->
      <div class="form-group">
        <label class="form-label">
          Contenido <span class="required">*</span>
        </label>
        <textarea 
          v-model="formData.text"
          class="form-textarea"
          placeholder="¿Qué quieres compartir?"
          rows="6"
          maxlength="5000"
          required
        ></textarea>
        <div class="form-hint">
          {{ formData.text.length }}/5000 caracteres
        </div>
      </div>

      <!-- Media Upload -->
      <div class="form-group">
        <label class="form-label">
          Imágenes o Videos
        </label>
        <div class="file-upload">
          <input 
            type="file"
            @change="handleFileChange"
            accept="image/*,video/*"
            multiple
            class="file-input"
            id="media-upload"
          >
          <label for="media-upload" class="file-label">
            <svg class="file-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>{{ formData.media.length > 0 ? `${formData.media.length} archivo(s) seleccionado(s)` : 'Seleccionar archivos' }}</span>
          </label>
        </div>

        <!-- Media Preview -->
        <div v-if="mediaPreview.length > 0" class="media-preview">
          <div v-for="(preview, index) in mediaPreview" :key="index" class="preview-item">
            <img :src="preview" class="preview-image" alt="Preview">
            <button 
              type="button"
              @click="removeMedia(index)" 
              class="preview-remove"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Schedule Date -->
      <div class="form-group">
        <label class="form-label">
          Fecha de Publicación
        </label>
        <input 
          type="datetime-local"
          v-model="formData.scheduled_at"
          class="form-input"
          :min="minDateTime"
        >
        <div class="form-hint">
          Deja vacío para publicar inmediatamente
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="alert alert--error">
        {{ error }}
        <button type="button" @click="error = null" class="alert-close">×</button>
      </div>

      <!-- Success Display -->
      <div v-if="success" class="alert alert--success">
        {{ success }}
        <button type="button" @click="success = null" class="alert-close">×</button>
      </div>

      <!-- Submit Buttons -->
      <div class="form-actions">
        <button 
          type="button"
          @click="resetForm" 
          class="btn btn--secondary"
          :disabled="isSubmitting"
        >
          Limpiar
        </button>
        <button 
          type="submit" 
          class="btn btn--primary"
          :disabled="!isFormValid || isSubmitting"
        >
          <svg v-if="isSubmitting" class="btn-icon spin" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </svg>
          {{ isSubmitting ? 'Publicando...' : (formData.scheduled_at ? 'Programar Publicación' : 'Publicar Ahora') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSendibleStore, type LinkedProfile } from '@/store/sendible'
import type { Brand } from '@/modules/Marketing/GestionMarcas/types/brandTypes'

interface Props {
  brands: Brand[]
}

defineProps<Props>()
const sendibleStore = useSendibleStore()

// Form Data
const formData = ref({
  selectedBrandId: '',
  selectedProfileIds: [] as number[],
  text: '',
  media: [] as File[],
  scheduled_at: ''
})

// State
const brandProfiles = ref<LinkedProfile[]>([])
const mediaPreview = ref<string[]>([])
const loadingProfiles = ref(false)
const isSubmitting = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

// Computed
const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 5)
  return now.toISOString().slice(0, 16)
})

const isFormValid = computed(() => {
  return (
    formData.value.selectedBrandId &&
    formData.value.selectedProfileIds.length > 0 &&
    formData.value.text.trim().length > 0
  )
})

// Methods
const fetchBrandProfiles = async (brandId: string) => {
  if (!brandId) return
  
  try {
    loadingProfiles.value = true
    error.value = null
    brandProfiles.value = await sendibleStore.fetchBrandProfiles(parseInt(brandId))
    formData.value.selectedProfileIds = []
  } catch (err: any) {
    error.value = err.message || 'Error al cargar perfiles de la marca'
    brandProfiles.value = []
  } finally {
    loadingProfiles.value = false
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const filesArray = Array.from(target.files)
    formData.value.media = filesArray
    
    // Generate previews
    mediaPreview.value = []
    filesArray.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          mediaPreview.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeMedia = (index: number) => {
  formData.value.media.splice(index, 1)
  mediaPreview.value.splice(index, 1)
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    isSubmitting.value = true
    error.value = null
    success.value = null
    
    const postData = {
      selectedProfileIds: formData.value.selectedProfileIds,
      text: formData.value.text,
      media: formData.value.media.length > 0 ? formData.value.media : undefined,
      scheduled_at: formData.value.scheduled_at || undefined
    }
    
    const result = await sendibleStore.publishPost(postData)
    
    if (result) {
      success.value = formData.value.scheduled_at 
        ? 'Publicación programada exitosamente' 
        : 'Publicación enviada exitosamente'
      resetForm()
    } else {
      throw new Error(sendibleStore.currentError || 'Error al publicar')
    }
  } catch (err: any) {
    error.value = err.message || 'Error al publicar el post'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    selectedBrandId: '',
    selectedProfileIds: [],
    text: '',
    media: [],
    scheduled_at: ''
  }
  mediaPreview.value = []
  brandProfiles.value = []
  error.value = null
  success.value = null
}

// Watchers
watch(() => formData.value.selectedBrandId, (newBrandId) => {
  if (newBrandId) {
    fetchBrandProfiles(newBrandId)
  } else {
    brandProfiles.value = []
    formData.value.selectedProfileIds = []
  }
})

// Lifecycle
onMounted(async () => {
  await sendibleStore.checkSendibleStatus()
})
</script>

<style scoped>
.post-scheduler { width: 100%; }
.scheduler-form { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1.5rem; }
.form-label { display: block; font-weight: 600; font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem; }
.required { color: #ef4444; }
.form-select, .form-input, .form-textarea { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; transition: all 0.2s; }
.form-select:focus, .form-input:focus, .form-textarea:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
.form-textarea { resize: vertical; font-family: inherit; }
.form-hint { font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem; }
.loading-box { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f9fafb; border-radius: 8px; }
.spinner-small { width: 20px; height: 20px; border: 2px solid #e5e7eb; border-top-color: #667eea; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.profiles-checkboxes { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.75rem; }
.checkbox-card { display: block; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.checkbox-card:hover { border-color: #667eea; background: #f9fafb; }
.checkbox-card--checked { border-color: #667eea; background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%); }
.checkbox-input { display: none; }
.checkbox-content { display: flex; align-items: center; gap: 0.75rem; position: relative; }
.checkbox-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.checkbox-avatar--placeholder { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }
.checkbox-info { flex: 1; min-width: 0; }
.checkbox-name { display: block; font-weight: 600; font-size: 0.875rem; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.checkbox-type { display: block; font-size: 0.75rem; color: #6b7280; }
.checkbox-check { width: 24px; height: 24px; border-radius: 50%; background: #667eea; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; opacity: 0; transition: opacity 0.2s; }
.checkbox-card--checked .checkbox-check { opacity: 1; }
.file-upload { position: relative; }
.file-input { position: absolute; width: 0.1px; height: 0.1px; opacity: 0; overflow: hidden; z-index: -1; }
.file-label { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 2px dashed #d1d5db; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.file-label:hover { border-color: #667eea; background: #f9fafb; }
.file-icon { width: 24px; height: 24px; color: #667eea; }
.media-preview { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.75rem; margin-top: 1rem; }
.preview-item { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; }
.preview-image { width: 100%; height: 100%; object-fit: cover; }
.preview-remove { position: absolute; top: 0.25rem; right: 0.25rem; width: 24px; height: 24px; border-radius: 50%; background: rgba(0,0,0,0.7); color: white; border: none; cursor: pointer; font-size: 1.25rem; line-height: 1; display: flex; align-items: center; justify-content: center; }
.preview-remove:hover { background: rgba(0,0,0,0.9); }
.alert { padding: 1rem; border-radius: 8px; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
.alert--warning { background: #fef3c7; color: #92400e; }
.alert--error { background: #fee2e2; color: #991b1b; }
.alert--success { background: #d1fae5; color: #065f46; }
.alert-link { color: inherit; text-decoration: underline; font-weight: 600; }
.alert-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0; width: 24px; height: 24px; color: inherit; opacity: 0.7; }
.alert-close:hover { opacity: 1; }
.form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn--primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.btn--primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(102,126,234,0.4); }
.btn--secondary { background: #f3f4f6; color: #374151; }
.btn--secondary:hover:not(:disabled) { background: #e5e7eb; }
.btn-icon { width: 18px; height: 18px; }
@media (max-width: 640px) {
  .scheduler-form { padding: 1.5rem; }
  .profiles-checkboxes { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
}
</style>
