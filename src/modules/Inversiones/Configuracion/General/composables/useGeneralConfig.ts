import { ref } from 'vue'
import type { 
    Plazo, 
    DiaCalculoInteres, 
    Rendimiento, 
    TasaInteresMoratorio, 
    ImpuestoPorAño,
    TipoLiquidacion 
} from '../types/generalConfigTypes'

export const useGeneralConfig = () => {
    const plazos = ref<Plazo[]>([])
    const diasCalculoInteres = ref<DiaCalculoInteres[]>([])
    const rendimientos = ref<Rendimiento[]>([])
    const tasasInteresMoratorio = ref<TasaInteresMoratorio[]>([])
    const impuestosPorAño = ref<ImpuestoPorAño[]>([])
    const tiposLiquidacion = ref<TipoLiquidacion[]>([])
    const loading = ref(false)

    // Cargar datos (mock)
    const fetchData = async () => {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 500))
        
        plazos.value = [
            { id: 1, plazosEnMeses: 6 },
            { id: 2, plazosEnMeses: 12 },
            { id: 3, plazosEnMeses: 24 }
        ]
        
        diasCalculoInteres.value = [
            { id: 1, dias: 360 }
        ]
        
        rendimientos.value = [
            { id: 1, interes: 13.6 },
            { id: 2, interes: 18.6 },
            { id: 3, interes: 20 },
            { id: 4, interes: 16 }
        ]
        
        tasasInteresMoratorio.value = [
            { id: 1, interes: 3 }
        ]
        
        impuestosPorAño.value = [
            { id: 1, impuesto: 3.4, año: 2025 },
            { id: 2, impuesto: 4.65, año: 2025 },
            { id: 3, impuesto: 5, año: 2025 }
        ]
        
        tiposLiquidacion.value = [
            { id: 1, nombre: 'semestral', activo: true },
            { id: 2, nombre: 'anual', activo: false }
        ]
        
        loading.value = false
    }

    // Plazos
    const addPlazo = (plazosEnMeses: number) => {
        plazos.value.push({ id: Date.now(), plazosEnMeses })
    }

    const updatePlazo = (id: string | number, plazosEnMeses: number) => {
        const item = plazos.value.find(p => p.id === id)
        if (item) {
            item.plazosEnMeses = plazosEnMeses
            item.isEditing = false
        }
    }

    const deletePlazo = (id: string | number) => {
        plazos.value = plazos.value.filter(p => p.id !== id)
    }

    // Días cálculo interés
    const addDiaCalculoInteres = (dias: number) => {
        diasCalculoInteres.value.push({ id: Date.now(), dias })
    }

    const updateDiaCalculoInteres = (id: string | number, dias: number) => {
        const item = diasCalculoInteres.value.find(d => d.id === id)
        if (item) {
            item.dias = dias
            item.isEditing = false
        }
    }

    const deleteDiaCalculoInteres = (id: string | number) => {
        diasCalculoInteres.value = diasCalculoInteres.value.filter(d => d.id !== id)
    }

    // Rendimientos
    const addRendimiento = (interes: number) => {
        rendimientos.value.push({ id: Date.now(), interes })
    }

    const updateRendimiento = (id: string | number, interes: number) => {
        const item = rendimientos.value.find(r => r.id === id)
        if (item) {
            item.interes = interes
            item.isEditing = false
        }
    }

    const deleteRendimiento = (id: string | number) => {
        rendimientos.value = rendimientos.value.filter(r => r.id !== id)
    }

    // Tasas interés moratorio
    const addTasaInteresMoratorio = (interes: number) => {
        tasasInteresMoratorio.value.push({ id: Date.now(), interes })
    }

    const updateTasaInteresMoratorio = (id: string | number, interes: number) => {
        const item = tasasInteresMoratorio.value.find(t => t.id === id)
        if (item) {
            item.interes = interes
            item.isEditing = false
        }
    }

    const deleteTasaInteresMoratorio = (id: string | number) => {
        tasasInteresMoratorio.value = tasasInteresMoratorio.value.filter(t => t.id !== id)
    }

    // Impuestos por año
    const addImpuestoPorAño = (impuesto: number, año: number) => {
        impuestosPorAño.value.push({ id: Date.now(), impuesto, año })
    }

    const updateImpuestoPorAño = (id: string | number, impuesto: number, año: number) => {
        const item = impuestosPorAño.value.find(i => i.id === id)
        if (item) {
            item.impuesto = impuesto
            item.año = año
            item.isEditing = false
        }
    }

    const deleteImpuestoPorAño = (id: string | number) => {
        impuestosPorAño.value = impuestosPorAño.value.filter(i => i.id !== id)
    }

    // Tipos de liquidación
    const addTipoLiquidacion = (nombre: string) => {
        tiposLiquidacion.value.push({ id: Date.now(), nombre, activo: false })
    }

    const toggleTipoLiquidacion = (id: string | number) => {
        const item = tiposLiquidacion.value.find(t => t.id === id)
        if (item) {
            item.activo = !item.activo
        }
    }

    return {
        plazos,
        diasCalculoInteres,
        rendimientos,
        tasasInteresMoratorio,
        impuestosPorAño,
        tiposLiquidacion,
        loading,
        fetchData,
        addPlazo,
        updatePlazo,
        deletePlazo,
        addDiaCalculoInteres,
        updateDiaCalculoInteres,
        deleteDiaCalculoInteres,
        addRendimiento,
        updateRendimiento,
        deleteRendimiento,
        addTasaInteresMoratorio,
        updateTasaInteresMoratorio,
        deleteTasaInteresMoratorio,
        addImpuestoPorAño,
        updateImpuestoPorAño,
        deleteImpuestoPorAño,
        addTipoLiquidacion,
        toggleTipoLiquidacion
    }
}
