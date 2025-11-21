import { defineStore } from 'pinia'
import type { IncidenceTypeType } from '@/modules/RRHH/TipoIncidencias/types/incidenceTypeTypes'

const initialType: IncidenceTypeType = {
    id: undefined,
    name: '',
    parentCategoryName: '',
    parentCategoryId: 0,
    requiresDateRange: false,
    requiresHours: false,
    requiresJustification: false,
    status: true,
    creationDate: new Date(),
    description: ''
}

export const useIncidenceTypeStore = defineStore('incidenceType', {
    state: () => ({
        selectedIncidenceType: initialType as IncidenceTypeType,
        modalId: 'INCIDENCE_TYPE_MODAL'
    }),
    actions: {
        setData(incidenceType: IncidenceTypeType = initialType) {
            this.selectedIncidenceType = incidenceType
        }
    }
})

export default useIncidenceTypeStore
