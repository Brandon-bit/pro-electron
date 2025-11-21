import { AccountTypeDTO, AccountTypeFormDTO, SelectOptionDTO } from '@/modules/Tesoreria/TiposCuenta/types/accountTypeTypes'

export const mapAccountTypeToSelectOption = (accountType: AccountTypeDTO): SelectOptionDTO => {
    return {
        id: accountType.id!,
        label: accountType.name
    }
}

export const mapAccountTypeFormToBackend = (formData: AccountTypeFormDTO) => {
    return {
        name: formData.name,
        description: formData.description || null,
        active: formData.active
    }
}