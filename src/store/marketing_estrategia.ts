/**
 * Store de Pinia para Estrategia de Campañas y Gestión de Proyectos
 */

import { defineStore } from 'pinia';
import type {
  CreateCampaniaRequest,
  UpdateCampaniaRequest,
  CreateTareaRequest,
  UpdateTareaRequest,
  MarketingEstrategiaState
} from '@/modules/Marketing/EstrategiaCampanias/types/estrategiaTypes';
import * as marketingService from '@/modules/Marketing/EstrategiaCampanias/services/marketingService';

export const useMarketingEstrategiaStore = defineStore('marketingEstrategia', {
  state: (): MarketingEstrategiaState => ({
    campanias: [],
    currentCampania: null,
    proyectos: [],
    currentProyecto: null,
    kanbanBoard: null,
    metricas: null,
    isLoading: false,
    currentError: null,
    currentAccountId: '' // Se puede inicializar desde localStorage o desde otro store
  }),

  getters: {
    /**
     * Filtra campañas por estado
     */
    campaniasByEstado: (state) => (estado: string) => {
      return state.campanias.filter(c => c.estado === estado);
    },

    /**
     * Obtiene campañas activas
     */
    campaniasActivas: (state) => {
      return state.campanias.filter(c => c.estado === 'activa');
    },

    /**
     * Verifica si hay un proyecto cargado
     */
    hasProyecto: (state) => {
      return state.currentProyecto !== null;
    },

    /**
     * Obtiene las columnas del Kanban
     */
    kanbanColumnas: (state) => {
      return state.kanbanBoard?.columnas || [];
    }
  },

  actions: {
    /**
     * Establece la marca actual (accountId)
     */
    setCurrentAccount(accountId: string) {
      this.currentAccountId = accountId;
    },

    /**
     * Obtiene todas las campañas de la marca actual
     */
    async fetchCampanias() {
      if (!this.currentAccountId) {
        console.warn('No hay marca seleccionada');
        return;
      }

      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.getCampaniasByMarca(this.currentAccountId);
        
        if (response.success) {
          this.campanias = response.data;
        } else {
          this.currentError = response.message;
          this.campanias = [];
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al cargar campañas';
        this.campanias = [];
        console.error('Error fetching campañas:', err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Obtiene todos los proyectos de la marca actual
     */
    async fetchProyectos() {
      if (!this.currentAccountId) {
        console.warn('No hay marca seleccionada');
        return;
      }

      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.getProyectosByMarca(this.currentAccountId);
        
        if (response.success) {
          this.proyectos = response.data;
        } else {
          this.currentError = response.message;
          this.proyectos = [];
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al cargar proyectos';
        this.proyectos = [];
        console.error('Error fetching proyectos:', err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Crea una nueva campaña
     */
    async createCampania(data: Omit<CreateCampaniaRequest, 'IdMarca'>) {
      try {
        this.isLoading = true;
        this.currentError = null;

        // Agregar IdMarca del estado actual
        const campaniaData: CreateCampaniaRequest = {
          ...data,
          IdMarca: this.currentAccountId
        };

        const response = await marketingService.createCampania(campaniaData);
        
        if (response.success && response.data) {
          // Agregar la nueva campaña al array
          this.campanias.push(response.data);
          return response.data;
        } else {
          throw new Error(response.message || 'Error al crear campaña');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al crear campaña';
        console.error('Error creating campaña:', err);
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

        const response = await marketingService.updateCampania(id, data);
        
        if (response.success && response.data) {
          // Actualizar en el array local
          const index = this.campanias.findIndex(c => c.id.toString() === id);
          if (index !== -1) {
            this.campanias[index] = { ...this.campanias[index], ...response.data };
          }
          return response.data;
        } else {
          throw new Error(response.message || 'Error al actualizar campaña');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al actualizar campaña';
        console.error('Error updating campaña:', err);
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

        const response = await marketingService.deleteCampania(id);
        
        if (response.success) {
          // Eliminar del array local
          this.campanias = this.campanias.filter(c => c.id.toString() !== id);
        } else {
          throw new Error(response.message || 'Error al eliminar campaña');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al eliminar campaña';
        console.error('Error deleting campaña:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Obtiene las métricas de una campaña
     */
    async fetchMetricasCampania(id: string) {
      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.getMetricasCampania(id);
        
        if (response.success && response.data) {
          this.metricas = response.data;
          return response.data;
        } else {
          throw new Error(response.message || 'Error al cargar métricas');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al cargar métricas';
        console.error('Error fetching métricas:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Obtiene el tablero Kanban de un proyecto
     */
    async fetchKanbanBoard(proyectoId: string) {
      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.getKanbanBoard(proyectoId);
        
        if (response.success && response.data) {
          this.kanbanBoard = response.data;
          this.currentProyecto = response.data.proyecto;
          return response.data;
        } else {
          throw new Error(response.message || 'Error al cargar tablero Kanban');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al cargar tablero Kanban';
        this.kanbanBoard = null;
        console.error('Error fetching kanban:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Crea una nueva tarea en el proyecto actual
     */
    async createTarea(proyectoId: string, data: CreateTareaRequest) {
      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.createTarea(proyectoId, data);
        
        if (response.success && response.data) {
          // Agregar la tarea a la columna correspondiente
          if (this.kanbanBoard) {
            const columna = this.kanbanBoard.columnas.find(col => col.estado === data.Estado);
            if (columna) {
              columna.tareas.push(response.data);
            }
          }
          return response.data;
        } else {
          throw new Error(response.message || 'Error al crear tarea');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al crear tarea';
        console.error('Error creating tarea:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Actualiza una tarea (optimistic update para drag & drop)
     */
    async updateTareaStatus(tareaId: string, nuevoEstado: string, orden?: number) {
      try {
        // Optimistic update: Actualizar UI inmediatamente
        if (this.kanbanBoard) {
          // Encontrar y remover la tarea de su columna actual
          let tareaMovida = null;
          for (const columna of this.kanbanBoard.columnas) {
            const index = columna.tareas.findIndex(t => t.id.toString() === tareaId);
            if (index !== -1) {
              tareaMovida = columna.tareas.splice(index, 1)[0];
              break;
            }
          }

          // Agregar la tarea a la nueva columna
          if (tareaMovida) {
            tareaMovida.estado = nuevoEstado;
            if (orden !== undefined) {
              tareaMovida.orden = orden;
            }

            const nuevaColumna = this.kanbanBoard.columnas.find(col => col.estado === nuevoEstado);
            if (nuevaColumna) {
              nuevaColumna.tareas.push(tareaMovida);
              // Ordenar tareas por orden
              nuevaColumna.tareas.sort((a, b) => a.orden - b.orden);
            }
          }
        }

        // Llamada al backend
        const updateData: UpdateTareaRequest = {
          Estado: nuevoEstado,
          Orden: orden
        };

        const response = await marketingService.updateTarea(tareaId, updateData);
        
        if (!response.success) {
          // Si falla, recargar el tablero para revertir el optimistic update
          if (this.currentProyecto) {
            await this.fetchKanbanBoard(this.currentProyecto.id.toString());
          }
          throw new Error(response.message || 'Error al actualizar tarea');
        }

        return response.data;
      } catch (err: any) {
        this.currentError = err.message || 'Error al actualizar tarea';
        console.error('Error updating tarea:', err);
        
        // Recargar tablero en caso de error
        if (this.currentProyecto) {
          await this.fetchKanbanBoard(this.currentProyecto.id.toString());
        }
        
        throw err;
      }
    },

    /**
     * Elimina una tarea
     */
    async deleteTarea(tareaId: string) {
      try {
        this.isLoading = true;
        this.currentError = null;

        const response = await marketingService.deleteTarea(tareaId);
        
        if (response.success) {
          // Eliminar la tarea del kanban local
          if (this.kanbanBoard) {
            for (const columna of this.kanbanBoard.columnas) {
              columna.tareas = columna.tareas.filter(t => t.id.toString() !== tareaId);
            }
          }
        } else {
          throw new Error(response.message || 'Error al eliminar tarea');
        }
      } catch (err: any) {
        this.currentError = err.message || 'Error al eliminar tarea';
        console.error('Error deleting tarea:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Limpia el estado actual
     */
    clearState() {
      this.campanias = [];
      this.currentCampania = null;
      this.proyectos = [];
      this.currentProyecto = null;
      this.kanbanBoard = null;
      this.metricas = null;
      this.currentError = null;
    }
  }
});
