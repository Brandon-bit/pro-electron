import type { 
    MaskConfigDTO, 
    MaskConfigFormDTO,
    MaskConfigResponse 
} from '@contabilidad/Configuracion/MaskConfig/types/maskConfigTypes'
import { 
    mapMaskConfigResponseToDTO,
    mapMaskConfigDTOToRequest 
} from '@contabilidad/Configuracion/MaskConfig/composables/mappingMaskConfigData'

// Mock data inicial - Configuración estándar mexicana
const mockMaskConfig: MaskConfigResponse = {
    id: 1,
    formato: '0000-00-00-00-00-00',
    separador: '-',
    profundidadMaxima: 6,
    longitudFlexible: false,
    segmentos: [
        {
            id: '1',
            nombre: 'Grupo',
            digitos: 4,
            digitosMinimos: 1,
            digitosMaximos: 6,
            tipoCaracter: 'numeric',
            requerido: true,
            descripcion: 'Código de grupo principal (Activo, Pasivo, Capital)',
            marcador: '1000'
        },
        {
            id: '2',
            nombre: 'Subgrupo',
            digitos: 2,
            digitosMinimos: 1,
            digitosMaximos: 4,
            tipoCaracter: 'numeric',
            requerido: true,
            descripcion: 'Código de subgrupo (Circulante, Fijo)',
            marcador: '01'
        },
        {
            id: '3',
            nombre: 'Mayor',
            digitos: 2,
            digitosMinimos: 1,
            digitosMaximos: 4,
            tipoCaracter: 'numeric',
            requerido: true,
            descripcion: 'Código de cuenta mayor (Bancos, Clientes)',
            marcador: '01'
        },
        {
            id: '4',
            nombre: 'Subcuenta',
            digitos: 2,
            digitosMinimos: 1,
            digitosMaximos: 4,
            tipoCaracter: 'numeric',
            requerido: false,
            descripcion: 'Código de subcuenta (Banco específico)',
            marcador: '01'
        },
        {
            id: '5',
            nombre: 'Auxiliar',
            digitos: 2,
            digitosMinimos: 1,
            digitosMaximos: 4,
            tipoCaracter: 'numeric',
            requerido: false,
            descripcion: 'Código auxiliar (Departamento, Proyecto)',
            marcador: '01'
        },
        {
            id: '6',
            nombre: 'Subauxiliar',
            digitos: 2,
            digitosMinimos: 1,
            digitosMaximos: 4,
            tipoCaracter: 'numeric',
            requerido: false,
            descripcion: 'Código subauxiliar (Sub-departamento)',
            marcador: '01'
        }
    ],
    activo: true,
    fechaCreacion: '2025-01-01T00:00:00Z',
    fechaActualizacion: '2025-01-01T00:00:00Z'
}

export const useMaskConfigActions = () => {
    /**
     * Obtiene la configuración de máscara actual
     */
    const getMaskConfig = async (): Promise<MaskConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('=== API GET MASK CONFIG ===')
        console.log('Method: GET')
        console.log('Endpoint: /api/contabilidad/configuracion/mascara')
        console.log('Response:', mockMaskConfig)
        console.log('===========================')
        
        return mapMaskConfigResponseToDTO(mockMaskConfig)
    }

    /**
     * Crea una nueva configuración de máscara
     */
    const createMaskConfig = async (data: MaskConfigFormDTO): Promise<MaskConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('=== API CREATE MASK CONFIG ===')
        console.log('Method: POST')
        console.log('Endpoint: /api/contabilidad/configuracion/mascara')
        console.log('Request Body:', mapMaskConfigDTOToRequest(data))
        
        // Create new config
        const newConfig: MaskConfigResponse = {
            id: Math.floor(Math.random() * 1000),
            formato: data.format,
            separador: data.separator,
            profundidadMaxima: data.maxDepth,
            longitudFlexible: data.allowFlexibleLength,
            segmentos: mockMaskConfig.segmentos, // Simplificación
            activo: true,
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        }
        
        console.log('Response:', newConfig)
        console.log('==============================')
        
        return mapMaskConfigResponseToDTO(newConfig)
    }

    /**
     * Actualiza la configuración de máscara existente
     */
    const updateMaskConfig = async (id: number, data: MaskConfigFormDTO): Promise<MaskConfigDTO> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700))
        
        console.log('=== API UPDATE MASK CONFIG ===')
        console.log('Method: PUT')
        console.log('Endpoint: /api/contabilidad/configuracion/mascara/' + id)
        console.log('Request Body:', mapMaskConfigDTOToRequest(data))
        
        // Update mock data
        mockMaskConfig.formato = data.format
        mockMaskConfig.separador = data.separator
        mockMaskConfig.profundidadMaxima = data.maxDepth
        mockMaskConfig.longitudFlexible = data.allowFlexibleLength
        mockMaskConfig.fechaActualizacion = new Date().toISOString()
        
        console.log('Response:', mockMaskConfig)
        console.log('==============================')
        
        return mapMaskConfigResponseToDTO(mockMaskConfig)
    }

    return {
        getMaskConfig,
        createMaskConfig,
        updateMaskConfig
    }
}
