export type HolidayType = {
    id: string
    date: string
    day: string
    description: string
    year: number
}

export type HolidayFormType = {
    date: string
    description: string
}

export type YearGroupType = {
    year: number
    holidays: HolidayType[]
}
