// Main View
export { default as InformativeDeclarationsView } from './views/InformativeDeclarationsView.vue'

// Tab Components
export { default as DIOTTab } from './components/DIOTTab.vue'
export { default as ElectronicAccountingTab } from './components/ElectronicAccountingTab.vue'
export { default as InterestTab } from './components/InterestTab.vue'
export { default as CashDepositsTab } from './components/CashDepositsTab.vue'
export { default as TaxLossTab } from './components/TaxLossTab.vue'

// Store
export { default as useInformativeDeclarationStore } from './store/informativeDeclarationStore'

// Types
export type {
    InformativeDeclarationTabType,
    DIOTType,
    DIOTSupplierType,
    ElectronicAccountingType,
    InterestDeclarationType,
    FinancialInstitutionType,
    CashDepositDeclarationType,
    CashDepositType,
    TaxLossDeclarationType,
    DIOTFormType,
    InterestDeclarationFormType,
    CashDepositFormType,
    TaxLossFormType
} from './types/informativeDeclarationTypes'
