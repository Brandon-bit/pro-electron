import useAccountingPoliciesStore from '@/modules/Contabilidad/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, detailTableButton, deleteTableButton } from '@/utils/tableButtons'
import { useRouter } from 'vue-router'

const useAccountingPolicies = () => {
    const router = useRouter()

    const getTableColumns = (): ColumnTableType[] => {
        const policiesStore = useAccountingPoliciesStore()
        const modalStore = useModalStore()

        return [
            {
                header: 'Folio',
                accessorKey: 'folio',
                cell: ({ row }: any) => {
                    return h(
                        'span',
                        {
                            class: 'font-semibold text-primary'
                        },
                        row.original.folio
                    )
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'date',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.date)
                    return h(
                        'span',
                        {
                            class: 'text-sm'
                        },
                        date.toLocaleDateString('es-MX')
                    )
                }
            },
            {
                header: 'Tipo',
                accessorKey: 'type',
                cell: ({ row }: any) => {
                    const type = row.original.type
                    const badgeClass =
                        type === 'Ingreso'
                            ? 'badge-success'
                            : type === 'Egreso'
                            ? 'badge-error'
                            : 'badge-info'

                    return h(
                        'span',
                        {
                            class: `badge ${badgeClass}`
                        },
                        type
                    )
                }
            },
            {
                header: 'Concepto',
                accessorKey: 'concept',
                cell: ({ row }: any) => {
                    return h(
                        'span',
                        {
                            class: 'text-sm text-gray-700 truncate max-w-xs'
                        },
                        row.original.concept
                    )
                }
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: ({ row }: any) => {
                    const total = row.original.total
                    return h(
                        'span',
                        {
                            class: 'font-medium'
                        },
                        `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )
                }
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    const isBalanced = status === 'Cuadrada'

                    return h(
                        'span',
                        {
                            class: `badge ${isBalanced ? 'badge-success' : 'badge-warning'}`
                        },
                        status
                    )
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original

                    const handleDetail = () => {
                        policiesStore.setData(data)
                        policiesStore.setEditMode(false)
                        modalStore.open(policiesStore.modalId, {
                            type: 'DETAIL',
                            title: `Póliza ${data.folio}`
                        })
                    }

                    const handleEdit = () => {
                        // Navegar a la vista de edición
                        router.push(`/contabilidad/polizas-contables/edit/${data.id}`)
                    }

                    const handleDelete = () => {
                        policiesStore.setData(data)
                        modalStore.open(policiesStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar póliza contable'
                        })
                    }

                    const detailButton = detailTableButton(handleDetail)
                    const editButton = editTableButton(handleEdit)
                    const deleteButton = deleteTableButton(handleDelete)

                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        detailButton,
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]
    }

    return { 
        getTableColumns 
    }
}

export default useAccountingPolicies
