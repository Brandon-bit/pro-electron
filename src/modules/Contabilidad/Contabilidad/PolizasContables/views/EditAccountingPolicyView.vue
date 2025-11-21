<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { accountingPolicySchema } from '@/modules/Contabilidad/Contabilidad/PolizasContables/validations/accountingPoliciesValidation'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'
import { useAccountCatalogActions } from '@contabilidad/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import { showNotification } from '@/utils/toastNotifications'
import type { SelectOptionDTO } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import type { AccountOptionDTO } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import type { AccountingEntryDTO, AccountingPolicyDTO } from '@/modules/Contabilidad/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

const router = useRouter()
const route = useRoute()
const { getAccountingPolicyTypes, updateAccountingPolicy, getAccountingPolicyById } = useAccountingPoliciesActions()
const { getAllAccountsForSelect } = useAccountCatalogActions()

const typeOptions = ref<SelectOptionDTO[]>([])
const accountOptions = ref<AccountOptionDTO[]>([])
const loading = ref(true)
const policyId = ref<number>(Number(route.params.id))

// Estado local para las partidas
const entries = ref<AccountingEntryDTO[]>([])

const { handleSubmit, isSubmitting, setFieldValue, setValues } = useForm({
    validationSchema: toTypedSchema(accountingPolicySchema),
    validateOnMount: false
})

// Computeds para totales
const totalDebit = computed(() => {
    return entries.value.reduce((sum, entry) => sum + (Number(entry.debit) || 0), 0)
})

const totalCredit = computed(() => {
    return entries.value.reduce((sum, entry) => sum + (Number(entry.credit) || 0), 0)
})

const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const isBalanced = computed(() => {
    return Math.abs(totalDebit.value - totalCredit.value) < 0.01 && totalDebit.value > 0
})

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

const addEntry = () => {
    entries.value.push({
        id: crypto.randomUUID(),
        account: '',
        description: '',
        debit: 0,
        credit: 0,
        reference: ''
    })
    setFieldValue('entries', entries.value)
}

const removeEntry = (id: string) => {
    if (entries.value.length > 1) {
        entries.value = entries.value.filter(entry => entry.id !== id)
        setFieldValue('entries', entries.value)
    }
}

const loadPolicy = async () => {
    loading.value = true
    try {
        console.log(`📄 Cargando póliza ID: ${policyId.value}`)
        const policy = await getAccountingPolicyById(policyId.value)
        
        if (policy) {
            // Asignar entries
            entries.value = policy.entries.map(entry => ({
                ...entry,
                id: entry.id || crypto.randomUUID()
            }))
            
            // Setear valores del formulario
            setValues({
                folio: policy.folio,
                date: policy.date,
                typeId: policy.typeId,
                concept: policy.concept,
                entries: entries.value
            })
            
            console.log(`✅ Póliza cargada: ${policy.folio}`)
        } else {
            showNotification('Póliza no encontrada', 'error')
            router.push('/contabilidad/polizas-contables')
        }
    } catch (error) {
        console.error('Error al cargar póliza:', error)
        showNotification('Error al cargar la póliza', 'error')
        router.push('/contabilidad/polizas-contables')
    } finally {
        loading.value = false
    }
}

const onSubmit = handleSubmit(async (formValues) => {
    try {
        // Calcular total y status
        const totalDebitValue = entries.value.reduce((sum, entry) => sum + (Number(entry.debit) || 0), 0)
        const totalCreditValue = entries.value.reduce((sum, entry) => sum + (Number(entry.credit) || 0), 0)
        const isBalancedValue = Math.abs(totalDebitValue - totalCreditValue) < 0.01 && totalDebitValue > 0
        
        const completeFormData = {
            ...formValues,
            id: policyId.value,
            total: totalDebitValue,
            status: isBalancedValue ? 'Cuadrada' as const : 'Descuadrada' as const,
            entries: entries.value
        }
        
        const result = await updateAccountingPolicy(completeFormData)
        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            router.push('/contabilidad/polizas-contables')
        }
    } catch (error) {
        console.error('Error al actualizar póliza:', error)
        showNotification('Error al actualizar la póliza', 'error')
    }
})

const cancelar = () => {
    router.push('/contabilidad/polizas-contables')
}

