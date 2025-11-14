import { ref } from 'vue'
import type { Sector, EstatusSeguimiento } from '../types/prospectConfigTypes'

export const useProspectConfig = () => {
    const sectores = ref<Sector[]>([])
    const estatusSeguimiento = ref<EstatusSeguimiento[]>([])
    const loading = ref(false)

    // Función para obtener sectores (mock data)
    const fetchSectores = async () => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Mock data
        sectores.value = [
            { id: 1, descripcion: 'Sector 1' },
            { id: 2, descripcion: 'Sector 2' }
        ]
        
        loading.value = false
    }

    // Función para obtener estatus de seguimiento (mock data)
    const fetchEstatusSeguimiento = async () => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Mock data
        estatusSeguimiento.value = [
            { id: 1, descripcion: 'Estatus 1' },
            { id: 2, descripcion: 'Estatus 2' }
        ]
        
        loading.value = false
    }

    // Crear nuevo sector
    const createSector = async (descripcion: string) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear sector:', descripcion)
        
        sectores.value.push({
            id: Date.now(),
            descripcion
        })
    }

    // Crear nuevo estatus
    const createEstatus = async (descripcion: string) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Crear estatus:', descripcion)
        
        estatusSeguimiento.value.push({
            id: Date.now(),
            descripcion
        })
    }

    // Eliminar sector
    const deleteSector = async (id: string | number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Eliminar sector:', id)
        
        sectores.value = sectores.value.filter(s => s.id !== id)
    }

    // Eliminar estatus
    const deleteEstatus = async (id: string | number) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('Eliminar estatus:', id)
        
        estatusSeguimiento.value = estatusSeguimiento.value.filter(e => e.id !== id)
    }

    return {
        sectores,
        estatusSeguimiento,
        loading,
        fetchSectores,
        fetchEstatusSeguimiento,
        createSector,
        createEstatus,
        deleteSector,
        deleteEstatus
    }
}
