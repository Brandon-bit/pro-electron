import type { 
    AccountingPolicy,
    AccountingPolicyFormDTO, 
    AccountingPolicyDTO,
    AccountingEntryDTO,
    AccountingEntry
} from '@/modules/Contabilidad/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

export const mapAccountingEntryItem = (model: AccountingEntry): AccountingEntryDTO => {
    return {
        id: model.id,
        account: model.cuenta,
        description: model.descripcion,
        debit: model.debe,
        credit: model.haber,
        reference: model.referencia
    }
}

export const mapAccountingPolicy = (model: AccountingPolicy): AccountingPolicyDTO => {
    return {
        id: model.id,
        folio: model.folio,
        date: model.fecha,
        typeId: model.tipoId,
        type: model.tipo,
        concept: model.concepto,
        total: model.total,
        status: model.estatus,
        entries: model.partidas.map(mapAccountingEntryItem)
    }
}

export const mapAccountingPolicyRequest = (model: AccountingPolicyFormDTO): any => {
    return {
        folio: model.folio,
        fecha: model.date,
        tipoId: model.typeId,
        tipo: model.type,
        concepto: model.concept,
        partidas: model.entries.map(entry => ({
            id: entry.id,
            cuenta: entry.account,
            descripcion: entry.description,
            debe: entry.debit,
            haber: entry.credit,
            referencia: entry.reference || ''
        }))
    }
}
