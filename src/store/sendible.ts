import { defineStore } from 'pinia'
import axios from 'axios'

export interface SendibleProfile {
  id: string
  name: string
  service_type: string
  service_username: string
  avatar_url?: string
  is_active: boolean
}

export interface LinkedProfile {
  id: number
  brandId: number
  sendibleProfileId: string
  profileData: SendibleProfile
  createdAt: string
  updatedAt: string
}

export interface PublishPostData {
  selectedProfileIds: number[]
  text: string
  media?: File[]
  scheduled_at?: string
}

export const useSendibleStore = defineStore('sendible', {
  state: () => ({
    isSendibleConnected: false as boolean,
    availableSendibleProfiles: [] as SendibleProfile[],
    loading: false as boolean,
    error: null as string | null
  }),

  actions: {
    /**
     * Verifica el estado de conexión con Sendible
     */
    async checkSendibleStatus(): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.get('/api/sendible/connection-status')
        this.isSendibleConnected = response.data.isConnected || false
        
        return this.isSendibleConnected
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al verificar conexión con Sendible'
        this.isSendibleConnected = false
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Inicia el proceso de autenticación OAuth con Sendible
     */
    async initiateSendibleAuth(): Promise<void> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.get('/api/sendible/auth/initiate')
        const authUrl = response.data.authUrl
        
        if (authUrl) {
          window.location.href = authUrl
        } else {
          throw new Error('No se recibió URL de autorización de Sendible')
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al iniciar autenticación con Sendible'
        this.loading = false
        throw error
      }
    },

    /**
     * Maneja el callback de OAuth de Sendible
     */
    async handleSendibleCallback(code: string): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.post('/api/sendible/callback', { code })
        
        if (response.data.success) {
          this.isSendibleConnected = true
          return true
        } else {
          throw new Error('Error en el proceso de autorización')
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al procesar callback de Sendible'
        this.isSendibleConnected = false
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Obtiene todos los perfiles disponibles de Sendible
     */
    async fetchAvailableProfiles(): Promise<SendibleProfile[]> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.get('/api/sendible/profiles')
        this.availableSendibleProfiles = response.data.profiles || []
        
        return this.availableSendibleProfiles
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al obtener perfiles de Sendible'
        this.availableSendibleProfiles = []
        return []
      } finally {
        this.loading = false
      }
    },

    /**
     * Obtiene los perfiles vinculados a una marca específica
     */
    async fetchBrandProfiles(brandId: number): Promise<LinkedProfile[]> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.get(`/api/brands/${brandId}/profiles`)
        return response.data.profiles || []
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al obtener perfiles de la marca'
        return []
      } finally {
        this.loading = false
      }
    },

    /**
     * Vincula un perfil de Sendible a una marca
     */
    async linkProfileToBrand(brandId: number, sendibleProfileId: string): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.post(`/api/brands/${brandId}/link-profile`, {
          sendibleProfileId
        })
        
        return response.data.success || false
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al vincular perfil a la marca'
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Desvincula un perfil de una marca
     */
    async unlinkProfile(profileId: number): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.delete(`/api/brands/profiles/${profileId}`)
        return response.data.success || false
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al desvincular perfil'
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Publica un post en Sendible
     */
    async publishPost(postData: PublishPostData): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        const formData = new FormData()
        formData.append('text', postData.text)
        formData.append('selectedProfileIds', JSON.stringify(postData.selectedProfileIds))
        
        if (postData.scheduled_at) {
          formData.append('scheduled_at', postData.scheduled_at)
        }
        
        if (postData.media && postData.media.length > 0) {
          postData.media.forEach((file) => {
            formData.append('media', file)
          })
        }
        
        const response = await axios.post('/api/posts/publish-sendible', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        return response.data.success || false
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al publicar post en Sendible'
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Desconecta la cuenta de Sendible
     */
    async disconnectSendible(): Promise<boolean> {
      try {
        this.loading = true
        this.error = null
        
        // Llamar al endpoint de desconexión si existe
        // const response = await axios.post('/api/sendible/disconnect')
        
        this.isSendibleConnected = false
        this.availableSendibleProfiles = []
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al desconectar Sendible'
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * Limpia errores
     */
    clearError(): void {
      this.error = null
    }
  },

  getters: {
    /**
     * Obtiene perfiles disponibles que no están vinculados
     */
    getUnlinkedProfiles: (state) => (linkedProfileIds: string[]) => {
      return state.availableSendibleProfiles.filter(
        profile => !linkedProfileIds.includes(profile.id)
      )
    },

    /**
     * Verifica si hay una operación en curso
     */
    isLoading: (state) => state.loading,

    /**
     * Obtiene el mensaje de error actual
     */
    currentError: (state) => state.error
  }
})
