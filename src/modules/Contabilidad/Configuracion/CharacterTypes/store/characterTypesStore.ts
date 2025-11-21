import { defineStore } from 'pinia'
import type { CharacterTypeFormDTO } from '@contabilidad/Configuracion/CharacterTypes/types/characterTypesTypes'

const initialCharacterType: CharacterTypeFormDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

/**
 * Store de Pinia para manejar estado de Character Types
 */
export const useCharacterTypesStore = defineStore('characterTypes', {
    state: () => ({
        // ID del modal para integración con modalStore
        modalId: 'characterTypeModal',

        // Estado actual del tipo de carácter en edición
        currentCharacterType: { ...initialCharacterType } as CharacterTypeFormDTO
    }),

    actions: {
        /**
         * Establece los datos del tipo de carácter actual
         */
        setCharacterType(data: CharacterTypeFormDTO) {
            this.currentCharacterType = JSON.parse(JSON.stringify(data))
        },

        /**
         * Resetea el tipo de carácter a valores por defecto
         */
        resetCharacterType() {
            this.currentCharacterType = { ...initialCharacterType }
        }
    }
})

export default useCharacterTypesStore
