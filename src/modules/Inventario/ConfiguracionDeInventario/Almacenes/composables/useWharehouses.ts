import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import useAlmacenStore from '../store/Wharehouses.store';
import { useModalStore } from '@/shared/stores/modal.store'
import { WarehouseType } from '../types/WharehousesTypes';

const useWarehouses = () => {

    const almacenStore = useAlmacenStore()
    const modalStore = useModalStore()

    const getWarehouseTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'Nombre',
                accessorKey: 'name'
            },
            {
                header: 'Responsable',
                accessorKey: 'responsible'
            },
            {
                header: 'Capacidad Total',
                accessorKey: 'totalCapacity'
            },
            {
                header: 'Zona',
                accessorKey: 'zone'
            },
            {
                header: 'Teléfono',
                accessorKey: 'phone'
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'fechaCreacion',
                cell: ({ row }: { row: { original: WarehouseType } }) => {
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
                cell: ({ row }: { row: { original: WarehouseType } }) => {
                    const isActive = row.original.active
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: { row: { original: WarehouseType } }) => {
                    const data = row.original

                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        // EDITAR
                        h('button', {
                            class: 'btn btn-outline btn-primary action-btn-table',
                            onClick: () => {
                                almacenStore.setSelectedAlmacen(data)
                                modalStore.open(almacenStore.modalId ?? 'default-modal', {
                                    type: 'EDIT',
                                    title: 'Editar Almacén'
                                })
                            }
                        }, h('span', { class: 'material-symbols-outlined' }, 'edit_square')),

                        // ELIMINAR
                       h('button', {
                            class: 'btn btn-outline btn-error action-btn-table',
                            onClick: () => {
                                almacenStore.setSelectedAlmacen(data)
                                modalStore.open(almacenStore.modalId ?? 'default-modal', {
                                    type: 'DELETE',
                                    title: 'Eliminar Almacén'
                                })
                            }
                        }, h('span', { class: 'material-symbols-outlined' }, 'delete'))
                    ])
                }
            }
        ]
    }

    return { getWarehouseTableColumns }
}

export default useWarehouses
