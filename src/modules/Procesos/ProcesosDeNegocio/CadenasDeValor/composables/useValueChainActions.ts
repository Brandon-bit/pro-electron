import {
    ValueChainType,
    ValueChainFormType,
    ValueChainResponseType
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'
import useValueChainStore from '@/modules/Procesos/ProcesosDeNegocio/CadenasDeValor/store/valueChainStore'
import {
    getValueChainsService,
    createValueChainService,
    updateValueChainService
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/services/valueChainServices'
import {
    mapValueChain,
    mapValueChainRequest
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/mappingValueChainData'

export function useValueChainActions() {
    const valueChainStore = useValueChainStore()

    const getValueChains = async (
        page: number,
        pageSize: number
    ): Promise<{ items: ValueChainType[]; total: number }> => {
        const response = await getValueChainsService(page, pageSize)
        return {
            items: response.data.items.map(mapValueChain),
            total: response.data.totalItems
        }
    }

    const createValueChain = async (
        data: ValueChainFormType
    ): Promise<{ message: string; status: string; data: ValueChainResponseType }> => {
        const model = mapValueChainRequest(data)
        const response = await createValueChainService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const editValueChain = async (
        data: ValueChainFormType,
        valueChainId?: number
    ): Promise<{ message: string; status: string; data: ValueChainResponseType }> => {
        const model = mapValueChainRequest(data)
        const id = valueChainId ?? valueChainStore.selectedValueChain.id ?? 0
        const response = await updateValueChainService(id, model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return { createValueChain, editValueChain, getValueChains }
}
