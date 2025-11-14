import { ref } from 'vue'
import type { MDiagramaHoja } from '../types/bpmn.types'
import { addHojaMock, eliminarHojaMock, cambiarOrientacionMock } from '../services/diagramServiceMock'
import { useToast } from 'vue-toastification'

export function useDiagramTabs(procesoId: number, diagramaId: number) {
  const toast = useToast()
  const activeTab = ref<string>('0')
  const hojas = ref<MDiagramaHoja[]>([])
  const isAddingSheet = ref(false)
  
  const agregarHoja = async () => {
    try {
      isAddingSheet.value = true
      const response = await addHojaMock(procesoId, diagramaId)
      
      if (response.status === 'success') {
        hojas.value.push(response.data)
        activeTab.value = response.data.psn.toString()
        toast.success(response.message)
        return response.data
      }
    } catch (error) {
      console.error('Error agregando hoja:', error)
      toast.error('Error al agregar hoja')
    } finally {
      isAddingSheet.value = false
    }
  }
  
  const eliminarHoja = async (hoja: MDiagramaHoja, index: number) => {
    try {
      const response = await eliminarHojaMock(procesoId, diagramaId, hoja.dni)
      
      if (response.status === 'success') {
        hojas.value.splice(index, 1)
        
        // Cambiar a la primera pestaña si existe
        if (hojas.value.length > 0) {
          activeTab.value = hojas.value[0].psn.toString()
        } else {
          activeTab.value = '0'
        }
        
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Error eliminando hoja:', error)
      toast.error('Error al eliminar hoja')
    }
  }
  
  const cambiarOrientacion = async (hoja: MDiagramaHoja) => {
    try {
      const response = await cambiarOrientacionMock(procesoId, diagramaId, hoja.dni)
      
      if (response.status === 'success') {
        hoja.vertical = !hoja.vertical
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Error cambiando orientación:', error)
      toast.error('Error al cambiar orientación')
    }
  }
  
  const cambiarTab = (newTab: string) => {
    console.log('[TAB] Cambiando a:', newTab)
    activeTab.value = newTab
  }
  
  const getActiveTabIndex = (): number => {
    return hojas.value.findIndex(h => h.psn.toString() === activeTab.value)
  }
  
  return {
    activeTab,
    hojas,
    isAddingSheet,
    agregarHoja,
    eliminarHoja,
    cambiarOrientacion,
    cambiarTab,
    getActiveTabIndex
  }
}
