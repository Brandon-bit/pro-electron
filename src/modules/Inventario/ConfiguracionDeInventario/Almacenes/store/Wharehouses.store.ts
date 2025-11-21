import { defineStore } from 'pinia'
import { WarehouseType } from '../types/WharehousesTypes'

interface AlmacenState {
  items: WarehouseType[]
  total: number
  selectedAlmacen?: WarehouseType
  modalId?: string
}

const initialState = (): AlmacenState => ({
  items: [],
  total: 0,
  selectedAlmacen: undefined,
  modalId: undefined
})

export default defineStore('almacen', {
  state: initialState,
  actions: {
    setAlmacens(items: WarehouseType[], total: number) {
      this.items = items
      this.total = total
    },
    setSelectedAlmacen(almacen?: WarehouseType) {
      this.selectedAlmacen = almacen
    },
    setModalId(id?: string) {
      this.modalId = id
    },
    reset() {
      Object.assign(this, initialState())
    }
  }
})
