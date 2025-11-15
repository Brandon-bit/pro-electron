import { defineStore } from 'pinia'
import type { BenefitType, CostType, ProjectType } from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/types/businessCaseTypes'
import { YEARS } from '@/modules/GestionDeProyectos/Operacion/CasoDeNegocio/types/businessCaseTypes'

const useBusinessCaseStore = defineStore('business-case-store', {
    state: () => ({
        selectedProject: '' as string,
        projects: [] as ProjectType[],
        discountRate: 10 as number,
        benefitDistribution: [20, 20, 20, 20, 10, 10] as number[],
        benefits: [
            { id: '1', name: '', values: Array(YEARS).fill(0) }
        ] as BenefitType[],
        nonRecurringCosts: [
            { id: '1', name: '', values: [0, 0, 0, 0, 0, 0] }
        ] as CostType[],
        recurringCosts: [
            { id: '1', name: '', values: Array(YEARS).fill(0) }
        ] as CostType[]
    }),
    actions: {
        setSelectedProject(projectId: string) {
            this.selectedProject = projectId
        },
        setProjects(projects: ProjectType[]) {
            this.projects = projects
        },
        setDiscountRate(rate: number) {
            this.discountRate = rate
        },
        setBenefitDistribution(distribution: number[]) {
            this.benefitDistribution = distribution
        },
        setBenefits(benefits: BenefitType[]) {
            this.benefits = benefits
        },
        setNonRecurringCosts(costs: CostType[]) {
            this.nonRecurringCosts = costs
        },
        setRecurringCosts(costs: CostType[]) {
            this.recurringCosts = costs
        },
        addBenefit() {
            this.benefits.push({
                id: Date.now().toString(),
                name: '',
                values: Array(YEARS).fill(0)
            })
        },
        removeBenefit(id: string) {
            if (this.benefits.length > 1) {
                this.benefits = this.benefits.filter(b => b.id !== id)
            }
        },
        updateBenefit(id: string, field: 'name' | number, value: string | number) {
            this.benefits = this.benefits.map(b => {
                if (b.id === id) {
                    if (field === 'name') {
                        return { ...b, name: value as string }
                    } else {
                        const newValues = [...b.values]
                        newValues[field] = Number(value) || 0
                        return { ...b, values: newValues }
                    }
                }
                return b
            })
        },
        addNonRecurringCost() {
            this.nonRecurringCosts.push({
                id: Date.now().toString(),
                name: '',
                values: [0, 0, 0, 0, 0, 0]
            })
        },
        removeNonRecurringCost(id: string) {
            if (this.nonRecurringCosts.length > 1) {
                this.nonRecurringCosts = this.nonRecurringCosts.filter(c => c.id !== id)
            }
        },
        updateNonRecurringCost(id: string, field: 'name' | 0, value: string | number) {
            this.nonRecurringCosts = this.nonRecurringCosts.map(c => {
                if (c.id === id) {
                    if (field === 'name') {
                        return { ...c, name: value as string }
                    } else {
                        const newValues = [...c.values]
                        newValues[0] = Number(value) || 0
                        return { ...c, values: newValues }
                    }
                }
                return c
            })
        },
        addRecurringCost() {
            this.recurringCosts.push({
                id: Date.now().toString(),
                name: '',
                values: Array(YEARS).fill(0)
            })
        },
        removeRecurringCost(id: string) {
            if (this.recurringCosts.length > 1) {
                this.recurringCosts = this.recurringCosts.filter(c => c.id !== id)
            }
        },
        updateRecurringCost(id: string, field: 'name' | number, value: string | number) {
            this.recurringCosts = this.recurringCosts.map(c => {
                if (c.id === id) {
                    if (field === 'name') {
                        return { ...c, name: value as string }
                    } else {
                        const newValues = [...c.values]
                        newValues[field] = Number(value) || 0
                        return { ...c, values: newValues }
                    }
                }
                return c
            })
        },
        updateBenefitDistribution(yearIdx: number, value: number) {
            const newDist = [...this.benefitDistribution]
            newDist[yearIdx] = value
            this.benefitDistribution = newDist
        }
    },
    getters: {
        getProjectName: (state) => {
            const project = state.projects.find(p => p.id === state.selectedProject)
            return project?.name || ''
        },
        distributionSum: (state) => {
            return state.benefitDistribution.reduce((sum, val) => sum + val, 0)
        },
        distributionValid(): boolean {
            return this.distributionSum <= 100
        }
    }
})

export default useBusinessCaseStore
