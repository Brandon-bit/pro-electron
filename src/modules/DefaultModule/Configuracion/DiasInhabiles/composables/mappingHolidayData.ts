import type { 
    HolidayFormType, 
    YearGroupType,
    YearGroupResponseType,
    HolidayRequestType,
    HolidayType,
    HolidayResponseType } from '@/modules/DefaultModule/Configuracion/DiasInhabiles/types/holidayTypes'
import useHoliday from '@defaultModule/Configuracion/DiasInhabiles/composables/useHoliday'

const { formatDate } = useHoliday()

export const mapYearGroup = (model : YearGroupResponseType) : YearGroupType => {
    return {
        year: model.anio,
        holidays: model.diasInhabiles.map((holiday) => ({
            id: holiday.dni,
            date: formatDate(holiday.fecha.toString()),
            description: holiday.descripcion,
            active: holiday.activo
        }))
    }
}

export const mapHolidayRequest = (model : HolidayFormType) : HolidayRequestType => {
    return {
        fecha: model.date,
        descripcion: model.description,
        activo: model.active
    }
}

export const mapHoliday = (model : HolidayResponseType) : HolidayType => {
    return {
        id: model.dni,
        date: formatDate(model.fecha.toString()),
        description: model.descripcion,
        active: model.activo
    }
}
