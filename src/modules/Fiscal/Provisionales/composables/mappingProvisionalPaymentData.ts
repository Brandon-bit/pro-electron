import type { 
    ProvisionalPaymentType, 
    ProvisionalPaymentResponseType,
    VATDeclarationType,
    VATDeclarationResponseType
} from '@/modules/Fiscal/Provisionales/types/provisionalPaymentTypes'

export const mapProvisionalPayment = (response: ProvisionalPaymentResponseType): ProvisionalPaymentType => {
    return {
        id: response.id,
        period: response.periodo,
        income: response.ingresos,
        deductions: response.deducciones,
        taxableProfit: response.utilidadFiscal,
        isr: response.isr,
        vat: response.iva,
        total: response.total,
        dueDate: new Date(response.fechaLimite),
        status: response.estatus as any,
        paymentDate: response.fechaPago ? new Date(response.fechaPago) : undefined,
        paymentReference: response.referenciaPago
    }
}

export const mapVATDeclaration = (response: VATDeclarationResponseType): VATDeclarationType => {
    return {
        id: response.id,
        period: response.periodo,
        collectedVAT: response.ivaCobrado,
        creditableVAT: response.ivaAcreditable,
        favorBalance: response.saldoFavor,
        vatToPay: response.ivaPagar,
        dueDate: new Date(response.fechaLimite),
        status: response.estatus as any,
        paymentDate: response.fechaPago ? new Date(response.fechaPago) : undefined,
        paymentReference: response.referenciaPago
    }
}