onMounted(async () => {
    try {
        // Cargar opciones
        const response = await getAccountingPolicyTypes()
        typeOptions.value = response.map((type: SelectOptionDTO) => ({
            id: type.id,
            label: type.label
        }))
        
        accountOptions.value = await getAllAccountsForSelect()
        
        // Cargar póliza a editar
        await loadPolicy()
    } catch (error) {
        console.error('Error al cargar opciones:', error)
        showNotification('Error al cargar las opciones', 'error')
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <span class="loading loading-spinner loading-lg"></span>
            <span class="ml-3">Cargando póliza...</span>
        </div>

        <!-- Formulario -->
        <template v-else>
            <!-- Header -->
            <div class="flex items-center justify-between">
                <BaseTitle 
                    title="Editar Póliza Contable" 
                    subtitle="Modifica los datos de la póliza contable"
                />
                <div class="flex gap-2">
                    <BaseButton
                        text="Cancelar"
                        icon="close"
                        variant="ghost"
                        @click="cancelar"
                    />
                    <BaseButton
                        text="Actualizar Póliza"
                        icon="save"
                        variant="primary"
                        :disabled="isSubmitting || !isBalanced"
                        @click="onSubmit"
                    />
                </div>
            </div>

            <!-- Alerta si no está cuadrada -->
            <div v-if="!isBalanced && totalDebit > 0" class="alert alert-warning">
                <span class="material-symbols-outlined">warning</span>
                <span>La póliza debe estar cuadrada para poder guardarla. Verifica que el total de debe sea igual al total de haber.</span>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="onSubmit" class="space-y-6">
                <!-- Encabezado -->
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body">
                        <h3 class="card-title text-lg mb-4">
                            <span class="material-symbols-outlined text-primary">description</span>
                            Encabezado
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <BaseFormSelect
                                name="typeId"
                                label="Tipo de Póliza"
                                :options="typeOptions"
                                :required="true"
                            />
                            <BaseFormInput
                                name="date"
                                type="date"
                                label="Fecha"
                                :required="true"
                            />
                            <BaseFormInput
                                name="folio"
                                type="text"
                                label="Folio"
                                placeholder="D-001"
                                :required="true"
                            />
                        </div>
                        <div class="mt-4">
                            <BaseTextArea
                                name="concept"
                                label="Concepto General"
                                placeholder="Descripción general de la operación..."
                                :rows="3"
                                :required="true"
                            />
                        </div>
                    </div>
                </div>

                <!-- Partidas -->
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="card-title text-lg">
                                    <span class="material-symbols-outlined text-secondary">list_alt</span>
                                    Partidas
                                </h3>
                                <p class="text-sm text-gray-500 mt-1">
                                    Modifica los movimientos de la póliza
                                </p>
                            </div>
                            <BaseButton
                                icon="add"
                                variant="outline"
                                text="Agregar Partida"
                                @click="addEntry"
                                type="button"
                            />
                        </div>

                        <!-- Tabla de partidas -->
                        <div class="overflow-x-auto">
                            <table class="table table-sm">
                                <thead class="bg-base-200">
                                    <tr>
                                        <th class="w-[250px]">Cuenta</th>
                                        <th>Descripción</th>
                                        <th class="text-right w-[120px]">Debe</th>
                                        <th class="text-right w-[120px]">Haber</th>
                                        <th class="w-[120px]">Referencia</th>
                                        <th class="w-[60px]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(entry, index) in entries" :key="entry.id">
                                        <td>
                                            <select
                                                v-model="entry.account"
                                                class="select select-sm select-bordered w-full"
                                                @change="setFieldValue(`entries.${index}.account`, entry.account)"
                                            >
                                                <option value="">Seleccione cuenta</option>
                                                <option 
                                                    v-for="acc in accountOptions" 
                                                    :key="acc.id" 
                                                    :value="acc.code"
                                                    :disabled="!acc.acceptsMovements"
                                                >
                                                    {{ acc.label }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                v-model="entry.description"
                                                placeholder="Descripción..."
                                                class="input input-sm input-bordered w-full"
                                                @input="setFieldValue(`entries.${index}.description`, entry.description)"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                v-model.number="entry.debit"
                                                placeholder="0.00"
                                                step="0.01"
                                                class="input input-sm input-bordered w-full text-right font-mono"
                                                @input="setFieldValue(`entries.${index}.debit`, entry.debit)"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                v-model.number="entry.credit"
                                                placeholder="0.00"
                                                step="0.01"
                                                class="input input-sm input-bordered w-full text-right font-mono"
                                                @input="setFieldValue(`entries.${index}.credit`, entry.credit)"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                v-model="entry.reference"
                                                placeholder="REF-001"
                                                class="input input-sm input-bordered w-full"
                                                @input="setFieldValue(`entries.${index}.reference`, entry.reference)"
                                            />
                                        </td>
                                        <td>
                                            <BaseButton
                                                icon="delete"
                                                variant="ghost"
                                                text=""
                                                class-name="btn-sm text-error"
                                                :disabled="entries.length === 1"
                                                @click="removeEntry(entry.id)"
                                                type="button"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Validación en tiempo real -->
                        <div class="flex items-center justify-between p-4 rounded-lg border bg-base-200 mt-4">
                            <div class="flex items-center gap-6">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Total Debe</p>
                                    <p class="text-2xl font-bold font-mono">
                                        ${{ formatCurrency(totalDebit) }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Total Haber</p>
                                    <p class="text-2xl font-bold font-mono">
                                        ${{ formatCurrency(totalCredit) }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Diferencia</p>
                                    <p 
                                        class="text-2xl font-bold font-mono"
                                        :class="difference === 0 ? 'text-success' : 'text-error'"
                                    >
                                        ${{ formatCurrency(difference) }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span
                                    v-if="isBalanced"
                                    class="material-symbols-outlined text-success text-3xl"
                                >
                                    check_circle
                                </span>
                                <span
                                    v-else
                                    class="material-symbols-outlined text-error text-3xl"
                                >
                                    error
                                </span>
                                <div class="text-right">
                                    <span
                                        v-if="isBalanced"
                                        class="font-semibold text-success"
                                    >
                                        Póliza Cuadrada
                                    </span>
                                    <span v-else class="font-semibold text-error">
                                        Póliza Descuadrada
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 mt-4">
                            <BaseButton
                                icon="attach_file"
                                variant="outline"
                                text="Adjuntar Documentos"
                                type="button"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </div>
</template>
