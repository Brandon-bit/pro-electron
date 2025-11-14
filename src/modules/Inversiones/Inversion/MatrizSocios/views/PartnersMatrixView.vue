<script setup lang="ts">
import { ref, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import DocumentsModal from '../components/DocumentsModal.vue'
import { usePartners } from '../composables/usePartners'
import type { Partner } from '../types/partnerTypes'

const { fetchPartners, setSelectedPartner } = usePartners()
const documentsModalRef = ref<InstanceType<typeof DocumentsModal> | null>(null)
const selectedPartnerName = ref('')

// Abrir modal de documentos
const openDocumentsModal = (partner: Partner) => {
    setSelectedPartner(partner)
    selectedPartnerName.value = partner.nombre
    documentsModalRef.value?.openModal()
}

// Botones de acción
const ActionButtons = (partner: Partner) => {
    return h('div', { class: 'flex gap-2' }, [
        h('button', {
            class: 'btn btn-info btn-sm',
            onClick: () => console.log('Detalle:', partner.id)
        }, [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'visibility'),
            'Detalle'
        ]),
        h('button', {
            class: 'btn btn-accent btn-sm',
            onClick: () => console.log('Contratos:', partner.id)
        }, [
            h('span', { class: 'material-symbols-outlined text-sm' }, 'article'),
            'Contratos'
        ])
    ])
}

// Progreso de documentación
const ProgressBar = (partner: Partner) => {
    const percentage = partner.estatusCarga * 100
    const colorClass = percentage === 100 ? 'bg-success' : 'bg-primary'
    
    return h('div', { class: 'flex items-center gap-2' }, [
        h('div', { class: 'w-full bg-base-300 rounded-full h-2' }, [
            h('div', {
                class: `${colorClass} h-2 rounded-full transition-all duration-300`,
                style: { width: `${percentage}%` }
            })
        ]),
        h('span', { class: 'text-xs font-semibold whitespace-nowrap' }, 
            `${partner.documentosCompletados} de ${partner.documentosTotales}`
        )
    ])
}

// Toggle de envío automático
const AutoSendToggle = (partner: Partner) => {
    return h('input', {
        type: 'checkbox',
        class: 'toggle toggle-primary',
        checked: partner.envioAutomatico,
        onChange: (e: Event) => {
            const target = e.target as HTMLInputElement
            console.log('Envío automático:', partner.id, target.checked)
        }
    })
}

// Definición de columnas
const columns: ColumnDef<Partner>[] = [
    {
        accessorKey: 'documentos',
        header: 'Documentos',
        cell: ({ row }) => {
            return h('button', {
                class: 'btn btn-sm btn-outline btn-primary',
                onClick: () => openDocumentsModal(row.original)
            }, [
                h('span', { class: 'material-symbols-outlined' }, 'description'),
                'Documentos'
            ])
        }
    },
    {
        accessorKey: 'estatusCarga',
        header: 'Estatus de carga',
        cell: ({ row }) => ProgressBar(row.original)
    },
    {
        accessorKey: 'envioAutomatico',
        header: 'Envío Automático',
        cell: ({ row }) => AutoSendToggle(row.original)
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre'
    },
    {
        accessorKey: 'codigo',
        header: 'Código'
    },
    {
        accessorKey: 'cuenta',
        header: 'Cuenta',
        cell: ({ row }) => row.original.cuenta || '-'
    },
    {
        accessorKey: 'telefono',
        header: 'Teléfono',
        cell: ({ row }) => row.original.telefono || '-'
    },
    {
        accessorKey: 'celular',
        header: 'Celular',
        cell: ({ row }) => row.original.celular || '-'
    },
    {
        accessorKey: 'correo',
        header: 'Correo'
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => ActionButtons(row.original)
    }
]
</script>

<template>
    <div>
        <BaseTitle 
            title="Matriz de socios" 
            subtitle="Gestión de socios registrados"
        />
        
        <BaseTable
            :headers="columns"
            :fetchCallback="fetchPartners"
        />

        <!-- Modal de Documentos -->
        <DocumentsModal
            ref="documentsModalRef"
            :partnerName="selectedPartnerName"
        />
    </div>
</template>
