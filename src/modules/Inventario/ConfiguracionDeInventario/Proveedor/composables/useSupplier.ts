import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import useSupplierStore from '../store/supplier.store';
import { useModalStore } from '@/shared/stores/modal.store'
import { SupplierType } from '@inventario/ConfiguracionDeInventario/Proveedor/types/supplierTypes';

const useSupplier = () => {

    const supplierStore = useSupplierStore()
    const modalStore = useModalStore()

    const getSupplierTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'Razón Social',
                accessorKey: 'socialReason'
            },
            {
                header: 'Nombre Comercial',
                accessorKey: 'comercialName'
            },
            {
                header: 'RFC',
                accessorKey: 'rfc'
            },
            {
                header: 'Correo',
                accessorKey: 'email'
            },
            {
                header: 'Teléfono',
                accessorKey: 'phone'
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'fechaCreacion',
                cell: ({ row }: { row: { original: SupplierType } }) => {
                    const fecha = row.original.creationDate
                    if (!fecha) return ''

                    const d = new Date(fecha)
                    if (isNaN(d.getTime())) return ''

                    return h('span', {}, d.toISOString().split('T')[0])
                }
            },
            {
                header: 'Estado',
                accessorKey: 'active',
                cell: ({ row }: { row: { original: SupplierType } }) => {
                    const isActive = row.original.active
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: { row: { original: SupplierType } }) => {
                    const data = row.original

                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        // EDITAR
                        h('button', {
                            class: 'btn btn-outline btn-primary action-btn-table',
                            onClick: () => {
                                supplierStore.setSupplier(data)
                                modalStore.open(supplierStore.modalId, {
                                    type: 'EDIT',
                                    title: 'Editar Proveedor'
                                })
                            }
                        }, h('span', { class: 'material-symbols-outlined' }, 'edit_square')),

                        // ELIMINAR
                        h('button', {
                            class: 'btn btn-outline btn-error action-btn-table',
                            onClick: () => {
                                supplierStore.setSupplier(data)
                                modalStore.open(supplierStore.modalId, {
                                    type: 'DELETE',
                                    title: 'Eliminar Proveedor'
                                })
                            }
                        }, h('span', { class: 'material-symbols-outlined' }, 'delete'))
                    ])
                }
            }
        ]
    }

    return { getSupplierTableColumns }
}

export default useSupplier
