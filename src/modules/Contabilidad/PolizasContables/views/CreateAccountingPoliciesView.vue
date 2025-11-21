<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'

const router = useRouter()
const accountingPoliciesStore = useAccountingPoliciesStore()

// 🔄 Resetear formulario al abrir
onMounted(() => {
  accountingPoliciesStore.resetSelectedPolicy()
})

// 🔽 Estados para secciones contraíbles
const showHeader = ref(true)
const showEntries = ref(true)

const toggleHeader = () => (showHeader.value = !showHeader.value)
const toggleEntries = () => (showEntries.value = !showEntries.value)

const typeOptions = [
  { id: 'Diario', label: 'Diario' },
  { id: 'Ingreso', label: 'Ingreso' },
  { id: 'Egreso', label: 'Egreso' }
]

const accountOptions = [
  { id: '1101 - Caja', label: '1101 - Caja' },
  { id: '1102 - Bancos', label: '1102 - Bancos' },
  { id: '1201 - Equipo de Cómputo', label: '1201 - Equipo de Cómputo' },
  { id: '1202 - Mobiliario y Equipo', label: '1202 - Mobiliario y Equipo' },
  { id: '2101 - Proveedores', label: '2101 - Proveedores' },
  { id: '4000 - Ingresos', label: '4000 - Ingresos' },
  { id: '5000 - Gastos', label: '5000 - Gastos' }
]

const totalDebit = computed(() => accountingPoliciesStore.totalDebit)
const totalCredit = computed(() => accountingPoliciesStore.totalCredit)
const isBalanced = computed(() => accountingPoliciesStore.isBalanced)
const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const formatCurrency = (amount: number) =>
  amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })

const goBack = () => {
  router.push('/contabilidad/polizas-contables')
}
</script>

<template>
  <div class="xl:max-w-[90%] mx-auto p-4 md:p-8 space-y-8">
    <h2 class="text-center text-2xl font-bold mb-6">Crear Nueva Póliza Contable</h2>

    <!-- 🔻 Sección Encabezado -->
    <div class="p-6 rounded-lg border bg-base-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Encabezado</h3>
        <button type="button" @click="toggleHeader" class="btn btn-ghost btn-sm">
          <span
            class="material-symbols-outlined transition-transform duration-200"
            :class="{ 'rotate-180': showHeader }"
          >
            expand_more
          </span>
        </button>
      </div>

      <transition name="fade">
        <div v-show="showHeader" class="grid grid-cols-12 gap-4">
          <BaseFormSelect
            name="type"
            label="Tipo de Póliza"
            :options="typeOptions"
            v-model="accountingPoliciesStore.selectedPolicy.type"
            class="col-span-12 md:col-span-4"
          />
          <BaseFormInput
            name="date"
            type="date"
            label="Fecha"
            v-model="accountingPoliciesStore.selectedPolicy.date"
            class="col-span-12 md:col-span-4"
          />
          <BaseFormInput
            name="folio"
            label="Folio"
            placeholder="D-001"
            v-model="accountingPoliciesStore.selectedPolicy.folio"
            class="col-span-12 md:col-span-4"
          />
          <BaseTextArea
            name="concept"
            label="Concepto General"
            v-model="accountingPoliciesStore.selectedPolicy.concept"
            class="col-span-12"
            placeholder="Descripción general de la operación..."
          />
        </div>
      </transition>
    </div>

    <!-- 🔻 Sección Partidas -->
    <div class="p-6 rounded-lg border bg-base-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Partidas</h3>
        <div class="flex items-center gap-2">
          <!-- ✅ Evita conflicto con el toggle -->
          <button
            type="button"
            @click.stop="accountingPoliciesStore.addEntry()"
            class="btn btn-outline btn-sm"
          >
            <span class="material-symbols-outlined">add</span> Agregar Partida
          </button>
          <!-- 🔽 Botón contraer -->
          <button type="button" @click="toggleEntries" class="btn btn-ghost btn-sm">
            <span
              class="material-symbols-outlined transition-transform duration-200"
              :class="{ 'rotate-180': showEntries }"
            >
              expand_more
            </span>
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-show="showEntries">
          <transition-group name="fade" tag="div" class="overflow-x-auto">
            <table class="table table-sm w-full">
              <thead class="bg-base-200">
                <tr>
                  <th class="w-[250px]">Cuenta</th>
                  <th>Descripción</th>
                  <th class="w-[120px] text-right">Debe</th>
                  <th class="w-[120px] text-right">Haber</th>
                  <th class="w-[120px]">Referencia</th>
                  <th class="w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="entry in accountingPoliciesStore.selectedPolicy.entries"
                  :key="entry.id"
                >
                  <td>
                    <select
                      v-model="entry.account"
                      class="select select-sm select-bordered w-full"
                    >
                      <option value="">Seleccione cuenta</option>
                      <option v-for="acc in accountOptions" :key="acc.id" :value="acc.id">
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
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model.number="entry.debit"
                      placeholder="0.00"
                      step="0.01"
                      class="input input-sm input-bordered w-full text-right font-mono"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      v-model.number="entry.credit"
                      placeholder="0.00"
                      step="0.01"
                      class="input input-sm input-bordered w-full text-right font-mono"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="entry.reference"
                      placeholder="REF-001"
                      class="input input-sm input-bordered w-full"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      @click="accountingPoliciesStore.removeEntry(entry.id)"
                      :disabled="accountingPoliciesStore.selectedPolicy.entries.length === 1"
                      class="btn btn-ghost btn-sm text-error"
                    >
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </transition-group>

          <!-- Totales -->
          <div
            class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border bg-base-200 mt-4 gap-4"
          >
            <div class="flex gap-6">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Debe</p>
                <p class="text-2xl font-bold font-mono">${{ formatCurrency(totalDebit) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Total Haber</p>
                <p class="text-2xl font-bold font-mono">${{ formatCurrency(totalCredit) }}</p>
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
                >check_circle</span
              >
              <span
                v-else
                class="material-symbols-outlined text-error text-3xl"
                >error</span
              >
              <div class="text-right">
                <span v-if="isBalanced" class="font-semibold text-success">Póliza Cuadrada</span>
                <span v-else class="font-semibold text-error">Póliza Descuadrada</span>
              </div>
            </div>
          </div>

          <!-- Adjuntos -->
          <div class="flex gap-2 mt-4">
            <button type="button" class="btn btn-outline">
              <span class="material-symbols-outlined">attach_file</span> Adjuntar Documentos
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Botones de acción -->
    <div class="flex justify-end gap-4 mt-6">
      <BaseButton text="Regresar" @click="goBack" variant="ghost" />
      <BaseButton text="Guardar Póliza" variant="primary" />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
