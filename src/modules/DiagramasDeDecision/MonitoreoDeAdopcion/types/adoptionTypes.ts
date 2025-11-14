export type MetricType = {
    id: string
    title: string
    value: string | number
    description?: string
    trend?: string
    trendType?: 'positive' | 'negative' | 'neutral'
    progress?: number
}
