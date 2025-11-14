import { ref } from 'vue'
import { toPng } from 'html-to-image'
import { guardarDiagramaMock, exportPDFMock } from '../services/diagramServiceMock'
import type { BpmnModeler } from '../types/bpmn.types'
import { useToast } from 'vue-toastification'

export function useDiagramExport(procesoId: number, diagramaId: number) {
  const toast = useToast()
  const isSaving = ref(false)
  const isExporting = ref(false)
  
  const IMAGEN_ESCALA = 4
  const IMAGEN_CALIDAD = 0.8
  
  const guardarDiagrama = async (modeler: BpmnModeler, capture: boolean = true) => {
    try {
      isSaving.value = true
      console.log('[EXPORT] Iniciando guardado de diagrama...')
      
      // 1. Exportar XML
      const result = await modeler.instance.saveXML({ format: true })
      console.log('[EXPORT] XML exportado, tamaño:', result.xml.length)
      
      // 2. Capturar imagen PNG
      let imageBlob: File | null = null
      
      if (capture) {
        const container = document.getElementById(`container-${modeler.dni}`)
        const svg = container?.querySelector('svg')
        
        if (svg) {
          console.log('[EXPORT] Capturando imagen PNG...')
          const dataUrl = await toPng(svg as HTMLElement, {
            width: svg.clientWidth * IMAGEN_ESCALA,
            height: svg.clientHeight * IMAGEN_ESCALA,
            quality: IMAGEN_CALIDAD,
            pixelRatio: IMAGEN_ESCALA
          })
          
          // Convertir DataURL a Blob
          const response = await fetch(dataUrl)
          const blob = await response.blob()
          imageBlob = new File([blob], 'diagram.png', { type: 'image/png' })
          console.log('[EXPORT] Imagen capturada, tamaño:', imageBlob.size, 'bytes')
        }
      }
      
      // 3. Enviar al backend (mock)
      const response = await guardarDiagramaMock({
        dni: procesoId,
        dniDiag: diagramaId,
        dniHoja: modeler.dni,
        doc: encodeURIComponent(result.xml),
        img: imageBlob
      })
      
      if (response.status === 'success') {
        modeler.hasUpd = false
        toast.success(response.message)
        console.log('[EXPORT] Diagrama guardado exitosamente')
        return response
      } else {
        toast.error(response.message)
        console.error('[EXPORT] Error en respuesta:', response.message)
      }
      
    } catch (error) {
      console.error('[EXPORT] Error guardando diagrama:', error)
      toast.error('Error al guardar el diagrama')
      throw error
    } finally {
      isSaving.value = false
    }
  }
  
  const guardarTodosLosDiagramas = async (modelers: BpmnModeler[]) => {
    const modelersConCambios = modelers.filter(m => m.hasUpd)
    
    if (modelersConCambios.length === 0) {
      toast.info('No hay cambios por guardar')
      return
    }
    
    try {
      isSaving.value = true
      console.log(`[EXPORT] Guardando ${modelersConCambios.length} diagramas...`)
      
      for (const modeler of modelersConCambios) {
        await guardarDiagrama(modeler, true)
      }
      
      toast.success(`${modelersConCambios.length} diagrama(s) guardado(s)`)
    } catch (error) {
      console.error('[EXPORT] Error guardando todos los diagramas:', error)
      toast.error('Error al guardar los diagramas')
    } finally {
      isSaving.value = false
    }
  }
  
  const exportarPDF = async () => {
    try {
      isExporting.value = true
      console.log('[EXPORT] Exportando a PDF...')
      
      const response = await exportPDFMock(procesoId, diagramaId)
      
      // Simular descarga
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'diagrama-bpmn.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      
      toast.success('PDF exportado correctamente')
      console.log('[EXPORT] PDF descargado')
      
    } catch (error) {
      console.error('[EXPORT] Error exportando PDF:', error)
      toast.error('Error al exportar PDF')
    } finally {
      isExporting.value = false
    }
  }
  
  return {
    isSaving,
    isExporting,
    guardarDiagrama,
    guardarTodosLosDiagramas,
    exportarPDF
  }
}
