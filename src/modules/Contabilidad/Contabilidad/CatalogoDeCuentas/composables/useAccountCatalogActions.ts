import type { AccountType, SelectOptionDTO, AccountMaskConfig, AccountOptionDTO, AccountFormType } from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import useAccountsCatalogStore from '@/modules/Contabilidad/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'
import { useAccountTypesActions } from '@contabilidad/Configuracion/AccountTypes/composables/useAccountTypesActions'
import { useAccountNatureActions } from '@contabilidad/Configuracion/AccountNature/composables/useAccountNatureActions'
import { useAccountClasificationActions } from '@contabilidad/Configuracion/AccountClasification/composables/useAccountClasificationActions'
import useGeneralConfigStore from '@contabilidad/Configuracion/GeneralConfig/store/generalConfigStore'

// Mock data para empresas financieras (formato de 5 segmentos)
const mockAccountsFinanciera: AccountType[] = [
    {
        id: 1,
        code: '0000-00-00-00-01',
        name: 'Activo',
        typeId: 3,
        type: 'Titulo',
        natureId: 1,
        nature: 'Deudora',
        clasificationId: 1,
        clasification: 'Balance',
        SATCode: '',
        parentId: 0,
        parent: '',
        levelId: 1,
        level: 1,
        balance: 0,
        currencyId: 1,
        currency: 'MXN - Peso Mexicano',
        acceptsMovements: false,
        requiresAuxiliary: false,
        active: true,
        subaccounts: [
            {
                id: 2,
                code: '0000-00-00-00-02',
                name: 'DISPONIBILIDADES',
                typeId: 4,
                type: 'Subtitulo',
                natureId: 1,
                nature: 'Deudora',
                clasificationId: 1,
                clasification: 'Balance',
                SATCode: '',
                parentId: 1,
                parent: 'Activo',
                levelId: 2,
                level: 2,
                balance: 0,
                currencyId: 1,
                currency: 'MXN - Peso Mexicano',
                acceptsMovements: false,
                requiresAuxiliary: false,
                active: true,
                subaccounts: [
                    {
                        id: 3,
                        code: '1101-00-00-00-01',
                        name: 'CAJA',
                        typeId: 1,
                        type: 'Mayor',
                        natureId: 1,
                        nature: 'Deudora',
                        clasificationId: 1,
                        clasification: 'Balance',
                        SATCode: '101',
                        parentId: 2,
                        parent: 'DISPONIBILIDADES',
                        levelId: 3,
                        level: 3,
                        balance: 0,
                        currencyId: 1,
                        currency: 'MXN - Peso Mexicano',
                        acceptsMovements: false,
                        requiresAuxiliary: false,
                        active: true,
                        subaccounts: [
                            {
                                id: 4,
                                code: '1101-01-00-00-02',
                                name: 'Caja Corporativo',
                                typeId: 2,
                                type: 'Detalle',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '101.01',
                                parentId: 3,
                                parent: 'CAJA',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: true,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: []
                            }
                        ]
                    },
                    {
                        id: 5,
                        code: '1101-01-00-00-03',
                        name: 'BANCOS',
                        typeId: 1,
                        type: 'Mayor',
                        natureId: 1,
                        nature: 'Deudora',
                        clasificationId: 1,
                        clasification: 'Balance',
                        SATCode: '102',
                        parentId: 2,
                        parent: 'DISPONIBILIDADES',
                        levelId: 3,
                        level: 3,
                        balance: 0,
                        currencyId: 1,
                        currency: 'MXN - Peso Mexicano',
                        acceptsMovements: false,
                        requiresAuxiliary: false,
                        active: true,
                        subaccounts: [
                            {
                                id: 6,
                                code: '1101-01-00-00-04',
                                name: 'Depósitos en otras Entidades Financieras',
                                typeId: 1,
                                type: 'Mayor',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '102.01',
                                parentId: 5,
                                parent: 'BANCOS',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: false,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: [
                                    {
                                        id: 7,
                                        code: '1101-01-00-00-05',
                                        name: 'STP Cheques M.N. 1102-0201-0000 STP',
                                        typeId: 2,
                                        type: 'Detalle',
                                        natureId: 1,
                                        nature: 'Deudora',
                                        clasificationId: 1,
                                        clasification: 'Balance',
                                        SATCode: '102.01',
                                        parentId: 6,
                                        parent: 'Depósitos en otras Entidades Financieras',
                                        levelId: 5,
                                        level: 5,
                                        balance: 0,
                                        currencyId: 1,
                                        currency: 'MXN - Peso Mexicano',
                                        acceptsMovements: true,
                                        requiresAuxiliary: false,
                                        active: true,
                                        subaccounts: []
                                    },
                                    {
                                        id: 8,
                                        code: '1101-01-00-00-06',
                                        name: 'Albo Cheques M.N. ALBO',
                                        typeId: 2,
                                        type: 'Detalle',
                                        natureId: 1,
                                        nature: 'Deudora',
                                        clasificationId: 1,
                                        clasification: 'Balance',
                                        SATCode: '102.01',
                                        parentId: 6,
                                        parent: 'Depósitos en otras Entidades Financieras',
                                        levelId: 5,
                                        level: 5,
                                        balance: 0,
                                        currencyId: 1,
                                        currency: 'MXN - Peso Mexicano',
                                        acceptsMovements: true,
                                        requiresAuxiliary: false,
                                        active: true,
                                        subaccounts: []
                                    }
                                ]
                            },
                            {
                                id: 9,
                                code: '1102-03-00-00-00',
                                name: 'Divisas a entregar',
                                typeId: 2,
                                type: 'Detalle',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '102.01',
                                parentId: 5,
                                parent: 'BANCOS',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: true,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

// Mock data para empresas tradicionales (formato de 6 segmentos)
const mockAccountsTradicional: AccountType[] = [
    {
        id: 1,
        code: '1000-00-00-00-00-00',
        name: 'Activo',
        typeId: 3,
        type: 'Titulo',
        natureId: 1,
        nature: 'Deudora',
        clasificationId: 1,
        clasification: 'Balance',
        SATCode: '',
        parentId: 0,
        parent: '',
        levelId: 1,
        level: 1,
        balance: 0,
        currencyId: 1,
        currency: 'MXN - Peso Mexicano',
        acceptsMovements: false,
        requiresAuxiliary: false,
        active: true,
        subaccounts: [
            {
                id: 2,
                code: '1000-00-01-00-00-00',
                name: 'Activo a corto plazo',
                typeId: 4,
                type: 'Subtitulo',
                natureId: 1,
                nature: 'Deudora',
                clasificationId: 1,
                clasification: 'Balance',
                SATCode: '',
                parentId: 1,
                parent: 'Activo',
                levelId: 2,
                level: 2,
                balance: 0,
                currencyId: 1,
                currency: 'MXN - Peso Mexicano',
                acceptsMovements: false,
                requiresAuxiliary: false,
                active: true,
                subaccounts: [
                    {
                        id: 3,
                        code: '1001-00-00-00-00-00',
                        name: 'Caja',
                        typeId: 1,
                        type: 'Mayor',
                        natureId: 1,
                        nature: 'Deudora',
                        clasificationId: 1,
                        clasification: 'Balance',
                        SATCode: '101',
                        parentId: 2,
                        parent: 'Activo a corto plazo',
                        levelId: 3,
                        level: 3,
                        balance: 0,
                        currencyId: 1,
                        currency: 'MXN - Peso Mexicano',
                        acceptsMovements: false,
                        requiresAuxiliary: false,
                        active: true,
                        subaccounts: [
                            {
                                id: 4,
                                code: '1001-01-00-00-00-00',
                                name: 'Caja y Efectivo',
                                typeId: 2,
                                type: 'Detalle',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '101.01',
                                parentId: 3,
                                parent: 'Caja',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: true,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: []
                            }
                        ]
                    },
                    {
                        id: 5,
                        code: '1002-00-00-00-00-00',
                        name: 'Bancos',
                        typeId: 1,
                        type: 'Mayor',
                        natureId: 1,
                        nature: 'Deudora',
                        clasificationId: 1,
                        clasification: 'Balance',
                        SATCode: '102',
                        parentId: 2,
                        parent: 'Activo a corto plazo',
                        levelId: 3,
                        level: 3,
                        balance: 0,
                        currencyId: 1,
                        currency: 'MXN - Peso Mexicano',
                        acceptsMovements: false,
                        requiresAuxiliary: false,
                        active: true,
                        subaccounts: [
                            {
                                id: 6,
                                code: '1002-01-00-00-00-00',
                                name: 'Bancos Nacionales',
                                typeId: 1,
                                type: 'Mayor',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '102.01',
                                parentId: 5,
                                parent: 'Bancos',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: false,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: [
                                    {
                                        id: 7,
                                        code: '1002-01-02-00-00-00',
                                        name: 'Banco Mifel',
                                        typeId: 2,
                                        type: 'Detalle',
                                        natureId: 1,
                                        nature: 'Deudora',
                                        clasificationId: 1,
                                        clasification: 'Balance',
                                        SATCode: '102.01',
                                        parentId: 6,
                                        parent: 'Bancos Nacionales',
                                        levelId: 5,
                                        level: 5,
                                        balance: 0,
                                        currencyId: 1,
                                        currency: 'MXN - Peso Mexicano',
                                        acceptsMovements: true,
                                        requiresAuxiliary: false,
                                        active: true,
                                        subaccounts: []
                                    },
                                    {
                                        id: 8,
                                        code: '1002-01-02-02-00-00',
                                        name: 'Banco Base',
                                        typeId: 2,
                                        type: 'Detalle',
                                        natureId: 1,
                                        nature: 'Deudora',
                                        clasificationId: 1,
                                        clasification: 'Balance',
                                        SATCode: '',
                                        parentId: 6,
                                        parent: 'Bancos Nacionales',
                                        levelId: 5,
                                        level: 5,
                                        balance: 0,
                                        currencyId: 1,
                                        currency: 'MXN - Peso Mexicano',
                                        acceptsMovements: true,
                                        requiresAuxiliary: false,
                                        active: true,
                                        subaccounts: []
                                    }
                                ]
                            },
                            {
                                id: 9,
                                code: '1002-02-00-00-00-00',
                                name: 'Bancos Extranjeros',
                                typeId: 2,
                                type: 'Detalle',
                                natureId: 1,
                                nature: 'Deudora',
                                clasificationId: 1,
                                clasification: 'Balance',
                                SATCode: '102.02',
                                parentId: 5,
                                parent: 'Bancos',
                                levelId: 4,
                                level: 4,
                                balance: 0,
                                currencyId: 1,
                                currency: 'MXN - Peso Mexicano',
                                acceptsMovements: true,
                                requiresAuxiliary: false,
                                active: true,
                                subaccounts: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


// DEPRECATED: Arrays movidos a módulos de configuración
// typeOptions -> AccountTypes
// natureOptions -> AccountNature
// clasificationOptions -> AccountClasification

const levelOptions: SelectOptionDTO[] = [
    { id: 1, label: 'Nivel 1' },
    { id: 2, label: 'Nivel 2' },
    { id: 3, label: 'Nivel 3' },
    { id: 4, label: 'Nivel 4' },
    { id: 5, label: 'Nivel 5' },
    { id: 6, label: 'Nivel 6' },
    { id: 7, label: 'Nivel 7' },
    { id: 8, label: 'Nivel 8' }
]

const currencyOptions: SelectOptionDTO[] = [
    { id: 1, label: 'MXN - Peso Mexicano' },
    { id: 2, label: 'USD - Dólar' },
    { id: 3, label: 'EUR - Euro' }
]


export const useAccountCatalogActions = () => {
    const accountsCatalogStore = useAccountsCatalogStore()
    const generalConfigStore = useGeneralConfigStore()

    /**
     * Obtiene el catálogo de cuentas según el tipo de empresa
     */
    const getAccountsCatalog = async (): Promise<AccountType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Obtener tipo de empresa actual del store
        const companyType = generalConfigStore.getCompanyType
        const isFinancial = generalConfigStore.isFinancialCompany
        
        // Devolver mock accounts según tipo de empresa
        const accounts = isFinancial 
            ? mockAccountsFinanciera 
            : mockAccountsTradicional
        
        console.log(`📊 GET /api/contabilidad/catalogo-cuentas`)
        console.log(`Tipo de empresa: ${companyType}`)
        console.log(`Es financiera: ${isFinancial}`)
        console.log(`Mock seleccionado: ${isFinancial ? 'mockAccountsFinanciera' : 'mockAccountsTradicional'}`)
        console.log(`Cuentas cargadas: ${accounts.length} (raíz)`)
        
        // Log detallado de las primeras cuentas para verificar
        if (accounts.length > 0) {
            console.log(`Primera cuenta: ${accounts[0].code} - ${accounts[0].name}`)
            if (accounts[0].subaccounts && accounts[0].subaccounts.length > 0) {
                console.log(`Primera subcuenta: ${accounts[0].subaccounts[0].code} - ${accounts[0].subaccounts[0].name}`)
            }
        }
        
        return accounts
    }

    const getTypeOptions = async (): Promise<SelectOptionDTO[]> => {
        // Consumir desde módulo de configuración
        const { getAccountTypeOptions } = useAccountTypesActions()
        return await getAccountTypeOptions()
    }

    const getNatureOptions = async (): Promise<SelectOptionDTO[]> => {
        // Consumir desde módulo de configuración
        const { getAccountNatureOptions } = useAccountNatureActions()
        return await getAccountNatureOptions()
    }

    const getLevelOptions = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return levelOptions
    }

    const getCurrencyOptions = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return currencyOptions
    }

    const getClasificationOptions = async (): Promise<SelectOptionDTO[]> => {
        // Consumir desde módulo de configuración
        const { getAccountClasificationOptions } = useAccountClasificationActions()
        return await getAccountClasificationOptions()
    }

    /**
     * Función recursiva para aplanar todas las cuentas con sus subcuentas
     * Genera indentación visual según el nivel jerárquico
     */
    const flattenAllAccounts = (accounts: AccountType[], level: number = 1): AccountOptionDTO[] => {
        const result: AccountOptionDTO[] = []
        
        for (const account of accounts) {
            // Crear indentación según nivel (espacios o caracteres especiales)
            const indent = '　'.repeat(level - 1) // Usar espacios Unicode para mejor visualización
            
            // Crear etiqueta con formato jerárquico
            const label = `${indent}${account.code} - ${account.name}`
            
            // Añadir cuenta actual al resultado
            result.push({
                id: account.id || 0,
                code: account.code,
                name: account.name,
                label: label,
                level: account.level,
                acceptsMovements: account.acceptsMovements
            })
            
            // Si tiene subcuentas, procesarlas recursivamente
            if (account.subaccounts && account.subaccounts.length > 0) {
                const subAccounts = flattenAllAccounts(account.subaccounts, level + 1)
                result.push(...subAccounts)
            }
        }
        
        return result
    }

    /**
     * Obtiene todas las cuentas (incluyendo subcuentas) en un solo array plano
     * Ordenado jerárquicamente y formateado para select dropdown
     */
    const getAllAccountsForSelect = async (): Promise<AccountOptionDTO[]> => {
        // Obtener cuentas según tipo de empresa
        const accounts = await getAccountsCatalog()
        
        // Aplanar todas las cuentas con sus subcuentas
        const allAccounts = flattenAllAccounts(accounts)
        
        // Ordenar por código y luego por nivel para mantener el orden jerárquico
        return allAccounts.sort((a, b) => {
            // Primero ordenar por código numéricamente
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            
            if (codeA !== codeB) {
                return codeA - codeB
            }
            
            // Si códigos iguales, ordenar por nivel
            return a.level - b.level
        })
    }

    const getAccountById = async (id: number): Promise<AccountType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Obtener cuentas según tipo de empresa
        const accounts = await getAccountsCatalog()
        
        // Recursive function to find account by id
        const findAccount = (accountsList: AccountType[]): AccountType | null => {
            for (const account of accountsList) {
                if (account.id === id) return account
                if (account.subaccounts) {
                    const found = findAccount(account.subaccounts)
                    if (found) return found
                }
            }
            return null
        }
        
        return findAccount(accounts)
    }

    const createAccount = async (data: AccountFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Data para API de backend - CREATE
        const apiData = {
            method: 'POST',
            endpoint: '/api/accounts',
            payload: {
                code: data.code,
                name: data.name,
                parentId: data.parentId || null,
                typeId: data.typeId,
                natureId: data.natureId,
                levelId: data.levelId,
                currencyId: data.currencyId,
                clasificationId: data.clasificationId,
                SATCode: data.SATCode || null,
                acceptsMovements: data.acceptsMovements,
                requiresAuxiliary: data.requiresAuxiliary,
                active: data.active
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [TOKEN]'
            }
        }
        
        console.log('=== API CREATE ACCOUNT ===')
        console.log('Method:', apiData.method)
        console.log('Endpoint:', apiData.endpoint)
        console.log('Headers:', apiData.headers)
        console.log('Payload:', JSON.stringify(apiData.payload, null, 2))
        console.log('===========================')
        
        return {
            message: 'Cuenta creada correctamente',
            status: 'success'
        }
    }

    const updateAccount = async (id: number, data: AccountFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Data para API de backend - UPDATE
        const apiData = {
            method: 'PUT',
            endpoint: `/api/accounts/${id}`,
            urlParams: {
                id: id
            },
            payload: {
                code: data.code,
                name: data.name,
                parentId: data.parentId || null,
                typeId: data.typeId,
                natureId: data.natureId,
                levelId: data.levelId,
                currencyId: data.currencyId,
                clasificationId: data.clasificationId,
                SATCode: data.SATCode || null,
                acceptsMovements: data.acceptsMovements,
                requiresAuxiliary: data.requiresAuxiliary,
                active: data.active
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [TOKEN]'
            }
        }
        
        console.log('=== API UPDATE ACCOUNT ===')
        console.log('Method:', apiData.method)
        console.log('Endpoint:', apiData.endpoint)
        console.log('URL Params:', apiData.urlParams)
        console.log('Headers:', apiData.headers)
        console.log('Payload:', JSON.stringify(apiData.payload, null, 2))
        console.log('===========================')
        
        return {
            message: 'Cuenta actualizada correctamente',
            status: 'success'
        }
    }

    const deleteAccount = async (): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const id = accountsCatalogStore.selectedAccount?.id
        
        // Data para API de backend - DELETE
        const apiData = {
            method: 'DELETE',
            endpoint: `/api/accounts/${id}`,
            urlParams: {
                id: id
            },
            payload: null, // DELETE no necesita payload
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [TOKEN]'
            },
            queryParams: {
                // Parámetros opcionales para el borrado
                cascade: true, // Eliminar en cascada subcuentas
                softDelete: false // Borrado físico vs lógico
            }
        }
        
        console.log('=== API DELETE ACCOUNT ===')
        console.log('Method:', apiData.method)
        console.log('Endpoint:', apiData.endpoint)
        console.log('URL Params:', apiData.urlParams)
        console.log('Query Params:', apiData.queryParams)
        console.log('Headers:', apiData.headers)
        console.log('Payload:', apiData.payload)
        console.log('===========================')
        
        return {
            message: 'Cuenta eliminada correctamente',
            status: 'success'
        }
    }

    // Mock data para configuración de máscara
    const mockMaskConfig: AccountMaskConfig = {
        id: 'default',
        format: '0000-00-00-00-00-00',
        segments: [
            { id: '1', name: 'Grupo', digits: 4, description: 'Código de grupo principal' },
            { id: '2', name: 'Subgrupo', digits: 2, description: 'Código de subgrupo' },
            { id: '3', name: 'Mayor', digits: 2, description: 'Código de cuenta mayor' },
            { id: '4', name: 'Subcuenta', digits: 2, description: 'Código de subcuenta' },
            { id: '5', name: 'Auxiliar', digits: 2, description: 'Código de auxiliar' },
            { id: '6', name: 'Subauxiliar', digits: 2, description: 'Código de subauxiliar' }
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    /**
     * Obtiene la configuración de máscara de cuentas
     */
    const getAccountMaskConfig = async (): Promise<AccountMaskConfig> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('Getting account mask configuration')
        
        // En producción, aquí se haría la llamada al backend
        // Por ahora retornamos la configuración mock
        return mockMaskConfig
    }

    /**
     * Guarda la configuración de máscara de cuentas
     */
    const saveAccountMaskConfig = async (config: Partial<AccountMaskConfig>): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Saving account mask configuration:', config)
        
        // En producción, aquí se enviaría la configuración al backend
        // Por ahora solo mostramos log
        return {
            message: 'Configuración de máscara guardada correctamente',
            status: 'success'
        }
    }

    /**
     * Valida si un código cumple con el formato de máscara
     */
    const validateAccountCode = async (code: string, maskFormat: string): Promise<{ isValid: boolean; message: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('Validating account code:', code, 'with mask:', maskFormat)
        
        // Eliminar caracteres no numéricos
        const cleanCode = code.replace(/\D/g, '')
        const expectedDigits = maskFormat.replace(/-/g, '').length
        
        if (cleanCode.length !== expectedDigits) {
            return {
                isValid: false,
                message: `El código debe tener ${expectedDigits} dígitos`
            }
        }
        
        return {
            isValid: true,
            message: 'Código válido'
        }
    }

    /**
     * Importa un lote de cuentas desde un archivo Excel
     */
    const importAccountsFromExcel = async (accounts: Array<{
        code: string
        name: string
        accountType: string
        parentAccount: string
        nature: string
        classification: string
        satCode: string
        acceptsMovements: boolean
        currency?: string
    }>): Promise<{ success: boolean; message: string; imported: number; errors: number }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const companyType = generalConfigStore.getCompanyType
        let imported = 0
        let errors = 0
        
        console.log(`📤 POST /api/contabilidad/catalogo-cuentas/importar`)
        console.log(`Tipo de empresa: ${companyType}`)
        console.log(`Total de cuentas a importar: ${accounts.length}`)
        
        // Preparar datos para la API
        const apiData = {
            method: 'POST',
            endpoint: '/api/contabilidad/catalogo-cuentas/importar',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <token>'
            },
            payload: {
                companyType: companyType,
                accounts: accounts.map(acc => {
                    const accountData: any = {
                        code: acc.code,
                        name: acc.name,
                        accountType: acc.accountType,
                        parentAccount: acc.parentAccount || null,
                        nature: acc.nature,
                        classification: acc.classification,
                        satCode: acc.satCode || null,
                        acceptsMovements: acc.acceptsMovements
                    }
                    
                    // Para empresas financieras, forzar moneda MXN
                    if (generalConfigStore.isFinancialCompany) {
                        accountData.currency = 'MXN - Peso Mexicano'
                        accountData.currencyId = 1
                    } else {
                        // Para empresas tradicionales, usar la moneda especificada
                        accountData.currency = acc.currency || 'MXN - Peso Mexicano'
                    }
                    
                    return accountData
                }),
                options: {
                    validateCodes: true,
                    skipDuplicates: false,
                    createParents: true,
                    forceDefaultCurrency: generalConfigStore.isFinancialCompany
                }
            }
        }
        
        for (const account of accounts) {
            try {
                // Validar datos requeridos
                if (account.code && account.name) {
                    console.log(`  ✓ Importando: ${account.code} - ${account.name} (Afectable: ${account.acceptsMovements ? 'Sí' : 'No'})`)
                    imported++
                } else {
                    console.log(`  ✗ Error: Datos incompletos para cuenta ${account.code || 'SIN CÓDIGO'}`)
                    errors++
                }
            } catch (error) {
                console.log(`  ✗ Error: ${error}`)
                errors++
            }
        }
        
        console.log('=== RESUMEN DE IMPORTACIÓN ===')
        console.log(`Importadas: ${imported}`)
        console.log(`Errores: ${errors}`)
        console.log('Payload completo:', JSON.stringify(apiData.payload, null, 2))
        console.log('================================')
        
        return {
            success: imported > 0,
            message: `Se importaron ${imported} cuentas exitosamente`,
            imported,
            errors
        }
    }

    return {
        getAccountsCatalog,
        getAllAccountsForSelect,
        getTypeOptions,
        getNatureOptions,
        getLevelOptions,
        getCurrencyOptions,
        getClasificationOptions,
        getAccountById,
        createAccount,
        updateAccount,
        deleteAccount,
        getAccountMaskConfig,
        saveAccountMaskConfig,
        validateAccountCode,
        importAccountsFromExcel
    }
}
