import { defineStore } from 'pinia'
import { IncidenceDTO } from '@/modules/RRHH/Incidencias/types/incidencesTypes'

const initialIncidence: Partial<IncidenceDTO> = {
    id: undefined,
    employeeId: 0,
    employeeName: '',
    category: 'ASISTENCIA',
    type: 'FALTA',
    startDate: '',
    endDate: undefined,
    hours: undefined,
    justified: false,
    comments: '',
    evidence: undefined,
    status: 'PENDIENTE',
    createdBy: '',
    createdAt: '',
    approvedBy: undefined,
    approvedAt: undefined
}

const useIncidencesStore = defineStore('incidences-store', {
    state: () => ({
        selectedIncidence: initialIncidence as Partial<IncidenceDTO>,
        modalId: 'incidence-modal'
    }),
    actions: {
        setData(data: Partial<IncidenceDTO> = initialIncidence) {
            this.selectedIncidence = { ...initialIncidence, ...data }
        }
    }
})

export default useIncidencesStore
