<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'
import useProspect from '@/modules/Inversiones/Inversion/Prospectos/composables/useProspect'

const prospectStore = useProspectStore()
const { getStatusColor, formatDate } = useProspect()

const prospect = computed(() => prospectStore.selectedProspect)

const onClose = () => {
    prospectStore.setSelectedProspect()
}
</script>

<template>
    <BaseModal
        :modalId="prospectStore.detailModalId"
        :onClose="onClose"
        size="large"
        :showFooter="false"
    >
        <template v-slot:modalBody>
            <div v-if="prospect" class="space-y-6">
                <!-- Header with Status -->
                <div class="flex items-start justify-between">
                    <div>
                        <h2 class="text-2xl font-bold">
                            {{ prospect.firstName }} {{ prospect.lastName }}
                        </h2>
                        <p v-if="prospect.company" class="text-base-content/70">
                            {{ prospect.company }}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <span :class="`badge ${getStatusColor(prospect.status)}`">
                            {{ prospect.status }}
                        </span>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">contact_mail</span>
                            Información de Contacto
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-base">email</span>
                                <div>
                                    <p class="text-base-content/60">Correo</p>
                                    <p class="font-medium">{{ prospect.email }}</p>
                                </div>
                            </div>
                            <div v-if="prospect.company" class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-base">business</span>
                                <div>
                                    <p class="text-base-content/60">Empresa</p>
                                    <p class="font-medium">{{ prospect.company }}</p>
                                </div>
                            </div>
                            <div v-if="prospect.phone" class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-base">phone</span>
                                <div>
                                    <p class="text-base-content/60">Teléfono</p>
                                    <p class="font-medium">{{ prospect.phone }}</p>
                                </div>
                            </div>
                            <div v-if="prospect.cellphone" class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-base">smartphone</span>
                                <div>
                                    <p class="text-base-content/60">Celular</p>
                                    <p class="font-medium">{{ prospect.cellphone }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Prospect Details -->
                <div class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">business_center</span>
                            Detalles del Prospecto
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div v-if="prospect.sector">
                                <p class="text-base-content/60">Sector</p>
                                <p class="font-medium">{{ prospect.sector }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Needs -->
                <div v-if="prospect.needs" class="card bg-base-200">
                    <div class="card-body p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">assignment</span>
                            Necesidades
                        </h3>
                        <p class="text-sm whitespace-pre-wrap">{{ prospect.needs }}</p>
                    </div>
                </div>

                <!-- Metadata -->
                <div class="text-xs text-base-content/60 flex gap-4">
                    <span v-if="prospect.createdAt">
                        Creado: {{ formatDate(prospect.createdAt) }}
                    </span>
                    <span v-if="prospect.updatedAt">
                        Actualizado: {{ formatDate(prospect.updatedAt) }}
                    </span>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
