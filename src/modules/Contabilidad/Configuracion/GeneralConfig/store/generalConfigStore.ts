import { defineStore } from 'pinia'
import type { GeneralConfigFormDTO, CompanyType } from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'

interface GeneralConfigState {
    currentConfig: GeneralConfigFormDTO
    companyType: CompanyType
    isLoading: boolean
}

const useGeneralConfigStore = defineStore('generalConfig', {
    state: (): GeneralConfigState => ({
        currentConfig: {
            companyType: 'tradicional',
            description: '',
            active: true
        },
        companyType: 'tradicional', // Default: empresa tradicional
        isLoading: false
    }),

    getters: {
        /**
         * Obtiene el tipo de empresa actual
         */
        getCompanyType(): CompanyType {
            return this.companyType
        },

        /**
         * Verifica si la empresa es financiera
         */
        isFinancialCompany(): boolean {
            return this.companyType === 'financiera'
        },

        /**
         * Verifica si la empresa es tradicional
         */
        isTraditionalCompany(): boolean {
            return this.companyType === 'tradicional'
        }
    },

    actions: {
        /**
         * Establece la configuración actual
         */
        setConfig(config: Partial<GeneralConfigFormDTO> = {}) {
            this.currentConfig = {
                companyType: config.companyType || 'tradicional',
                description: config.description || '',
                active: config.active ?? true
            }
        },

        /**
         * Establece el tipo de empresa globalmente
         */
        setCompanyType(type: CompanyType) {
            this.companyType = type
            this.currentConfig.companyType = type
        },

        /**
         * Resetea la configuración a valores por defecto
         */
        resetConfig() {
            this.currentConfig = {
                companyType: 'tradicional',
                description: '',
                active: true
            }
        },

        /**
         * Establece el estado de carga
         */
        setLoading(loading: boolean) {
            this.isLoading = loading
        }
    }
})

export default useGeneralConfigStore
