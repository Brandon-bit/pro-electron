import useFixedAssetsStore from '@/modules/Contabilidad/Contabilidad/ActivosFijos/store/fixedAssetsStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { editTableButton, detailTableButton, deleteTableButton } from '@/utils/tableButtons'
import { useFixedAssetsActions } from '@/modules/Contabilidad/Contabilidad/ActivosFijos/composables/useFixedAssetsActions'

const useFixedAssets = () => {
    const fixedAssetsStore = useFixedAssetsStore()
    const modalStore = useModalStore()
    const router = useRouter()
    const { deleteFixedAsset } = useFixedAssetsActions()
    
    // Estado para el modal de eliminación
    const isDeleting = ref(false)

    // Funciones para manejar el modal de eliminación
    const handleDeleteConfirm = async (onRefresh?: () => void) => {
        isDeleting.value = true
        try {
            const result = await deleteFixedAsset()
            if (result.status === 'success') {
                modalStore.close('delete-fixed-asset-modal')
                onRefresh?.()
            }
        } catch (error) {
            console.error('Error al eliminar activo:', error)
        } finally {
            isDeleting.value = false
        }
    }

    const handleDeleteCancel = () => {
        modalStore.close('delete-fixed-asset-modal')
        fixedAssetsStore.setData()
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: ({ row }: any) => {
                    const id = row.original.id
                    return h('span', { class: 'font-medium' }, id)
                }
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                cell: ({ row }: any) => {
                    const description = row.original.description
                    return h('div', { class: 'max-w-xs truncate' }, description)
                }
            },
            {
                header: 'Fecha Adquisición',
                accessorKey: 'acquisitionDate',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.acquisitionDate)
                    return h('p', {}, date.toLocaleDateString('es-MX'))
                }
            },
            {
                header: 'Valor Original',
                accessorKey: 'originalValue',
                cell: ({ row }: any) => {
                    const value = row.original.originalValue
                    return h('span', { class: 'font-semibold' }, 
                        `$${value.toLocaleString('es-MX')}`
                    )
                }
            },
            {
                header: 'Área',
                accessorKey: 'area',
                enableColumnFilter: true,
                filterFn: 'includesString',
                cell: ({ row }: any) => {
                    const area = row.original.area
                    return h('span', { class: 'badge badge-outline' }, area)
                }
            },
            {
                header: 'Responsable',
                accessorKey: 'responsible'
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                enableColumnFilter: true,
                filterFn: 'equals',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    const isActive = status === 'Activo'
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Dado de baja')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const viewAction = () => {
                        fixedAssetsStore.setData(data)
                        // Navegar a la vista de consulta
                        router.push(`/contabilidad/activos-fijos/view/${data.id}`)
                    }

                    const editAction = () => {
                        fixedAssetsStore.setData(data)
                        // Navegar a la vista de edición
                        router.push(`/contabilidad/activos-fijos/edit/${data.id}`)
                    }

                    const deleteAction = () => {
                        fixedAssetsStore.setData(data)
                        modalStore.open('delete-fixed-asset-modal', {
                            type: 'DELETE',
                            title: 'Eliminar Activo Fijo'
                        })
                    }

                    const viewButton = detailTableButton(viewAction)
                    const editButton = editTableButton(editAction)
                    const deleteButton = deleteTableButton(deleteAction)

                    return h('div', { class: 'flex gap-2 justify-center' }, [viewButton, editButton, deleteButton])
                }
            }
        ]

        return columns
    }

    return { 
        getTableColumns,
        handleDeleteConfirm,
        handleDeleteCancel,
        isDeleting
    }
}

export default useFixedAssets
