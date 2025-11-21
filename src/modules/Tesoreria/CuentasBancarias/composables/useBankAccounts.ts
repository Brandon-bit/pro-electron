import useBankAccountStore from '@/modules/Tesoreria/CuentasBancarias/store/bankAccountStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h, ref } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useBankAccounts = () => {
    const bankAccountStore = useBankAccountStore()
    const modalStore = useModalStore()

    // Estado para controlar qué filas muestran el saldo
    const visibleBalances = ref<Set<number>>(new Set())

    const toggleBalanceVisibility = (id: number) => {
        if (visibleBalances.value.has(id)) {
            visibleBalances.value.delete(id)
        } else {
            visibleBalances.value.add(id)
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount)
    }

    const columns: ColumnTableType[] = [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Banco',
            accessorKey: 'bankName'
        },
        {
            header: 'Tipo de Cuenta',
            accessorKey: 'accountTypeName'
        },
        {
            header: 'Número de Cuenta',
            accessorKey: 'accountNumber',
            cell: ({ row }: any) => {
                const accountNumber = row.original.accountNumber
                const isVisible = visibleBalances.value.has(row.original.id)

                return h('div', { class: 'flex items-center justify-center gap-2' }, [
                    h('span', isVisible ? accountNumber : '••••••••••••' + accountNumber.slice(-4)),
                    h(
                        'button',
                        {
                            onClick: () => toggleBalanceVisibility(row.original.id),
                            class: 'btn btn-ghost btn-xs'
                        },
                        [
                            h(
                                'span',
                                { class: 'material-symbols-outlined text-info' },
                                isVisible ? 'visibility' : 'visibility_off'
                            )
                        ]
                    )
                ])
            }
        },
        {
            header: 'Saldo Actual',
            accessorKey: 'currentBalance',
            cell: ({ row }: any) => {
                const isVisible = visibleBalances.value.has(row.original.id)
                const balance = row.original.currentBalance
                const isNegative = balance < 0

                return h('div', { class: 'flex items-center justify-center gap-2' }, [
                    h(
                        'span',
                        {
                            class: isNegative
                                ? 'text-error font-semibold'
                                : 'text-success font-semibold'
                        },
                        isVisible ? formatCurrency(balance) : '••••••'
                    )
                ])
            }
        },
        {
            header: 'Estado',
            accessorKey: 'active',
            cell: ({ row }: any) => {
                const isActive = row.original.active
                return h(
                    'span',
                    {
                        class: `badge ${isActive ? 'badge-success' : 'badge-error'}`
                    },
                    isActive ? 'Activo' : 'Inactivo'
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    bankAccountStore.setData(data)
                    modalStore.open(bankAccountStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar cuenta bancaria'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]

    return {
        columns,
        visibleBalances
    }
}
