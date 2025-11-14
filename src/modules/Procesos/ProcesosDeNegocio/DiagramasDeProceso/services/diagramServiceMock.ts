import type { MDDiagrama, MDiagramaHoja, Espacio } from '../types/bpmn.types'

// ===== DATA DUMMY BASE =====
const mockDiagrama: MDDiagrama = {
  dni: 1,
  idProceso: 1,
  idEstatus: 1,
  version: 1,
  fum: new Date().toISOString(),
  final: false,
  isCreator: true,
  proceso: {
    dni: 1,
    fecha: new Date().toISOString(),
    nombre: 'Proceso de Ejemplo - Editor BPMN',
    cantidadDiagramas: 3,
    habilitado: true
  },
  hojas: [
    {
      dni: 101,
      doc: '', // XML BPMN vacío (se creará nuevo diagrama)
      psn: 1,
      vertical: true
    }
  ],
  editando: {
    nombre: 'Usuario Demo',
    fechaIni: new Date().toISOString(),
    fechaFin: ''
  }
}

const mockEspacios: Espacio[] = [
  {
    id: 1,
    nombre: 'Espacio Operativo',
    isCV: false,
    procesos: [
      { id: 101, nombre: 'Gestión de Compras' },
      { id: 102, nombre: 'Atención al Cliente' },
      { id: 103, nombre: 'Recursos Humanos' }
    ]
  },
  {
    id: 2,
    nombre: 'Cadena de Valor Principal',
    isCV: true,
    procesos: [
      { id: 201, nombre: 'CV - Producción' },
      { id: 202, nombre: 'CV - Distribución' },
      { id: 203, nombre: 'CV - Ventas' }
    ]
  },
  {
    id: 3,
    nombre: 'Procesos de Soporte',
    isCV: false,
    procesos: [
      { id: 301, nombre: 'Tecnologías de Información' },
      { id: 302, nombre: 'Finanzas' }
    ]
  }
]

// ===== FUNCIONES MOCK =====
export const getDiagramaDataMock = async (
  dniProceso?: number,
  dniDiagrama?: number
): Promise<{ status: string; data: MDDiagrama; message: string }> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log('📦 [MOCK] Cargando diagrama:', { dniProceso, dniDiagrama })
  
  return {
    status: 'success',
    data: { ...mockDiagrama },
    message: 'Diagrama cargado correctamente'
  }
}

export const addHojaMock = async (
  dni: number,
  dniDiag: number
): Promise<{ status: string; data: MDiagramaHoja; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const newHoja: MDiagramaHoja = {
    dni: Date.now(),
    doc: '',
    psn: mockDiagrama.hojas.length + 1,
    vertical: true
  }
  
  mockDiagrama.hojas.push(newHoja)
  
  console.log('📄 [MOCK] Hoja agregada:', newHoja)
  
  return {
    status: 'success',
    data: newHoja,
    message: 'Hoja agregada correctamente'
  }
}

export const guardarDiagramaMock = async (formData: {
  dni: number
  dniDiag: number
  dniHoja: number
  doc: string
  img: File | null
}): Promise<{ status: string; data: MDDiagrama; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Actualizar el XML de la hoja
  const hojaIndex = mockDiagrama.hojas.findIndex(h => h.dni === formData.dniHoja)
  if (hojaIndex !== -1) {
    mockDiagrama.hojas[hojaIndex].doc = decodeURIComponent(formData.doc)
  }
  
  console.log('💾 [MOCK] Diagrama guardado:', {
    hoja: formData.dniHoja,
    xmlLength: formData.doc.length,
    hasImage: !!formData.img,
    imageSize: formData.img?.size
  })
  
  return {
    status: 'success',
    data: { ...mockDiagrama },
    message: 'Diagrama guardado correctamente'
  }
}

export const eliminarHojaMock = async (
  dni: number,
  dniDiag: number,
  dniHoja: number
): Promise<{ status: string; data: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const index = mockDiagrama.hojas.findIndex(h => h.dni === dniHoja)
  if (index !== -1) {
    mockDiagrama.hojas.splice(index, 1)
    console.log('🗑️ [MOCK] Hoja eliminada:', dniHoja)
  }
  
  return {
    status: 'success',
    data: true,
    message: 'Hoja eliminada correctamente'
  }
}

export const cambiarOrientacionMock = async (
  dni: number,
  dniDiag: number,
  dniHoja: number
): Promise<{ status: string; data: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const hoja = mockDiagrama.hojas.find(h => h.dni === dniHoja)
  if (hoja) {
    hoja.vertical = !hoja.vertical
    console.log('🔄 [MOCK] Orientación cambiada:', { dni: dniHoja, vertical: hoja.vertical })
  }
  
  return {
    status: 'success',
    data: true,
    message: 'Orientación cambiada correctamente'
  }
}

export const getFiltroProcesosPostMock = async (
  asis: boolean,
  tobe: boolean
): Promise<{ status: string; data: Espacio[]; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  console.log('🔍 [MOCK] Filtro procesos:', { asis, tobe })
  
  return {
    status: 'success',
    data: mockEspacios,
    message: 'Espacios cargados correctamente'
  }
}

export const diagramaFinalMock = async (
  dni: number,
  dniDiag: number
): Promise<{ status: string; data: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  mockDiagrama.final = true
  
  console.log('✅ [MOCK] Diagrama marcado como final')
  
  return {
    status: 'success',
    data: true,
    message: 'Diagrama marcado como final correctamente'
  }
}

export const exportPDFMock = async (
  dniProceso: number,
  dniDiag: number
): Promise<{ status: string; data: Blob; headers: Record<string, string> }> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('📄 [MOCK] Exportando PDF...')
  
  // Crear un blob simulado de PDF
  const pdfContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n'
  const blob = new Blob([pdfContent], { type: 'application/pdf' })
  
  return {
    status: 'success',
    data: blob,
    headers: {
      'content-disposition': 'attachment; filename="diagrama-bpmn.pdf"'
    }
  }
}
