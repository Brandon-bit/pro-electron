import { defineStore } from 'pinia'
import type { InitiativeType, MatrixCriteriaType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

const initialInitiative: InitiativeType = {
    dni: undefined,
    classification: '',
    name: '',
    investment: 'Medio',
    scope: 'Medio',
    timeHorizon: 'Medio',
    savings: 'Medio',
    benefits: 'Medio',
    satisfaction: 'Medio',
    inPrioritization: false,
    active: true
}

const defaultCriteria: MatrixCriteriaType = {
    alcance: 50,
    inversion: 50,
    horizonteDeTiempo: 50,
    ahorroIngresos: 50,
    beneficios: 50,
    satisfaccionAlCliente: 50
}

const useInitiativeStore = defineStore('initiative-store', {
    state: () => ({
        selectedInitiative: initialInitiative as InitiativeType,
        modalId: 'initiative-modal',
        matrixCriteria: defaultCriteria as MatrixCriteriaType,
        criteriaExist: false,
        currentPageInitiatives: [] as InitiativeType[]
    }),
    actions: {
        setData(data: InitiativeType = initialInitiative) {
            this.selectedInitiative = data
        },
        updateCriteria(criteria: MatrixCriteriaType) {
            this.matrixCriteria = criteria
        },
        setCriteriaExist(exist: boolean) {
            this.criteriaExist = exist
        },
        setCurrentPageInitiatives(initiatives: InitiativeType[]) {
            this.currentPageInitiatives = initiatives
        }
    }
})

export default useInitiativeStore
