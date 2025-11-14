import { defineStore } from 'pinia'
import type { DocumentType, TemplateType } from '@/modules/DiagramasDeDecision/Documentos/types/documentTypes'

const useDocumentStore = defineStore('document-store', {
    state: () => ({
        documents: [
            {
                id: '1',
                name: 'Comunicado Go-Live Sistema ERP',
                type: 'golive',
                status: 'in_review' as const,
                version: '2.1',
                created: '2024-01-15',
                author: 'Juan Pérez',
                approvalFlow: [
                    { id: '1', approver: 'María García', role: 'Change Manager', status: 'approved' as const, date: '2024-01-16' },
                    { id: '2', approver: 'Carlos López', role: 'Director TI', status: 'pending' as const },
                    { id: '3', approver: 'Ana Martínez', role: 'CEO', status: 'pending' as const }
                ]
            },
            {
                id: '2',
                name: 'FAQ - Nuevo Portal de Empleados',
                type: 'faq',
                status: 'approved' as const,
                version: '1.0',
                created: '2024-01-10',
                author: 'Laura Torres',
                approvalFlow: [
                    { id: '1', approver: 'María García', role: 'Change Manager', status: 'approved' as const, date: '2024-01-11' },
                    { id: '2', approver: 'Carlos López', role: 'Director TI', status: 'approved' as const, date: '2024-01-12' }
                ]
            }
        ] as DocumentType[],
        templates: [
            { id: 'golive', name: 'Comunicado Go-Live', description: 'Anuncio oficial de lanzamiento' },
            { id: 'faq', name: 'FAQ - Preguntas Frecuentes', description: 'Documento de preguntas y respuestas' },
            { id: 'policy', name: 'Política Actualizada', description: 'Documento de políticas y procedimientos' },
            { id: 'guide', name: 'Guía de Usuario', description: 'Manual de uso del sistema' }
        ] as TemplateType[],
        selectedDocument: null as DocumentType | null,
        createModalId: 'create-document-modal',
        approvalModalId: 'approval-flow-modal'
    }),
    actions: {
        addDocument(name: string, type: string, content: string) {
            const newDocument: DocumentType = {
                id: Date.now().toString(),
                name,
                type,
                status: 'draft',
                version: '1.0',
                created: new Date().toISOString().split('T')[0],
                author: 'Usuario Actual',
                approvalFlow: []
            }
            this.documents.push(newDocument)
        },
        selectDocument(document: DocumentType) {
            this.selectedDocument = document
        },
        clearSelectedDocument() {
            this.selectedDocument = null
        }
    },
    getters: {
        approvedCount: (state) => (documentId: string) => {
            const doc = state.documents.find(d => d.id === documentId)
            if (!doc) return 0
            return doc.approvalFlow.filter(step => step.status === 'approved').length
        }
    }
})

export default useDocumentStore
