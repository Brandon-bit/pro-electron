import { defineStore } from 'pinia'
import { ValueChainType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

const initialValueChain: ValueChainType = {
    id: undefined,
    title: '',
    isPrimary: false,
    creationDate: new Date()
}

const useValueChainStore = defineStore('value-chain-store', {
    state: () => ({
        selectedValueChain: initialValueChain as ValueChainType,
        modalId: 'value-chain-modal'
    }),
    actions: {
        setData(data: ValueChainType = initialValueChain) {
            this.selectedValueChain = data
        }
    }
})

export default useValueChainStore
