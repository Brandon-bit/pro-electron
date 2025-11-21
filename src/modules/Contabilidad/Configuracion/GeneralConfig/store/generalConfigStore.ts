import { defineStore } from 'pinia'
import type { GeneralConfigFormDTO, CompanyType, GeneralConfigDTO } from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'

interface GeneralConfigState {
    currentConfig: GeneralConfigDTO | null
    companyType: CompanyType
    isLoading: boolean
}

const useGeneralConfigStore = defineStore('generalConfig', {
    state: (): GeneralConfigState => ({
        currentConfig: null,
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
        },

        /**
         * Obtiene la configuración actual completa
         */
        getConfig(): GeneralConfigDTO | null {
            return this.currentConfig
        }
    },

    actions: {
        /**
         * Establece la configuración actual completa
         */
        setConfig(config: GeneralConfigDTO) {
            this.currentConfig = config
            this.companyType = config.companyType
            console.log('📋 Configuración actualizada en store:', config)
        },

        /**
         * Establece el tipo de empresa globalmente
         */
        setCompanyType(type: CompanyType) {
            this.companyType = type
            if (this.currentConfig) {
                this.currentConfig.companyType = type
            }
            console.log('🏢 Tipo de empresa actualizado:', type)
        },

        /**
         * Resetea la configuración a valores por defecto
         */
        resetConfig() {
            this.currentConfig = null
            this.companyType = 'tradicional'
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
