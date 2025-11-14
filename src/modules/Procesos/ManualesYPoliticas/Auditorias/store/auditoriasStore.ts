import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    IFormulario,
    IAuditoria,
    IAuditoriasState
} from '../types/auditorias.types'

export const useAuditoriasStore = defineStore('auditoriasStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const dniProc = ref<number | null>(null)
    const dniForm = ref<number | null>(null)
    const dniAu = ref<number | null>(null)
    const formularios = ref<IFormulario[]>([])
    const auditorias = ref<IAuditoria[]>([])
    const mejoropcion = ref(false)
    const isLoading = ref(false)

    // ============================================
    // GETTERS
    // ============================================

    const formularioSeleccionado = computed(() => {
        if (!dniForm.value) return null
        return formularios.value.find(f => f.dni === dniForm.value) || null
    })

    const auditoriasOrdenadas = computed(() => {
        return [...auditorias.value].sort((a, b) => {
            return b.calificacion - a.calificacion
        })
    })

    const mejorAuditoria = computed(() => {
        return auditorias.value.find(a => a.mejor) || null
    })

    const auditoriasActivas = computed(() => {
        return auditorias.value.filter(a => a.fechaFin === null)
    })

    const auditoriasFinalizadas = computed(() => {
        return auditorias.value.filter(a => a.fechaFin !== null)
    })

    const promedioGeneral = computed(() => {
        if (auditorias.value.length === 0) return 0
        const suma = auditorias.value.reduce((acc, a) => acc + a.calificacion, 0)
        return Math.round((suma / auditorias.value.length) * 100) / 100
    })

    const hayDatos = computed(() => {
        return dniProc.value !== null && dniForm.value !== null
    })

    // ============================================
    // ACTIONS
    // ============================================

    const setDniProc = (dni: number | null) => {
        dniProc.value = dni
    }

    const setDniForm = (dni: number | null) => {
        dniForm.value = dni
    }

    const setDniAu = (dni: number | null) => {
        dniAu.value = dni
    }

    const setFormularios = (forms: IFormulario[]) => {
        formularios.value = forms
    }

    const setAuditorias = (auds: IAuditoria[]) => {
        auditorias.value = JSON.parse(JSON.stringify(auds))
    }

    const setMejoropcion = (mejor: boolean) => {
        mejoropcion.value = mejor
    }

    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const agregarAuditoria = (auditoria: IAuditoria) => {
        auditorias.value.push(JSON.parse(JSON.stringify(auditoria)))
    }

    const updateAuditoria = (dni: number, updates: Partial<IAuditoria>) => {
        const auditoria = auditorias.value.find(a => a.dni === dni)
        if (auditoria) {
            Object.assign(auditoria, updates)
        }
    }

    const updateSubdominio = (
        dniAud: number,
        dniDom: number,
        dniSub: number,
        updates: any
    ) => {
        const auditoria = auditorias.value.find(a => a.dni === dniAud)
        if (!auditoria) return

        const dominio = auditoria.Dominios.find(d => d.dni === dniDom)
        if (!dominio) return

        const subdominio = dominio.Subdominios.find(s => s.dni === dniSub)
        if (!subdominio) return

        Object.assign(subdominio, updates)
    }

    const toggleAccordion = (dni: number) => {
        const auditoria = auditorias.value.find(a => a.dni === dni)
        if (auditoria) {
            auditoria.show = !auditoria.show
        }
    }

    const abrirAuditoria = (dni: number) => {
        const auditoria = auditorias.value.find(a => a.dni === dni)
        if (auditoria) {
            auditoria.show = true
        }
    }

    const reset = () => {
        dniProc.value = null
        dniForm.value = null
        dniAu.value = null
        auditorias.value = []
        mejoropcion.value = false
    }

    return {
        // State
        dniProc,
        dniForm,
        dniAu,
        formularios,
        auditorias,
        mejoropcion,
        isLoading,

        // Getters
        formularioSeleccionado,
        auditoriasOrdenadas,
        mejorAuditoria,
        auditoriasActivas,
        auditoriasFinalizadas,
        promedioGeneral,
        hayDatos,

        // Actions
        setDniProc,
        setDniForm,
        setDniAu,
        setFormularios,
        setAuditorias,
        setMejoropcion,
        setLoading,
        agregarAuditoria,
        updateAuditoria,
        updateSubdominio,
        toggleAccordion,
        abrirAuditoria,
        reset
    }
})
