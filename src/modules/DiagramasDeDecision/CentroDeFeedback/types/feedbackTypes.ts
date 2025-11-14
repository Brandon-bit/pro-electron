export type FeedbackItemType = {
    id: string
    text: string
    source: string
    sentiment: 'positivo' | 'neutral' | 'negativo'
    priority: 'alta' | 'media' | 'baja'
    tags: string[]
}
