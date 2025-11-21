import { BankDTO, BankFormDTO, SelectOptionDTO } from '@/modules/Tesoreria/Bancos/types/bankTypes'

export const mapBankToSelectOption = (bank: BankDTO): SelectOptionDTO => {
    return {
        id: bank.id!,
        label: bank.name
    }
}

export const mapBankFormToBackend = (formData: BankFormDTO) => {
    return {
        name: formData.name,
        code: formData.code || null,
        active: formData.active
    }
}
