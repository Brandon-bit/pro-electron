import { ref } from 'vue'
import type { Contract, ContractDetail } from '../types/contractTypes'

export const useContracts = () => {
    const contracts = ref<Contract[]>([])
    const loading = ref(false)
    const selectedContract = ref<Contract | null>(null)

    // Función para obtener contratos (mock data por ahora)
    const fetchContracts = async (page: number, pageSize: number) => {
        loading.value = true
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock data
        const mockContracts: Contract[] = [
            {
                id: 1,
                estatus: 'En Trámite',
                cliente: 'MANUEL EDGARDO DIAZ ESCALERA',
                contrato: 'Contrato 01',
                liquidacion: 'semestral',
                renovacion: '',
                fechaAlta: '13/06/2025',
                fechaFin: '11/02/2025',
                montoInicial: 70000.00,
                rendimientoNeto: 13.4,
                plazoMeses: 6,
                plazoDias: 6,
                planPagos: 1,
                total: 3229.15,
                interes: 72.30
            },
            {
                id: 2,
                estatus: 'En Trámite',
                cliente: 'MANUEL EDGARDO DIAZ ESCALERA',
                contrato: 'Contrato 01',
                liquidacion: 'semestral',
                renovacion: '',
                fechaAlta: '13/06/2025',
                fechaFin: '11/02/2025',
                montoInicial: 200000.00,
                rendimientoNeto: 13.4,
                plazoMeses: 6,
                plazoDias: 6,
                planPagos: 1,
                total: 9229.15,
                interes: 42.75
            },
            {
                id: 3,
                estatus: 'En Trámite',
                cliente: 'MANUEL EDGARDO DIAZ ESCALERA',
                contrato: 'Contrato 01',
                liquidacion: 'semestral',
                renovacion: '',
                fechaAlta: '13/06/2025',
                fechaFin: '11/02/2025',
                montoInicial: 200000.00,
                rendimientoNeto: 13.4,
                plazoMeses: 6,
                plazoDias: 6,
                planPagos: 1,
                total: 8107.52,
                interes: 200697.52
            }
        ]
        
        loading.value = false
        
        return {
            items: mockContracts,
            total: mockContracts.length
        }
    }

    // Mock data para detalle de contrato
    const fetchContractDetail = async (contractId: string | number): Promise<ContractDetail> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return {
            id: contractId,
            cliente: 'MANUEL EDGARDO DIAZ ESCALERA',
            tipoContrato: 'Contrato 01',
            formaLiquidacion: 'semestral',
            calcularInteresMoratorio: true,
            fechaInicio: '14/06/2025',
            fechaFin: '11/12/2025',
            plazoMeses: 6,
            plazoDias: 180,
            tasaInteres: 13,
            impuesto: 4,
            interesMoratorio: 3.00,
            montoPesos: 70000.00,
            tipoCambio: undefined,
            montoDolares: undefined,
            pagosCapital: [],
            planPagos: [
                {
                    id: 1,
                    parcialidad: 1,
                    fechaInicio: '14/06/2025',
                    fechaLiquidacion: '11/12/2025',
                    dias: 181,
                    fechaPago: '15/12/2025',
                    interes: 3349
                }
            ],
            pagosInteres: [],
            pagosInteresesMoratorios: []
        }
    }

    const setSelectedContract = (contract: Contract | null) => {
        selectedContract.value = contract
    }

    return {
        contracts,
        loading,
        selectedContract,
        fetchContracts,
        fetchContractDetail,
        setSelectedContract
    }
}
