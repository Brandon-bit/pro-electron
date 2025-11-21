import { defineStore } from 'pinia';
import type { 
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  Lista,
  CreateListaRequest,
  Contacto,
  CreateContactoRequest,
  BulkContactosRequest,
  Campania,
  CreateCampaniaRequest,
  UpdateCampaniaRequest
} from '@/modules/Marketing/Emailing/types/emailingTypes';
import * as emailingService from '@/modules/Marketing/Emailing/services/emailingService';
import type { Brand as DashboardBrand } from '@/modules/Marketing/Dashboard/types/marketingTypes';
import type { Brand as GestionBrand } from '@/modules/Marketing/GestionMarcas/types/brandTypes';
import { getBrandsByAccountService } from '@/modules/Marketing/GestionMarcas/services/brandServices';

// Función adaptadora para convertir marcas de Gestión a formato Dashboard
const adaptBrandToSelector = (gestionBrand: GestionBrand): DashboardBrand => ({
  id: gestionBrand.id.toString(), // Convertir number a string
  name: gestionBrand.nombreMarca   // Mapear nombreMarca a name
});

export const useEmailingStore = defineStore('emailing', {
  state: () => ({
    // Current account for multi-tenant filtering
    currentAccountId: null as string | null,
    
    // Brands for dynamic selection
    brands: [] as DashboardBrand[],
    isLoadingBrands: false,
    
    // Data entities - Plantillas
    plantillas: [] as Template[],
    currentPlantilla: null as Template | null,
    
    // Data entities - Listas y Contactos
    listas: [] as Lista[],
    currentLista: null as Lista | null,
    contactosCurrentLista: [] as Contacto[],
    
    // Data entities - Campañas
    campanias: [] as Campania[],
    
    // UI state
    isLoading: false,
    isLoadingContactos: false,
    currentError: null as string | null,
    
    // Modal state
    isNuevaPlantillaModalOpen: false,
    isEditPlantillaModalOpen: false,
    plantillaToEdit: null as Template | null,
  }),

  getters: {
    // Helpers
    hasError: (state) => !!state.currentError,
    totalPlantillas: (state) => state.plantillas.length,
  },

  actions: {
    // ============================================
    // BRANDS MANAGEMENT
    // ============================================
    async fetchBrands() {
      try {
        this.isLoadingBrands = true;
        this.currentError = null;
        
        // El backend obtiene el ID de cuenta desde los claims del token
        const response = await getBrandsByAccountService();
        
        if (response.success && response.data?.items) {
          // Convertir las marcas de Gestión al formato esperado
          this.brands = response.data.items.map(adaptBrandToSelector);
          
          // Auto-select first brand if none selected
          if (this.brands.length > 0 && !this.currentAccountId) {
            this.currentAccountId = this.brands[0].id;
          }
        } else {
          this.brands = [];
          this.currentError = response.message || 'No se pudieron cargar las marcas';
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching brands';
        this.brands = [];
        throw err;
      } finally {
        this.isLoadingBrands = false;
      }
    },

    // ============================================
    // ACCOUNT MANAGEMENT
    // ============================================
    setCurrentAccount(accountId: string) {
      this.currentAccountId = accountId;
    },

    // ============================================
    // PLANTILLAS
    // ============================================
    
    /**
     * Obtiene todas las plantillas de una marca
     */
    async fetchPlantillas() {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        return;
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        const response = await emailingService.getPlantillasByMarca(this.currentAccountId);

        if (response && response.success && response.data && Array.isArray(response.data.items)) {
          this.plantillas = response.data.items;
        } else {
          this.plantillas = []; // Asegurar que sea un array
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching plantillas';
        this.plantillas = []; // Asegurar que sea un array en caso de error
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTemplates() {
      return this.fetchPlantillas();
    },

    // ============================================
    // CAMPAIGNS
    // ============================================
    async fetchCampaigns() {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        return;
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        // TODO: Implementar servicio de campañas
        // const response = await emailingService.getCampaignsByMarca(this.currentAccountId);
        console.log('Fetching campaigns for brand:', this.currentAccountId);
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching campaigns';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ============================================
    // LISTS
    // ============================================
    async fetchLists() {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        return;
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        // TODO: Implementar servicio de listas
        // const response = await emailingService.getListsByMarca(this.currentAccountId);
        console.log('Fetching lists for brand:', this.currentAccountId);
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching lists';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Obtiene una plantilla por ID
     */
    async fetchPlantillaById(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        const response = await emailingService.getPlantillaById(id);
        // Guardar solo los datos en el store
        if (response.success && response.data) {
          this.currentPlantilla = response.data;
        }
        // Devolver la respuesta completa para que el componente pueda extraer .data
        return response;
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching plantilla';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Crea una nueva plantilla
     */
    async createPlantilla(data: CreateTemplateRequest) {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        throw new Error('No account selected');
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        const plantillaData = {
          ...data,
          idMarca: this.currentAccountId
        };
        const newPlantilla = await emailingService.createPlantillaService(plantillaData);
        
        if (!Array.isArray(this.plantillas)) {
          this.plantillas = [];
        }
        
        // Crear nuevo array para forzar reactividad
        this.plantillas = [...this.plantillas, newPlantilla];
        return newPlantilla;
      } catch (err: any) {
        this.currentError = err.message || 'Error creating plantilla';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Actualiza una plantilla existente
     */
    async updatePlantilla(id: string, data: UpdateTemplateRequest) {
      try {
        this.isLoading = true;
        this.currentError = null;
        const updated = await emailingService.updatePlantillaService(id, data);
        const index = this.plantillas.findIndex(p => p.id === id);
        if (index !== -1) {
          // Crear nuevo array para forzar reactividad
          this.plantillas = [
            ...this.plantillas.slice(0, index),
            updated,
            ...this.plantillas.slice(index + 1)
          ];
        }
        return updated;
      } catch (err: any) {
        this.currentError = err.message || 'Error updating plantilla';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Elimina una plantilla
     */
    async deletePlantilla(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        await emailingService.deletePlantillaService(id);
        this.plantillas = this.plantillas.filter(p => p.id !== id);
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting plantilla';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ============================================
    // UTILITY
    // ============================================
    clearError() {
      this.currentError = null;
    },

    clearCurrentPlantilla() {
      this.currentPlantilla = null;
    },

    resetStore() {
      this.brands = [];
      this.currentAccountId = null;
      this.isLoadingBrands = false;
      this.plantillas = [];
      this.currentPlantilla = null;
      this.isLoading = false;
      this.currentError = null;
    },

    // ============================================
    // MODAL MANAGEMENT
    // ============================================
    openNuevaPlantillaModal() {
      this.plantillaToEdit = null;
      this.isNuevaPlantillaModalOpen = true;
    },

    openEditPlantillaModal(plantilla: Template) {
      this.plantillaToEdit = plantilla;
      this.isEditPlantillaModalOpen = true;
    },

    closePlantillaModal() {
      this.isNuevaPlantillaModalOpen = false;
      this.isEditPlantillaModalOpen = false;
      this.plantillaToEdit = null;
    },

    // ============================================
    // LISTAS DE AUDIENCIA
    // ============================================
    
    /**
     * Obtiene todas las listas de una marca
     */
    async fetchListas() {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        return;
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        const response = await emailingService.getListasByMarca(this.currentAccountId);

        if (response && response.success && response.data && Array.isArray(response.data.items)) {
          this.listas = response.data.items;
        } else {
          this.listas = [];
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching listas';
        this.listas = [];
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Crea una nueva lista de audiencia
     */
    async createLista(data: { nombreLista: string; descripcion?: string }) {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        throw new Error('No account selected');
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        
        // Transformar a PascalCase para el backend
        const listaData: CreateListaRequest = {
          NombreLista: data.nombreLista,
          Descripcion: data.descripcion,
          IdMarca: this.currentAccountId
        };
        
        const newLista = await emailingService.createListaService(listaData);
        
        if (!Array.isArray(this.listas)) {
          this.listas = [];
        }
        
        this.listas = [...this.listas, newLista];
        return newLista;
      } catch (err: any) {
        this.currentError = err.message || 'Error creating lista';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Elimina una lista
     */
    async deleteLista(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        await emailingService.deleteListaService(id);
        this.listas = this.listas.filter(l => l.id.toString() !== id);
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting lista';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Establece la lista actual para ver contactos
     */
    setCurrentLista(lista: Lista | null) {
      this.currentLista = lista;
      if (!lista) {
        this.contactosCurrentLista = [];
      }
    },

    // ============================================
    // CONTACTOS
    // ============================================
    
    /**
     * Obtiene los contactos de una lista
     */
    async fetchContactos(idLista: string) {
      try {
        this.isLoadingContactos = true;
        this.currentError = null;
        const response = await emailingService.getContactosByLista(idLista);

        if (response && response.success && response.data && Array.isArray(response.data.items)) {
          this.contactosCurrentLista = response.data.items;
        } else {
          this.contactosCurrentLista = [];
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching contactos';
        this.contactosCurrentLista = [];
        throw err;
      } finally {
        this.isLoadingContactos = false;
      }
    },

    /**
     * Agrega un contacto a una lista
     */
    async addContacto(idLista: string, data: CreateContactoRequest) {
      try {
        this.isLoadingContactos = true;
        this.currentError = null;
        const newContacto = await emailingService.addContactoService(idLista, data);
        
        if (!Array.isArray(this.contactosCurrentLista)) {
          this.contactosCurrentLista = [];
        }
        
        this.contactosCurrentLista = [...this.contactosCurrentLista, newContacto];
        return newContacto;
      } catch (err: any) {
        this.currentError = err.message || 'Error adding contacto';
        throw err;
      } finally {
        this.isLoadingContactos = false;
      }
    },

    /**
     * Importación masiva de contactos
     */
    async importContactos(idLista: string, contactos: CreateContactoRequest[]) {
      try {
        this.isLoadingContactos = true;
        this.currentError = null;
        const bulkData: BulkContactosRequest = { contactos };
        const response = await emailingService.addContactosBulkService(idLista, bulkData);
        
        // Recargar contactos después de la importación masiva
        await this.fetchContactos(idLista);
        
        return response;
      } catch (err: any) {
        this.currentError = err.message || 'Error importing contactos';
        throw err;
      } finally {
        this.isLoadingContactos = false;
      }
    },

    /**
     * Elimina un contacto de una lista específica
     */
    async deleteContacto(idLista: string, idContacto: string) {
      try {
        this.isLoadingContactos = true;
        this.currentError = null;
        await emailingService.deleteContactoService(idLista, idContacto);
        this.contactosCurrentLista = this.contactosCurrentLista.filter(c => c.id.toString() !== idContacto);
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting contacto';
        throw err;
      } finally {
        this.isLoadingContactos = false;
      }
    },

    // ============================================
    // CAMPAÑAS
    // ============================================
    
    /**
     * Obtiene todas las campañas de una marca
     */
    async fetchCampanias() {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        return;
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        const response = await emailingService.getCampaniasByMarca(this.currentAccountId);

        if (response && response.success && response.data && Array.isArray(response.data.items)) {
          this.campanias = response.data.items;
        } else {
          this.campanias = [];
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error fetching campanias';
        this.campanias = [];
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Crea una nueva campaña
     */
    async createCampania(data: {
      titulo: string;
      asunto: string;
      idPlantilla: string | number;
      idLista: string | number;
      esBorrador: boolean;
      fechaProgramada?: string;
    }) {
      if (!this.currentAccountId) {
        this.currentError = 'No account selected';
        throw new Error('No account selected');
      }
      
      try {
        this.isLoading = true;
        this.currentError = null;
        
        // Transformar a PascalCase para el backend
        const campaniaData: CreateCampaniaRequest = {
          Titulo: data.titulo,
          Asunto: data.asunto,
          IdPlantilla: data.idPlantilla,
          IdLista: data.idLista,
          IdMarca: this.currentAccountId,
          EsBorrador: data.esBorrador,
          FechaProgramada: data.fechaProgramada
        };
        
        const newCampania = await emailingService.createCampaniaService(campaniaData);
        
        if (!Array.isArray(this.campanias)) {
          this.campanias = [];
        }
        
        this.campanias = [...this.campanias, newCampania];
        return newCampania;
      } catch (err: any) {
        this.currentError = err.message || 'Error creating campania';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Elimina una campaña
     */
    async deleteCampania(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        await emailingService.deleteCampaniaService(id);
        this.campanias = this.campanias.filter(c => c.id.toString() !== id);
      } catch (err: any) {
        this.currentError = err.message || 'Error deleting campania';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Actualiza una campaña existente
     */
    async updateCampania(id: string, data: UpdateCampaniaRequest) {
      try {
        this.isLoading = true;
        this.currentError = null;
        
        // Transformar datos a formato PascalCase para el backend
        const campaniaData: UpdateCampaniaRequest = {
          Titulo: data.Titulo,
          Asunto: data.Asunto,
          IdPlantilla: data.IdPlantilla,
          IdLista: data.IdLista
        };
        
        const updatedCampania = await emailingService.updateCampaniaService(id, campaniaData);
        
        // Actualizar la campaña en el array local
        const index = this.campanias.findIndex(c => c.id.toString() === id);
        if (index !== -1) {
          this.campanias[index] = { ...this.campanias[index], ...updatedCampania };
        }
        
        return updatedCampania;
      } catch (err: any) {
        this.currentError = err.message || 'Error updating campania';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Envía una campaña inmediatamente
     */
    async sendCampania(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        
        const sentCampania = await emailingService.sendCampaniaService(id);
        
        // Actualizar la campaña en el array local
        const index = this.campanias.findIndex(c => c.id.toString() === id);
        if (index !== -1) {
          this.campanias[index] = { ...this.campanias[index], ...sentCampania };
        }
        
        return sentCampania;
      } catch (err: any) {
        this.currentError = err.message || 'Error sending campania';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Envía una campaña inmediatamente
     */
    async enviarCampania(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;
        
        const sentCampania = await emailingService.enviarCampaniaNowService(id);
        
        // Actualizar la campaña en el array local
        const index = this.campanias.findIndex((c: Campania) => c.id.toString() === id);
        if (index !== -1) {
          this.campanias[index] = { ...this.campanias[index], ...sentCampania };
        }
        
        // Mostrar alerta de éxito
        alert('Campaña enviada exitosamente. Los correos están siendo procesados.');
        
        // Recargar campañias para actualizar estados
        await this.fetchCampanias();
        
        return sentCampania;
      } catch (err: any) {
        this.currentError = err.message || 'Error sending campania';
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
