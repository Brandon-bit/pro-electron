<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useVacancyActions } from '@/modules/RRHH/Vacantes/composables/useVacancyActions'
import { CandidateDTO } from '@/modules/RRHH/Vacantes/types/vacancyTypes'

const props = defineProps<{
    modalId: string
}>()

const modalStore = useModalStore()
const { getCandidatesByVacancy } = useVacancyActions()

const vacancyData = ref<any>({})
const candidates = ref<CandidateDTO[]>([])
const loading = ref(true)

onMounted(async () => {
    vacancyData.value = modalStore.modals[props.modalId]?.data || {}

    if (vacancyData.value.id) {
        candidates.value = await getCandidatesByVacancy(vacancyData.value.id)
    }

    loading.value = false
})
</script>

<template>
    <div class="space-y-4">
        <div class="bg-base-200 p-4 rounded-lg mb-4">
            <h3 class="font-bold text-lg">{{ vacancyData.title }}</h3>
            <p class="text-sm text-base-content/70">
                Salario: ${{ vacancyData.offeredSalary?.toLocaleString('es-MX') }}
            </p>
        </div>

        <div v-if="loading" class="text-center py-4">
            <span class="loading loading-spinner loading-md"></span>
        </div>
        <div v-else-if="candidates.length === 0" class="text-center py-4 text-base-content/60">
            No hay candidatos postulados
        </div>
        <div v-else class="overflow-y-auto max-h-96 border border-base-300 rounded-lg">
            <table class="table w-full">
                <thead class="sticky top-0 bg-base-200 z-10">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th class="text-center">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="candidate in candidates" :key="candidate.id">
                        <td class="min-w-[200px]">{{ candidate.name }}</td>
                        <td class="min-w-[250px]">{{ candidate.email }}</td>
                        <td class="text-center">
                            <span
                                class="badge badge-sm"
                                :class="{
                                    'badge-warning': candidate.status === 'En revisión',
                                    'badge-info': candidate.status === 'Entrevista',
                                    'badge-ghost': candidate.status === 'Pendiente',
                                    'badge-success': candidate.status === 'Aprobado',
                                    'badge-error': candidate.status === 'Rechazado'
                                }"
                            >
                                {{ candidate.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
