import useDocumentStore from '@/modules/DiagramasDeDecision/Documentos/store/documentStore'
import { showNotification } from '@/utils/toastNotifications'

export const useDocumentActions = () => {
    
    const documentStore = useDocumentStore()

    const handleCreateDocument = (name: string, type: string, content: string) => {
        if (!name.trim()) {
            showNotification('El nombre del documento es requerido', 'error')
            return false
        }

        if (!type) {
            showNotification('Selecciona un tipo de documento', 'error')
            return false
        }

        documentStore.addDocument(name, type, content)
        showNotification('Documento creado exitosamente', 'success')
        return true
    }

    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case 'draft': return 'badge-ghost'
            case 'in_review': return 'badge-warning'
            case 'approved': return 'badge-success'
            case 'published': return 'badge-primary'
            default: return 'badge-ghost'
        }
    }

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'draft': return 'Borrador'
            case 'in_review': return 'En Revisión'
            case 'approved': return 'Aprobado'
            case 'published': return 'Publicado'
            default: return status
        }
    }

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case 'approved': return 'check_circle'
            case 'pending': return 'schedule'
            case 'rejected': return 'cancel'
            default: return 'schedule'
        }
    }

    const getStatusIconColor = (status: string): string => {
        switch (status) {
            case 'approved': return 'text-success'
            case 'pending': return 'text-warning'
            case 'rejected': return 'text-error'
            default: return 'text-base-content'
        }
    }

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
    }

    return {
        handleCreateDocument,
        getStatusBadgeClass,
        getStatusLabel,
        getStatusIcon,
        getStatusIconColor,
        getInitials
    }
}
