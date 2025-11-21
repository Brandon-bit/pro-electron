import { defineStore } from 'pinia'
import type { FixedAssetDTO } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/types/fixedAssetsTypes'

const initialFixedAsset: FixedAssetDTO = {
    id: undefined,
    description: '',
    brand: '',
    model: '',
    serialNumber: '',
    acquisitionDate: '',
    supplier: '',
    invoice: '',
    originalValue: 0,
    usefulLife: 60,
    accountingAccount: '',
    physicalLocation: '',
    area: '',
    responsible: '',
    notes: '',
    status: 'Activo',
    creationDate: new Date()
}

const useFixedAssetsStore = defineStore('fixed-assets-store', {
    state: () => ({
        selectedFixedAsset: initialFixedAsset as FixedAssetDTO,
        modalId: 'fixed-assets-modal'
    }),
    actions: {
        setData(data: FixedAssetDTO = initialFixedAsset) {
            this.selectedFixedAsset = data
        }
    }
})

export default useFixedAssetsStore
