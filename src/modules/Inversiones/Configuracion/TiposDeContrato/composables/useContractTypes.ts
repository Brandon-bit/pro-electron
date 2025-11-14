import { ref } from 'vue'
import type { ContractType, ContractRenewal } from '../types/contractTypeTypes'

export const useContractTypes = () => {
    const contractTypes = ref<ContractType[]>([])
    const loading = ref(false)

    // Función para obtener tipos de contrato (mock data)
    const fetchContractTypes = async (page: number, pageSize: number) => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock data
        const mockData: ContractType[] = [
            {
                id: 1,
                tipo: 'Contrato 01',
                archivo: 'codigo_qr_(1).png',
                renovaciones: [
                    {
                        id: 1,
                        contratoId: 1,
                        contrato: 'Renovación 01 de Contrato 01',
                        archivo: 'doc02_(2)_(2).docx'
                    }
                ]
            },
            {
                id: 2,
                tipo: 'Contrato 02',
                archivo: 'doc02.docx',
                renovaciones: []
            }
        ]
        
        loading.value = false
        
        return {
            items: mockData,
            total: mockData.length
        }
    }

    // Crear nuevo tipo de contrato
    const createContractType = async (tipo: string) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear tipo de contrato:', tipo)
        // Aquí iría la llamada a la API
    }

    // Crear nueva renovación
    const createRenewal = async (contratoId: string | number, contrato: string) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear renovación:', { contratoId, contrato })
        // Aquí iría la llamada a la API
    }

    // Eliminar tipo de contrato
    const deleteContractType = async (id: string | number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Eliminar tipo de contrato:', id)
        // Aquí iría la llamada a la API
    }

    // Eliminar renovación
    const deleteRenewal = async (id: string | number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Eliminar renovación:', id)
        // Aquí iría la llamada a la API
    }

    return {
        contractTypes,
        loading,
        fetchContractTypes,
        createContractType,
        createRenewal,
        deleteContractType,
        deleteRenewal
    }
}
