import { defineStore } from 'pinia'
import { CompetencyDTO } from '@/modules/RRHH/Competencias/types/competencyTypes'

const initialCompetency: CompetencyDTO = {
    id: undefined,
    name: '',
    description: '',
    category: 'technical',
    active: true
}

const useCompetencyStore = defineStore('competency-store', {
    state: () => ({
        competencies: [] as CompetencyDTO[],
        selectedCompetency: null as CompetencyDTO | null,
        modalId: 'competency-modal'
    }),
    actions: {
        setData(data: CompetencyDTO = initialCompetency) {
            this.selectedCompetency = { ...data }
        },
        clearData() {
            this.selectedCompetency = null
        }
    }
})

export default useCompetencyStore
