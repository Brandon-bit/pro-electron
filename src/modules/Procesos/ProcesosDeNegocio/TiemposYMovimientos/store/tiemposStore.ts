import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    IProceso,
    ITablaMovimientos,
    ITiempoMovimiento,
    IPuesto,
    IActividad,
    IKPIsGlobales,
    IDatosGrafica
} from '../types/tiempos.types'

export const useTiemposStore = defineStore('tiemposStore', () => {
    // ============================================
    // STATE
    // ============================================
    
    const procesos = ref<IProceso[]>([])
    const procesoSeleccionado = ref<IProceso | null>(null)
    const tabla = ref<ITablaMovimientos>({
        Proceso: { id: 0, nombre: '' },
        Areas: [],
        Lista: []
    })
    const isLoading = ref(false)
    
    // ============================================
    // GETTERS - CÁLCULOS DE KPIs
    // ============================================
    
    // Calcular KPIs por puesto
    const puestosConKPIs = computed(() => {
        const puestosCalculados: any[] = []
        
        tabla.value.Lista.forEach(tm => {
            tm.Puestos.forEach(puesto => {
                // Calcular tiempo acumulado (suma de cronómetros finalizados)
                let tiempoAcumuladoSeconds = 0
                puesto.Actividades.forEach(act => {
                    if (act.finalizada && act.dateDiff) {
                        const seconds = 
                            (act.dateDiff.months * 30 * 24 * 3600) +
                            (act.dateDiff.days * 24 * 3600) +
                            (act.dateDiff.hours * 3600) +
                            (act.dateDiff.minutes * 60) +
                            act.dateDiff.seconds
                        tiempoAcumuladoSeconds += seconds
                    }
                })
                
                // Calcular tiempos muertos (suma de inputs)
                let tiemposMuertosSeconds = 0
                puesto.Actividades.forEach(act => {
                    if (act.strTiempoMuerto) {
                        const parts = act.strTiempoMuerto.split(':')
                        if (parts.length === 3) {
                            const hh = parseInt(parts[0]) || 0
                            const mm = parseInt(parts[1]) || 0
                            const ss = parseInt(parts[2]) || 0
                            tiemposMuertosSeconds += (hh * 3600) + (mm * 60) + ss
                        }
                    }
                })
                
                // Calcular horas de trabajo en segundos
                const horasParts = puesto.horasTrabajo.split(':')
                const horasTrabajoSeconds = horasParts.length === 2
                    ? (parseInt(horasParts[0]) * 3600) + (parseInt(horasParts[1]) * 60)
                    : 28800 // 8 horas por defecto
                
                // Calcular % Operación Laboral
                let operacionLaboral = 0
                if (horasTrabajoSeconds > 0) {
                    operacionLaboral = (tiempoAcumuladoSeconds / horasTrabajoSeconds) * 100
                    operacionLaboral = Math.round(operacionLaboral * 100) / 100
                }
                
                // Calcular % Efectividad Operacional
                let efectividadOperacional = 0
                if (tiempoAcumuladoSeconds > 0) {
                    efectividadOperacional = (tiemposMuertosSeconds / tiempoAcumuladoSeconds) * 100
                    efectividadOperacional = Math.round(efectividadOperacional * 100) / 100
                }
                
                // Formatear tiempos
                const strTiempoAcumulado = formatSecondsToDHMS(tiempoAcumuladoSeconds)
                const strTiemposMuertos = formatSecondsToHMS(tiemposMuertosSeconds)
                
                puestosCalculados.push({
                    ...puesto,
                    areaNombre: tm.nombre,
                    tiempoAcumuladoSeconds,
                    tiemposMuertosSeconds,
                    strTiempoAcumulado,
                    strTiemposMuertos,
                    operacionLaboral,
                    efectividadOperacional
                })
            })
        })
        
        return puestosCalculados
    })
    
    // KPIs Globales
    const kpisGlobales = computed((): IKPIsGlobales => {
        const totalAreas = tabla.value.Lista.length
        const totalPuestos = puestosConKPIs.value.length
        
        let totalActividades = 0
        let actividadesActivas = 0
        
        tabla.value.Lista.forEach(tm => {
            tm.Puestos.forEach(p => {
                totalActividades += p.Actividades.length
                actividadesActivas += p.Actividades.filter(a => a.activa).length
            })
        })
        
        // Promedio efectividad
        let sumaEfectividad = 0
        let countEfectividad = 0
        puestosConKPIs.value.forEach(p => {
            if (p.efectividadOperacional > 0) {
                sumaEfectividad += p.efectividadOperacional
                countEfectividad++
            }
        })
        const promedioEfectividad = countEfectividad > 0
            ? Math.round((sumaEfectividad / countEfectividad) * 100) / 100
            : 0
        
        // Mayor y menor efectividad
        let mayorEfectividad = { nombre: 'N/A', valor: 0 }
        let menorEfectividad = { nombre: 'N/A', valor: 100 }
        
        puestosConKPIs.value.forEach(p => {
            if (p.efectividadOperacional > mayorEfectividad.valor) {
                mayorEfectividad = { nombre: p.nombre, valor: p.efectividadOperacional }
            }
            if (p.efectividadOperacional < menorEfectividad.valor && p.efectividadOperacional > 0) {
                menorEfectividad = { nombre: p.nombre, valor: p.efectividadOperacional }
            }
        })
        
        return {
            totalAreas,
            totalPuestos,
            totalActividades,
            actividadesActivas,
            promedioEfectividad,
            mayorEfectividad,
            menorEfectividad
        }
    })
    
    // Datos para gráfica de efectividad
    const datosGraficaEfectividad = computed((): IDatosGrafica => {
        const labels: string[] = []
        const data: number[] = []
        const colors: string[] = []
        
        puestosConKPIs.value.forEach(p => {
            if (p.efectividadOperacional > 0) {
                labels.push(p.nombre)
                data.push(p.efectividadOperacional)
                
                // Colores: verde si <=15%, amarillo si 16-30%, rojo si >30%
                if (p.efectividadOperacional <= 15) {
                    colors.push('#22c55e') // green
                } else if (p.efectividadOperacional <= 30) {
                    colors.push('#eab308') // yellow
                } else {
                    colors.push('#ef4444') // red
                }
            }
        })
        
        return { labels, data, colors }
    })
    
    // Datos para gráfica de actividades
    const datosGraficaActividades = computed((): IDatosGrafica => {
        let activas = 0
        let finalizadas = 0
        let inactivas = 0
        
        tabla.value.Lista.forEach(tm => {
            tm.Puestos.forEach(p => {
                p.Actividades.forEach(a => {
                    if (a.activa) activas++
                    else if (a.finalizada) finalizadas++
                    else inactivas++
                })
            })
        })
        
        return {
            labels: ['Activas', 'Finalizadas', 'Inactivas'],
            data: [activas, finalizadas, inactivas],
            colors: ['#4ade80', '#3b82f6', '#94a3b8']
        }
    })
    
    // Verificar si hay datos
    const hayDatos = computed(() => {
        return tabla.value.Proceso.id > 0 && tabla.value.Lista.length > 0
    })
    
    // ============================================
    // ACTIONS
    // ============================================
    
    const setProcesos = (procs: IProceso[]) => {
        procesos.value = procs
    }
    
    const setProcesoSeleccionado = (proceso: IProceso | null) => {
        procesoSeleccionado.value = proceso
    }
    
    const setTabla = (tablaData: ITablaMovimientos) => {
        tabla.value = JSON.parse(JSON.stringify(tablaData))
    }
    
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }
    
    const agregarTM = (tm: ITiempoMovimiento) => {
        tabla.value.Lista.push(JSON.parse(JSON.stringify(tm)))
    }
    
    const eliminarTM = (dniTM: number) => {
        const index = tabla.value.Lista.findIndex(t => t.dni === dniTM)
        if (index !== -1) {
            tabla.value.Lista.splice(index, 1)
        }
    }
    
    const agregarPuestoATM = (dniTM: number, puesto: IPuesto) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            tm.Puestos.push(JSON.parse(JSON.stringify(puesto)))
        }
    }
    
    const quitarPuestoDeTM = (dniTM: number, dniP: number) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            const index = tm.Puestos.findIndex(p => p.dni === dniP)
            if (index !== -1) {
                tm.Puestos.splice(index, 1)
            }
        }
    }
    
    const agregarActividadAPuesto = (dniTM: number, dniP: number, actividad: IActividad) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            const puesto = tm.Puestos.find(p => p.dni === dniP)
            if (puesto) {
                puesto.Actividades.push(JSON.parse(JSON.stringify(actividad)))
            }
        }
    }
    
    const quitarActividadDePuesto = (dniTM: number, dniP: number, dniAct: number) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            const puesto = tm.Puestos.find(p => p.dni === dniP)
            if (puesto) {
                const index = puesto.Actividades.findIndex(a => a.dni === dniAct)
                if (index !== -1) {
                    puesto.Actividades.splice(index, 1)
                }
            }
        }
    }
    
    const updateActividad = (dniTM: number, dniP: number, dniAct: number, updates: Partial<IActividad>) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            const puesto = tm.Puestos.find(p => p.dni === dniP)
            if (puesto) {
                const actividad = puesto.Actividades.find(a => a.dni === dniAct)
                if (actividad) {
                    Object.assign(actividad, updates)
                }
            }
        }
    }
    
    const updatePuesto = (dniTM: number, dniP: number, updates: Partial<IPuesto>) => {
        const tm = tabla.value.Lista.find(t => t.dni === dniTM)
        if (tm) {
            const puesto = tm.Puestos.find(p => p.dni === dniP)
            if (puesto) {
                Object.assign(puesto, updates)
            }
        }
    }
    
    const updateArea = (dniArea: number, updates: any) => {
        const area = tabla.value.Areas.find(a => a.dni === dniArea)
        if (area) {
            Object.assign(area, updates)
        }
    }
    
    const agregarArea = (area: any) => {
        tabla.value.Areas.push(area)
    }
    
    const eliminarArea = (dniArea: number) => {
        const index = tabla.value.Areas.findIndex(a => a.dni === dniArea)
        if (index !== -1) {
            tabla.value.Areas.splice(index, 1)
        }
    }
    
    const resetTabla = () => {
        tabla.value = {
            Proceso: { id: 0, nombre: '' },
            Areas: [],
            Lista: []
        }
        procesoSeleccionado.value = null
    }
    
    return {
        // State
        procesos,
        procesoSeleccionado,
        tabla,
        isLoading,
        
        // Getters
        puestosConKPIs,
        kpisGlobales,
        datosGraficaEfectividad,
        datosGraficaActividades,
        hayDatos,
        
        // Actions
        setProcesos,
        setProcesoSeleccionado,
        setTabla,
        setLoading,
        agregarTM,
        eliminarTM,
        agregarPuestoATM,
        quitarPuestoDeTM,
        agregarActividadAPuesto,
        quitarActividadDePuesto,
        updateActividad,
        updatePuesto,
        updateArea,
        agregarArea,
        eliminarArea,
        resetTabla
    }
})

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatSecondsToDHMS(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds < 1) return '0d:00:00:00'
    
    const days = Math.floor(totalSeconds / (24 * 3600))
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    return `${String(days).padStart(2, '0')}d:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function formatSecondsToHMS(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds < 1) return '00:00:00'
    
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
