<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useAccountingPolicies from '@/modules/Contabilidad/Contabilidad/PolizasContables/composables/useAccountingPolicies'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const router = useRouter()
const { getTableColumns } = useAccountingPolicies()
const { getAccountingPolicies } = useAccountingPoliciesActions()

const tablaRef = ref()

const goToCreate = () => {
    router.push('/contabilidad/polizas-contables/create')
}
</script>

<template>
    <div class="space-y-6">
        <BaseTitle title="Pólizas Contables" subtitle="Registro y gestión de movimientos contables" />

        <div class="flex justify-end">
            <BaseButton text="Nueva Póliza" @click="goToCreate" icon="add" />
        </div>

        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="getAccountingPolicies"
        />
    </div>
</template>
