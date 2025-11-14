export type CourseType = {
    id: string
    title: string
    type: 'video' | 'presencial'
    duration: string
    enrolled: number
    capacity: number
}
