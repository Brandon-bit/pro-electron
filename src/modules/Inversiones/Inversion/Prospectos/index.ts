// Main View
export { default as ProspectsView } from './views/ProspectsView.vue'

// Components
export { default as KPICard } from './components/KPICard.vue'
export { default as ProspectFilters } from './components/ProspectFilters.vue'
export { default as ProspectFormModal } from './components/ProspectFormModal.vue'
export { default as ProspectDetailModal } from './components/ProspectDetailModal.vue'

// Composables
export { default as useProspect } from './composables/useProspect'
export { useProspectActions } from './composables/useProspectActions'

// Store
export { default as useProspectStore } from './store/prospectStore'

// Types
export type {
    ProspectType,
    ProspectStatusType,
    ProspectSourceType,
    ProspectPriorityType,
    ProspectFilterType,
    ProspectKPIType,
    ProspectFormType,
    ProspectActivityType
} from './types/prospectTypes'
