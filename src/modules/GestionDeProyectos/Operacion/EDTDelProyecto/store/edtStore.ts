import { defineStore } from 'pinia'
import { edtService } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/services/edtService'
import { convertirEDTResponseAArbol } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/mappingEDTData'
import type {
    EDTNodeType,
    EDTResponseType,
    IniciativaOpcionType,
    SelectedEtapaType,
    SelectedActividadType,
    SelectedSubActividadType
} from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

const useEDTStore = defineStore('edt-store', {
    state: () => ({
        // Iniciativas
        iniciativasOpciones: [] as IniciativaOpcionType[],
        selectedIniciativa: null as IniciativaOpcionType | null,
        
        // EDT Data
        edtRoot: null as EDTNodeType | null,
        edtRawData: null as EDTResponseType | null,
        
        // Loading & Error
        isLoading: false,
        error: null as string | null,
        
        // Selected items for modals
        selectedEtapa: null as SelectedEtapaType | null,
        selectedActividad: null as SelectedActividadType | null,
        selectedSubActividad: null as SelectedSubActividadType | null,
        
        // Modal IDs
        etapaModalId: 'etapa-modal',
        actividadModalId: 'actividad-modal',
        subactividadModalId: 'subactividad-modal',
        
        // Parent context for adding new items
        parentContext: null as { id: string; dni: number; type: 'iniciativa' | 'etapa' | 'actividad' } | null
    }),
    actions: {
        // ============================================
        // LOAD DATA
        // ============================================
        async cargarIniciativasOpciones() {
            try {
                this.isLoading = true
                this.error = null
                const response = await edtService.getIniciativasOpciones()
                if (response.success) {
                    this.iniciativasOpciones = response.data
                }
            } catch (error: any) {
                this.error = error.message || 'Error al cargar iniciativas'
                console.error('Error al cargar iniciativas:', error)
            } finally {
                this.isLoading = false
            }
        },

        async cargarEDT(dniIniciativa: number) {
            try {
                this.isLoading = true
                this.error = null
                const response = await edtService.getEDT(dniIniciativa)
                if (response.success) {
                    this.edtRawData = response.data
                    this.edtRoot = convertirEDTResponseAArbol(response.data)
                    this.selectedIniciativa = this.iniciativasOpciones.find(i => i.dni === dniIniciativa) || null
                }
            } catch (error: any) {
                this.error = error.message || 'Error al cargar EDT'
                console.error('Error al cargar EDT:', error)
            } finally {
                this.isLoading = false
            }
        },

        // ============================================
        // ETAPAS
        // ============================================
        setEtapa(etapa?: SelectedEtapaType) {
            this.selectedEtapa = etapa || null
        },
        
        clearEtapa() {
            this.selectedEtapa = null
            this.parentContext = null
        },

        async agregarEtapa(data: { nombre: string; psn: number; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.agregarEtapa({
                    dniIniciativa: this.selectedIniciativa.dni,
                    nombre: data.nombre,
                    psn: data.psn,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async actualizarEtapa(dni: number, data: { nombre: string; psn: number; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.actualizarEtapa({
                    dni,
                    dniIniciativa: this.selectedIniciativa.dni,
                    nombre: data.nombre,
                    psn: data.psn,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async eliminarEtapa(dni: number) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.eliminarEtapa(dni)

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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
        // ACTIVIDADES
        // ============================================
        setActividad(actividad?: SelectedActividadType) {
            this.selectedActividad = actividad || null
        },
        
        clearActividad() {
            this.selectedActividad = null
            this.parentContext = null
        },

        async agregarActividad(dniEtapa: number, data: { nombre: string; psn: number; dias: number; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.agregarActividad({
                    dniIniciativaEtapa: dniEtapa,
                    nombre: data.nombre,
                    psn: data.psn,
                    dias: data.dias,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async actualizarActividad(dni: number, dniEtapa: number, data: { nombre: string; psn: number; dias: number; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.actualizarActividad({
                    dni,
                    dniIniciativaEtapa: dniEtapa,
                    nombre: data.nombre,
                    psn: data.psn,
                    dias: data.dias,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async eliminarActividad(dni: number) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.eliminarActividad(dni)

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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
        // SUB-ACTIVIDADES
        // ============================================
        setSubActividad(subActividad?: SelectedSubActividadType) {
            this.selectedSubActividad = subActividad || null
        },
        
        clearSubActividad() {
            this.selectedSubActividad = null
            this.parentContext = null
        },

        async agregarSubActividad(dniActividad: number, data: { nombre: string; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.agregarSubActividad({
                    dniIniciativaActividad: dniActividad,
                    nombre: data.nombre,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async actualizarSubActividad(dni: number, dniActividad: number, data: { nombre: string; activo: boolean }) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.actualizarSubActividad({
                    dni,
                    dniIniciativaActividad: dniActividad,
                    nombre: data.nombre,
                    activo: data.activo
                })

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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

        async eliminarSubActividad(dni: number) {
            if (!this.selectedIniciativa) return false

            try {
                this.isLoading = true
                const response = await edtService.eliminarSubActividad(dni)

                if (response.success) {
                    await this.cargarEDT(this.selectedIniciativa.dni)
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
