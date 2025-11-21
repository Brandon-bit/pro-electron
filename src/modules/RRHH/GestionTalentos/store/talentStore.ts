import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PDIFormDTO } from '@/modules/RRHH/GestionTalentos/types/talentTypes'

export const useTalentStore = defineStore('talent', () => {
    const modalId = 'create-pdi-modal'
    const pdiData = ref<PDIFormDTO>({
        employeeId: 0,
        competency: '',
        action: '',
        startDate: '',
        endDate: ''
    })

    const setPDIData = (data: PDIFormDTO) => {
        pdiData.value = data
    }

    const clearData = () => {
        pdiData.value = {
            employeeId: 0,
            competency: '',
            action: '',
            startDate: '',
            endDate: ''
        }
    }

    return {
        modalId,
        pdiData,
        setPDIData,
        clearData
    }
})
