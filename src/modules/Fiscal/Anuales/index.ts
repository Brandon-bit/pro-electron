// Main View
export { default as AnnualDeclarationsView } from './views/AnnualDeclarationsView.vue'

// Tab Components
export { default as InflationAdjustmentTab } from './components/InflationAdjustmentTab.vue'
export { default as CreditsTab } from './components/CreditsTab.vue'
export { default as DebtsTab } from './components/DebtsTab.vue'
export { default as ProfitCoefficientTab } from './components/ProfitCoefficientTab.vue'
export { default as AccountingReconciliationTab } from './components/AccountingReconciliationTab.vue'
export { default as AnnualISRTab } from './components/AnnualISRTab.vue'

// Store
export { default as useAnnualDeclarationStore } from './store/annualDeclarationStore'

// Types
export type {
    AnnualDeclarationTabType,
    InflationAdjustmentType,
    CreditBalanceType,
    DebtBalanceType,
    ProfitCoefficientType,
    AccountingReconciliationType,
    ReconciliationItemType,
    AnnualISRType,
    InflationAdjustmentFormType,
    ProfitCoefficientFormType,
    AnnualISRFormType
} from './types/annualDeclarationTypes'
