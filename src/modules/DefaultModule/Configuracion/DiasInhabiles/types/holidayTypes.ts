export type HolidayType = {
    id: number
    date: string
    description: string
    active: boolean
}

export type HolidayFormType = {
    date: Date
    description: string
    active: boolean,
}

export type YearGroupType = {
    year: number
    holidays: HolidayType[]
}

export type YearGroupResponseType = {
    anio: number
    diasInhabiles: HolidayResponseType[]
}

export type HolidayResponseType = {
    dni: number
    fecha: Date
    descripcion: string
    activo: boolean
}

export type HolidayRequestType = {
    dni?: number
    fecha: Date
    descripcion: string
    activo: boolean
}