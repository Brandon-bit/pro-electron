import { defineStore } from 'pinia'
import { edtService } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/services/edtService'
import { convertirEDTResponseAArbol } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/mappingEDTData'
import type {
    EDTNodeType,
    EDTResponseType,
    InitiativeOptionType,
    SelectedStageType,
    SelectedActivityType,
    SelectedSubActivityType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

const useEDTStore = defineStore('edt-store', {
    state: () => ({
        // Initiatives
        initiativesOptions: [] as InitiativeOptionType[],
        selectedInitiative: null as InitiativeOptionType | null,
        
        // EDT Data
        edtRoot: null as EDTNodeType | null,
        edtRawData: null as EDTResponseType | null,
        
        // Loading & Error
        isLoading: false,
        error: null as string | null,
        
        // Selected items for modals
        selectedStage: null as SelectedStageType | null,
        selectedActivity: null as SelectedActivityType | null,
        selectedSubActivity: null as SelectedSubActivityType | null,
        
        // Modal IDs
        stageModalId: 'stage-modal',
        activityModalId: 'activity-modal',
        subactivityModalId: 'subactivity-modal',
        
        // Parent context for adding new items
        parentContext: null as { id: string; dni: number; type: 'initiative' | 'stage' | 'activity' } | null
    }),
    actions: {
        // ============================================
        // LOAD DATA
        // ============================================
        async loadInitiativeOptions() {
            try {
                this.isLoading = true
                this.error = null
                const response = await edtService.getInitiativesOptionsService()
                if (response.success) {
                    this.initiativesOptions = response.data
                }
            } catch (error: any) {
                this.error = error.message || 'Error al cargar iniciativas'
                console.error('Error al cargar iniciativas:', error)
            } finally {
                this.isLoading = false
            }
        },

        async loadEDT(dniInitiative: number) {
            try {
                this.isLoading = true
                this.error = null
                const response = await edtService.getEDTService(dniInitiative)
                if (response.success) {
                    this.edtRawData = response.data
                    this.edtRoot = convertirEDTResponseAArbol(response.data)
                    this.selectedInitiative = this.initiativesOptions.find(i => i.dni === dniInitiative) || null
                }
            } catch (error: any) {
                this.error = error.message || 'Error al cargar EDT'
                console.error('Error al cargar EDT:', error)
            } finally {
                this.isLoading = false
            }
        },

        // ============================================
        // STAGES
        // ============================================
        setStage(stage?: SelectedStageType) {
            this.selectedStage = stage || null
        },
        
        clearStage() {
            this.selectedStage = null
            this.parentContext = null
        },

        async addStage(data: { name: string; psn: number; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.addStageService({
                    dniIniciativa: this.selectedInitiative.dni,
                    nombre: data.name,
                    psn: data.psn,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al agregar etapa'
                console.error('Error al agregar etapa:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async putStage(dni: number, data: { name: string; psn: number; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.putStageService({
                    dni,
                    dniIniciativa: this.selectedInitiative.dni,
                    nombre: data.name,
                    psn: data.psn,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al actualizar etapa'
                console.error('Error al actualizar etapa:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async deleteStage(dni: number) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.deleteStageService(dni)

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al eliminar etapa'
                console.error('Error al eliminar etapa:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        // ============================================
        // ACTIVITIES
        // ============================================
        setActivity(activity?: SelectedActivityType) {
            this.selectedActivity = activity || null
        },
        
        clearActivity() {
            this.selectedActivity = null
            this.parentContext = null
        },

        async addActivity(dniStage: number, data: { name: string; psn: number; days: number; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.addActivityService({
                    dniIniciativaEtapa: dniStage,
                    nombre: data.name,
                    psn: data.psn,
                    dias: data.days,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al agregar actividad'
                console.error('Error al agregar actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async putActivity(dni: number, dniStage: number, data: { name: string; psn: number; days: number; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.putActivityService({
                    dni,
                    dniIniciativaEtapa: dniStage,
                    nombre: data.name,
                    psn: data.psn,
                    dias: data.days,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al actualizar actividad'
                console.error('Error al actualizar actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async deleteActivity(dni: number) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.deleteActivityService(dni)

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al eliminar actividad'
                console.error('Error al eliminar actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        // ============================================
        // SUB-ACTIVITIES
        // ============================================
        setSubActivity(subActivity?: SelectedSubActivityType) {
            this.selectedSubActivity = subActivity || null
        },
        
        clearSubActivity() {
            this.selectedSubActivity = null
            this.parentContext = null
        },

        async addSubActivity(dniActivity: number, data: { name: string; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.addSubActivityService({
                    dniIniciativaActividad: dniActivity,
                    nombre: data.name,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al agregar sub-actividad'
                console.error('Error al agregar sub-actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async putSubActivity(dni: number, dniActivity: number, data: { name: string; active: boolean }) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.putSubActivityService({
                    dni,
                    dniIniciativaActividad: dniActivity,
                    nombre: data.name,
                    activo: data.active
                })

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al actualizar sub-actividad'
                console.error('Error al actualizar sub-actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        },

        async deleteSubActivity(dni: number) {
            if (!this.selectedInitiative) return false

            try {
                this.isLoading = true
                const response = await edtService.deleteSubActivityService(dni)

                if (response.success) {
                    await this.loadEDT(this.selectedInitiative.dni)
                    return true
                }
                return false
            } catch (error: any) {
                this.error = error.message || 'Error al eliminar sub-actividad'
                console.error('Error al eliminar sub-actividad:', error)
                return false
            } finally {
                this.isLoading = false
            }
        }
    }
})

export default useEDTStore
