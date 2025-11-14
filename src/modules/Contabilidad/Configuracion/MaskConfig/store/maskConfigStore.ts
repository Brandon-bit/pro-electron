import { defineStore } from 'pinia'
import type { MaskConfiguration, MaskSegment } from '@contabilidad/Configuracion/MaskConfig/types/maskConfigTypes'

interface MaskConfigState {
    currentConfig: MaskConfiguration
    isLoading: boolean
}

// Configuración por defecto de la máscara contable
const DEFAULT_CONFIG: MaskConfiguration = {
    format: '0000-00-00-00-00-00',
    separator: '-',
    maxDepth: 6,
    allowFlexibleLength: false,
    segments: [
        { 
            id: '1', 
            name: 'Grupo', 
            digits: 4, 
            minDigits: 1, 
            maxDigits: 6, 
            charType: 'numeric', 
            required: true, 
            description: 'Código de grupo principal (Activo, Pasivo, Capital)', 
            placeholder: '1000' 
        },
        { 
            id: '2', 
            name: 'Subgrupo', 
            digits: 2, 
            minDigits: 1, 
            maxDigits: 4, 
            charType: 'numeric', 
            required: true, 
            description: 'Código de subgrupo (Circulante, Fijo)', 
            placeholder: '01' 
        },
        { 
            id: '3', 
            name: 'Mayor', 
            digits: 2, 
            minDigits: 1, 
            maxDigits: 4, 
            charType: 'numeric', 
            required: true, 
            description: 'Código de cuenta mayor (Bancos, Clientes)', 
            placeholder: '01' 
        },
        { 
            id: '4', 
            name: 'Subcuenta', 
            digits: 2, 
            minDigits: 1, 
            maxDigits: 4, 
            charType: 'numeric', 
            required: false, 
            description: 'Código de subcuenta (Banco específico)', 
            placeholder: '01' 
        },
        { 
            id: '5', 
            name: 'Auxiliar', 
            digits: 2, 
            minDigits: 1, 
            maxDigits: 4, 
            charType: 'numeric', 
            required: false, 
            description: 'Código auxiliar (Departamento, Proyecto)', 
            placeholder: '01' 
        },
        { 
            id: '6', 
            name: 'Subauxiliar', 
            digits: 2, 
            minDigits: 1, 
            maxDigits: 4, 
            charType: 'numeric', 
            required: false, 
            description: 'Código subauxiliar (Sub-departamento)', 
            placeholder: '01' 
        }
    ]
}

const useMaskConfigStore = defineStore('maskConfig', {
    state: (): MaskConfigState => ({
        currentConfig: { ...DEFAULT_CONFIG, segments: [...DEFAULT_CONFIG.segments] },
        isLoading: false
    }),

    getters: {
        /**
         * Obtiene el formato de la máscara actual
         */
        getMaskFormat(): string {
            return this.currentConfig.format
        },

        /**
         * Obtiene el separador actual
         */
        getSeparator(): string {
            return this.currentConfig.separator
        },

        /**
         * Obtiene los segmentos de la máscara
         */
        getSegments(): MaskSegment[] {
            return this.currentConfig.segments
        },

        /**
         * Obtiene la profundidad máxima
         */
        getMaxDepth(): number {
            return this.currentConfig.maxDepth
        }
    },

    actions: {
        /**
         * Establece la configuración completa de la máscara
         */
        setConfig(config: MaskConfiguration) {
            this.currentConfig = { ...config, segments: [...config.segments] }
        },

        /**
         * Actualiza solo el formato
         */
        setFormat(format: string) {
            this.currentConfig.format = format
        },

        /**
         * Actualiza solo el separador
         */
        setSeparator(separator: string) {
            this.currentConfig.separator = separator
        },

        /**
         * Actualiza los segmentos
         */
        setSegments(segments: MaskSegment[]) {
            this.currentConfig.segments = [...segments]
        },

        /**
         * Actualiza la profundidad máxima
         */
        setMaxDepth(maxDepth: number) {
            this.currentConfig.maxDepth = maxDepth
        },

        /**
         * Resetea a configuración por defecto
         */
        resetConfig() {
            this.currentConfig = { ...DEFAULT_CONFIG, segments: [...DEFAULT_CONFIG.segments] }
        },

        /**
         * Establece el estado de carga
         */
        setLoading(loading: boolean) {
            this.isLoading = loading
        }
    }
})

export default useMaskConfigStore
