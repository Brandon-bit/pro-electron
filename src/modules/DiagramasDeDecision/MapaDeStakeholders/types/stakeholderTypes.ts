export type StakeholderType = {
    id: string
    name: string
    role: string
    power: 'high' | 'low'
    interest: 'high' | 'low'
    engagement: string
}

export type QuadrantType = {
    id: string
    title: string
    description: string
    color: string
    borderColor: string
}
