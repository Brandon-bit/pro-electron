import type { 
    GeneralConfigDTO, 
    GeneralConfigFormDTO,
    GeneralConfigResponse 
} from '@contabilidad/Configuracion/GeneralConfig/types/generalConfigTypes'
import { 
    mapGeneralConfigResponseToDTO,
    mapGeneralConfigDTOToRequest 
} from '@contabilidad/Configuracion/GeneralConfig/composables/mappingGeneralConfigData'

// Mock data inicial - Empresa Tradicional por defecto
const mockGeneralConfig: GeneralConfigResponse = {
    id: 1,
    tipoEmpresa: 'tradicional',
    descripcion: 'Configuración de empresa tradicional con estructura contable estándar',
    activo: true,
    fechaCreacion: '2025-01-01T00:00:00Z',
    fechaActualizacion: '2025-01-01T00:00:00Z'
}

export const useGeneralConfigActions = () => {
    /**
     * Obtiene la configuración general actual
     */
    const getGeneralConfig = async (): Promise<GeneralConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('=== API GET GENERAL CONFIG ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/general')
        console.log('Response:', mockGeneralConfig)
        console.log('==============================')
        
        return mapGeneralConfigResponseToDTO(mockGeneralConfig)
    }

    /**
     * Actualiza la configuración general
     */
    const updateGeneralConfig = async (data: GeneralConfigFormDTO): Promise<GeneralConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700))
        
        console.log('=== API UPDATE GENERAL CONFIG ===')
        console.log('Method: PUT')
        console.log('Endpoint: /api/contabilidad/configuracion/general')
        console.log('Request Body:', mapGeneralConfigDTOToRequest(data))
        
        // Update mock data
        mockGeneralConfig.tipoEmpresa = data.companyType
        mockGeneralConfig.descripcion = data.description
        mockGeneralConfig.activo = data.active
        mockGeneralConfig.fechaActualizacion = new Date().toISOString()
        
        console.log('Response:', mockGeneralConfig)
        console.log('=================================')
        
        return mapGeneralConfigResponseToDTO(mockGeneralConfig)
    }

    /**
     * Crea la configuración general inicial
     */
    const createGeneralConfig = async (data: GeneralConfigFormDTO): Promise<GeneralConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700))
        
        console.log('=== API CREATE GENERAL CONFIG ===')
        console.log('Method: POST')
        console.log('Endpoint: /api/contabilidad/configuracion/general')
        console.log('Request Body:', mapGeneralConfigDTOToRequest(data))
        
        // Create new config
        const newConfig: GeneralConfigResponse = {
            id: Math.floor(Math.random() * 1000),
            tipoEmpresa: data.companyType,
            descripcion: data.description,
            activo: data.active,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        }
        
        console.log('Response:', newConfig)
        console.log('=================================')
        
        return mapGeneralConfigResponseToDTO(newConfig)
    }

    return {
        getGeneralConfig,
        updateGeneralConfig,
        createGeneralConfig
    }
}
