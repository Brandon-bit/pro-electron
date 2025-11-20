// ============================================
// API Response Types
// ============================================

export type ParticipantResponseType = {
    dni: string
    nombre: string
    correo: string
}

export type ActionStatusResponseType = {
    dni: number
    nombre: string
    color: string
}

export type AgreedActionResponseType = {
    dni: number
    dniMinuta: string
    minutaOrigen: string
    descripcion: string
    responsable: ParticipantResponseType
    estatus: ActionStatusResponseType
    fechaLimite: string
}

export type MinuteResponseType = {
    dni: string
    dniProyecto: string
    nombre: string
    fecha: string
    agenda: string
    puntosDiscutidos: string
    decisionesTomadas: string
    asistentes: ParticipantResponseType[]
    accionesAcordadas: AgreedActionResponseType[]
    activo: boolean
}

export type ProjectOptionResponseType = {
    dni: string
    label: string
}

// ============================================
// API Request Types
// ============================================

export type MinuteRequestType = {
    dni?: string
    dniProyecto: string
    nombre: string
    fecha: string
    agenda: string
    puntosDiscutidos: string
    decisionesTomadas: string
    activo: boolean
}

export type AgreedActionRequestType = {
    dni?: number
    dniMinuta: string
    dniResponsable: string
    descripcion: string
    fechaLimite: string
}

export type AttendeeRequestType = {
    dniMinuta: string
    dniUsuario: string
}

// ============================================
// Internal/Store Types
// ============================================

export type ParticipantType = {
    dni: string
    name: string
    email: string
}

export type ActionStatusType = {
    dni: number
    name: string
    color: string
}

export type AgreedActionType = {
    dni: number
    minuteDni: string
    minuteOrigin: string
    description: string
    responsible: ParticipantType
    status: ActionStatusType
    dueDate: string
}

export type MinuteType = {
    dni: string
    projectDni: string
    name: string
    date: string
    agenda: string
    discussionPoints: string
    decisionsMade: string
    attendees: ParticipantType[]
    agreedActions: AgreedActionType[]
    active: boolean
}

export type ProjectOptionType = {
    dni: string
    label: string
}

// For table display
export type AgreedActionWithMinuteType = AgreedActionType & {
    minuteName: string
}
