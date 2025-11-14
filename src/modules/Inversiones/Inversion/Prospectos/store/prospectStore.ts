import { defineStore } from 'pinia'
import type { ProspectType, ProspectFilterType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'

interface ProspectState {
    prospects: ProspectType[]
    selectedProspect: ProspectType | null
    filters: ProspectFilterType
    modalId: string
    detailModalId: string
    activityModalId: string
}

const useProspectStore = defineStore('prospect', {
    state: (): ProspectState => ({
        prospects: [],
        selectedProspect: null,
        filters: {},
        modalId: 'prospectModal',
        detailModalId: 'prospectDetailModal',
        activityModalId: 'prospectActivityModal'
    }),

    getters: {
        getProspects: (state) => state.prospects,
        getSelectedProspect: (state) => state.selectedProspect,
        getFilters: (state) => state.filters
    },

    actions: {
        setProspects(prospects: ProspectType[]) {
            this.prospects = prospects
        },

        setSelectedProspect(prospect?: ProspectType) {
            this.selectedProspect = prospect || null
        },

        setFilters(filters: ProspectFilterType) {
            this.filters = filters
        },

        clearFilters() {
            this.filters = {}
        }
    }
})

export default useProspectStore
