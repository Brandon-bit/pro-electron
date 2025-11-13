import axiosApiInstance from '@/api/axiosApiInstance'
import { ControlPanelDataType } from '@inventario/Operacion/Tablero/types/controlPanelTypes'

export const getControlPanelDataService = async (): Promise<ControlPanelDataType[]> => {
    const response = await axiosApiInstance.get('/controlPanelData')
    return response.data
}
