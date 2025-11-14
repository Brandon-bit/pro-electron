import { useRouter } from 'vue-router'
import type { AccountType } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

const useAccountCatalog = () => {
    const router = useRouter()

    const openEditView = (account: any) => {
        router.push(`/contabilidad/catalogo-de-cuentas/edit/${account.id}`)
    }

    const openCreateView = () => {
        router.push('/contabilidad/catalogo-de-cuentas/create')
    }

    const openDeleteModal = (account: any) => {
        // TODO: Implementar modal de confirmación de eliminación
        console.log('Delete account:', account)
    }

    const getTypeVariant = (type: string) => {
        const variants: Record<string, string> = {
            'Grupo': 'badge-primary',
            'Subgrupo': 'badge-secondary',
            'Cuenta': 'badge-accent',
            'Subcuenta': 'badge-neutral'
        }
        return variants[type] || 'badge-ghost'
    }

    const getNatureVariant = (nature: string) => {
        return nature === 'Deudora' ? 'badge-info' : 'badge-warning'
    }

    /**
     * Filtra las cuentas de forma recursiva según un término de búsqueda
     */
    const filterAccounts = (accountsList: AccountType[], searchTerm: string): AccountType[] => {
        if (!searchTerm) return accountsList
        
        const search = searchTerm.toLowerCase()
        
        return accountsList.filter(account => {
            const matches = 
                account.code.toLowerCase().includes(search) ||
                account.name.toLowerCase().includes(search)
            
            if (matches) return true
            
            if (account.subaccounts && account.subaccounts.length > 0) {
                const filteredSubs = filterAccounts(account.subaccounts, searchTerm)
                return filteredSubs.length > 0
            }
            
            return false
        }).map(account => {
            if (account.subaccounts && account.subaccounts.length > 0) {
                return {
                    ...account,
                    subaccounts: filterAccounts(account.subaccounts, searchTerm)
                }
            }
            return account
        })
    }

    return {
        openEditView,
        openCreateView,
        openDeleteModal,
        getTypeVariant,
        getNatureVariant,
        filterAccounts
    }
}

export default useAccountCatalog
