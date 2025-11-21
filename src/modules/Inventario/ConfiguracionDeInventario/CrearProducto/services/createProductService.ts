import axiosApiInstance from '@/api/axiosApiInstance'
import axiosApiInstance from '@/api/axiosApiInstance'
import { SelectOptionResponseType } from '@/shared/types/selectOptionTypes'
import { 
  ProductSkuCodeRequestType,
  SkuBarcodeResponseType
} from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import { VariantAttributeResponseType } from '../../AtributosVariantes/types/variantAttributeTypes'
import { ApiResponseType } from '@/shared/types/apiResponseType'

export const getStoresService = () => axiosApiInstance.get('/stores')
export const getWareHousesService = () => axiosApiInstance.get('/warehouse')
export const getSellingTypesService = () => axiosApiInstance.get('/sellingType')
export const getCategoriesService = () => axiosApiInstance.get('/category')
export const getSubcategoriesService = () => axiosApiInstance.get('/subcategory')
export const getUnitsService = () => axiosApiInstance.get('/unit')
export const getBrandsService = () => axiosApiInstance.get('/brand')
export const getBarcodeSimbologiesService = () => axiosApiInstance.get('/barcodeSimbology')
export const getVariantsServices = () => axiosApiInstance.get('/variant')
export const getTaxTypesService = () => axiosApiInstance.get('/taxType')
export const getTaxesService = () => axiosApiInstance.get('/tax')
export const getDiscountTypesService = () => axiosApiInstance.get('/discountType')
export const getLastNumberBarcodeService = () => axiosApiInstance.get('/lastNumberBarcode')

export const getCategoriesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/categoria/lista')
  return response.data.data.categoria
};

export const getSubCategoriesOptionsService = async (idCategory: string) : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get(`/producto/subcategoria/lista/${idCategory}`)
  return response.data.data.categoria
};

export const getBrandsOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/marca/lista')
  return response.data.data.items
};

export const getUnitOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/unidad/lista')
  return response.data.data.items
};

export const getSkuBarcodeService = async (data : ProductSkuCodeRequestType) : Promise<SkuBarcodeResponseType> => {
  const response = await axiosApiInstance.post('/producto/producto/GenerarSkuCodeBar', data)
  return response.data.data.producto
};

export const getWarrantiesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/garantia/lista')
  return response.data.data.items
};

export const getTaxOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/tipoimpuesto/lista')
  return response.data.data.items
};

export const getVariantAttributesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/atributovariantecat/lista')
  return response.data.data.items
};

export const getVariantAttributeById = async (id : string) : Promise<VariantAttributeResponseType> => {
  const response = await axiosApiInstance.get(`/producto/atributovariantecat/${id}`)
  return response.data.data.items[0]
}

export const createProductService = async (data : FormData) : Promise<ApiResponseType<any>> => {
  const response = await axiosApiInstance.post('/producto/producto', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};