import { defineStore } from 'pinia'
import type { SOWType } from '@/modules/GestionDeProyectos/SOWDelProyecto/types/sowTypes'

const initialSOW: SOWType = {
    id: undefined,
    projectName: '',
    projectCode: '',
    client: '',
    startDate: null,
    endDate: null,
    executiveSummary: '',
    objectives: '',
    scope: '',
    deliverables: '',
    timeline: '',
    resources: '',
    assumptions: '',
    constraints: '',
    acceptanceCriteria: '',
    paymentTerms: '',
    status: 'draft',
    version: '1.0',
    createdBy: '',
    active: true
}

const useSOWStore = defineStore('sow-store', {
    state: () => ({
        selectedSOW: initialSOW as SOWType,
        sows: [] as SOWType[],
        modalId: 'sow-modal',
        currentTab: 'editor' as 'editor' | 'library'
    }),
    actions: {
        setData(data: SOWType = initialSOW) {
            this.selectedSOW = data
        },
        setSOWs(sows: SOWType[]) {
            this.sows = sows
        },
        setCurrentTab(tab: 'editor' | 'library') {
            this.currentTab = tab
        },
        resetForm() {
            this.selectedSOW = { ...initialSOW }
        }
    },
    getters: {
        draftSOWs: (state) => state.sows.filter(sow => sow.status === 'draft'),
        approvedSOWs: (state) => state.sows.filter(sow => sow.status === 'approved')
    }
})

export default useSOWStore
