import { ref } from 'vue'
import type { Partner } from '../types/partnerTypes'

export const usePartners = () => {
    const partners = ref<Partner[]>([])
    const loading = ref(false)
    const selectedPartner = ref<Partner | null>(null)

    // Función para obtener socios (mock data por ahora)
    const fetchPartners = async (page: number, pageSize: number) => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock data
        const mockPartners: Partner[] = [
            {
                id: 1,
                nombre: 'MANUEL EDGARDO DIAZ ESCALERA',
                codigo: '7221251727',
                cuenta: '',
                telefono: '',
                celular: '',
                correo: 'diej@hotmail.com',
                estatusCarga: 1,
                envioAutomatico: false,
                documentosCompletados: 1,
                documentosTotales: 1
            },
            {
                id: 2,
                nombre: 'JOSÉ LUCAS DÍAZ TORRES',
                codigo: '5581983162',
                cuenta: '',
                telefono: '',
                celular: '',
                correo: 'josep_1118@hotmail.com',
                estatusCarga: 0,
                envioAutomatico: false,
                documentosCompletados: 0,
                documentosTotales: 1
            },
            {
                id: 3,
                nombre: 'SALVADOR PANIAGUA ANDUZA',
                codigo: '7227098079',
                cuenta: '',
                telefono: '',
                celular: '',
                correo: 'salvadoranduza2021@hotmail.com',
                estatusCarga: 0,
                envioAutomatico: false,
                documentosCompletados: 0,
                documentosTotales: 1
            }
        ]
        
        loading.value = false
        
        return {
            items: mockPartners,
            total: mockPartners.length
        }
    }

    const setSelectedPartner = (partner: Partner | null) => {
        selectedPartner.value = partner
    }

    return {
        partners,
        loading,
        selectedPartner,
        fetchPartners,
        setSelectedPartner
    }
}
