import { h } from 'vue'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import useUserStore from '@/modules/DefaultModule/Usuarios/Lista/store/userStore'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useUser = () => {
    
    const modalStore = useModalStore()
    const userStore = useUserStore()
    
    const getTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'Nombre',
                accessorKey: 'name'
            },
            {
                header: 'Correo',
                accessorKey: 'email'
            },
            {
                header: 'Teléfono',
                accessorKey: 'phone',
                cell: ({ row }: any) => {
                    return h('span', {}, row.original.phone || '')
                }
            },
            {
                header: 'Puesto',
                accessorKey: 'position'
            },
            {
                header: 'Área',
                accessorKey: 'area'
            },
            {
                header: 'Tipo',
                accessorKey: 'type',
                cell: ({ row }: any) => {
                    const type = row.original.type
                    const badgeClass = type === 'Admin' ? 'badge-error' : type === 'Member' ? 'badge-info' : 'badge-ghost'
                    return h('span', { class: `badge ${badgeClass}` }, type)
                }
            },
            {
                header: 'Roles',
                accessorKey: 'roles',
                cell: ({ row }: any) => {
                    const roles = row.original.roles
                    const getRoleBadge = (role: string) => {
                        const badgeClasses: Record<string, string> = {
                            'Admin': 'badge-error',
                            'Líder': 'badge-warning',
                            'Manager': 'badge-success',
                            'Sponsor': 'badge-secondary',
                            'Procesos': 'badge-accent',
                            'Auditor': 'badge-neutral',
                            'TI': 'badge-info'
                        }
                        return badgeClasses[role] || 'badge-ghost'
                    }
                    
                    const badges = roles.map((role: string) => 
                        h('span', { 
                            class: `badge badge-sm ${getRoleBadge(role)}`,
                            key: role 
                        }, role)
                    )
                    return h('div', { class: 'flex flex-wrap gap-1' }, badges)
                }
            },
            {
                id: 'actions',
                header: '',
                accessorKey: 'id',
                cell: ({ row }: any) => {
                    const user = row.original
                    
                    const editModal = () => {
                        userStore.setData(user)
                        modalStore.open(userStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar usuario'
                        })
                    }
                    
                    const detailModal = () => {
                        userStore.setData(user)
                        modalStore.open(userStore.deleteModalId, {
                            type: 'DELETE',
                            title: 'Detalle de usuario'
                        })
                    }
                    
                    const editButton = editTableButton(editModal)
                    const detailButton = h('button', {
                        class: 'btn btn-sm btn-outline btn-info gap-1',
                        onClick: detailModal
                    }, [
                        h('span', { class: 'material-symbols-outlined text-sm' }, 'visibility'),
                        'Detalle'
                    ])
                    
                    return h('div', { class: 'flex gap-2 justify-end' }, [
                        editButton,
                        detailButton
                    ])
                }
            }
        ]
    }

    return { getTableColumns }
}

export default useUser
