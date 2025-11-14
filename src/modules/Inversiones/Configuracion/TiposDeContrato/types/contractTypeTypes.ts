// Tipos para Tipos de Contrato

export interface ContractType {
    id: string | number
    tipo: string
    archivo: string
    renovaciones: ContractRenewal[]
}

export interface ContractRenewal {
    id: string | number
    contratoId: string | number
    contrato: string
    archivo: string
}

export interface NewContractTypeData {
    tipo: string
}

export interface NewRenewalData {
    contrato: string
}
