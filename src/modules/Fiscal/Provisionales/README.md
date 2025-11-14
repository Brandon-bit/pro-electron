# Provisionales (Provisional Payments) Module

Complete module for managing provisional tax payments (ISR and VAT) with KPIs, tabs, calculation info, and full management functionality.

## 📁 Folder Structure

```
Provisionales/
├── components/                      # Vue components
│   ├── KPICard.vue                 # KPI display card
│   ├── DueDateAlert.vue            # Due date warning alert
│   ├── CalculationInfoCard.vue     # ISR calculation info
│   └── VATInfoCard.vue             # VAT information card
├── composables/                     # Business logic and utilities
│   ├── mappingProvisionalPaymentData.ts
│   ├── useProvisionalPayment.ts
│   └── useProvisionalPaymentActions.ts
├── services/                        # API service calls
│   └── provisionalPaymentService.ts
├── store/                           # Pinia state management
│   └── provisionalPaymentStore.ts
├── types/                           # TypeScript type definitions
│   └── provisionalPaymentTypes.ts
├── views/                           # Main view component
│   └── ProvisionalPaymentsView.vue
├── index.ts                         # Module exports
└── README.md                        # This file
```

## 🎯 Features

### **Dashboard with KPIs**
- **ISR Provisional**: Current month provisional ISR amount
- **IVA a Pagar**: Current month VAT to pay
- **Coeficiente de Utilidad**: Profit coefficient from previous year
- **Próximo Pago**: Next payment due date

### **Tabs System**
- **Pagos Provisionales ISR**: ISR provisional payments history
- **Declaraciones IVA**: VAT declarations history

### **ISR Provisional Payments Tab**
Displays complete payment history with:
- Period
- Income
- Deductions
- Taxable Profit
- ISR amount
- VAT amount
- Total to pay
- Due date
- Status (Pagado/Pendiente/Vencido)
- Download action

**Calculation Info Card** showing:
- Calculation base formula
- Profit coefficient
- ISR provisional rate (30%)
- VAT rate (16%)

### **VAT Declarations Tab**
Displays VAT history with:
- Period
- Collected VAT (green)
- Creditable VAT (blue)
- Favor balance
- VAT to pay
- Due date
- Status
- Download action

**VAT Info Card** explaining:
- What is VAT
- How it works
- Calculation formula

### **Status Management**
- **Pagado**: Paid declarations (green badge with check icon)
- **Pendiente**: Pending declarations (yellow badge with pending icon)
- **Vencido**: Overdue declarations (red badge with error icon)

## 🚀 Usage

### Importing the Main View

```typescript
import { ProvisionalPaymentsView } from '@/modules/Fiscal/Provisionales'
```

### Using the Store

```typescript
import useProvisionalPaymentStore from '@/modules/Fiscal/Provisionales/store/provisionalPaymentStore'

const provisionalPaymentStore = useProvisionalPaymentStore()
provisionalPaymentStore.setActiveTab('isr')
provisionalPaymentStore.setSelectedProvisionalPayment(payment)
```

### Using Actions

```typescript
import { useProvisionalPaymentActions } from '@/modules/Fiscal/Provisionales/composables/useProvisionalPaymentActions'

const { getProvisionalPayments, getVATDeclarations, generateDeclaration } = useProvisionalPaymentActions()
```

## 📊 Data Structure

### Provisional Payment Type

```typescript
{
    id: number
    period: string
    income: number
    deductions: number
    taxableProfit: number
    isr: number
    vat: number
    total: number
    dueDate: Date
    status: ProvisionalPaymentStatusType
}
```

### VAT Declaration Type

```typescript
{
    id: number
    period: string
    collectedVAT: number
    creditableVAT: number
    favorBalance: number
    vatToPay: number
    dueDate: Date
    status: ProvisionalPaymentStatusType
}
```

## 🎨 UI Components Used

- `BaseTitle` - Page title component
- `BaseButton` - Action buttons
- `BaseTable` - Data table with pagination
- `KPICard` - Custom KPI display card
- `DueDateAlert` - Custom alert component
- `CalculationInfoCard` - ISR calculation info
- `VATInfoCard` - VAT information
- Material Symbols Icons - Icon system
- DaisyUI Tabs - Tab navigation

## 📋 Main Features

### **View ISR Payments**
1. Click "Pagos Provisionales ISR" tab
2. View complete payment history
3. See calculation method below table
4. Download payment receipts

### **View VAT Declarations**
1. Click "Declaraciones IVA" tab
2. View VAT declaration history
3. See VAT information below table
4. Download declaration receipts

### **Generate Declaration**
1. Click "Generar Declaración" button
2. Select period and type (ISR/IVA)
3. System generates declaration
4. Download or submit to SAT

### **Download Receipt**
1. Click download button on any row
2. System generates PDF receipt
3. File downloads automatically

## 🔧 Configuration

The module uses environment variables for API configuration:

```env
VITE_API_URL=your_api_url
```

## 📱 Features Matching React Component

✅ **KPI Cards** - 4 cards showing key metrics
✅ **Due Date Alert** - Warning for upcoming deadline
✅ **Tabs System** - ISR and IVA tabs
✅ **ISR Table** - Complete table with all columns
✅ **IVA Table** - Complete table with all columns
✅ **Status Badges** - Color-coded with icons
✅ **Calculation Info** - ISR calculation method
✅ **VAT Info** - VAT explanation card
✅ **Download Buttons** - Per row download action
✅ **Responsive Design** - Mobile-friendly layout

## 📊 Comparación Visual

### **React Component:**
```tsx
<Tabs defaultValue="isr">
  <TabsList>
    <TabsTrigger value="isr">Pagos Provisionales ISR</TabsTrigger>
    <TabsTrigger value="iva">Declaraciones IVA</TabsTrigger>
  </TabsList>
</Tabs>
```

### **Vue Component:**
```vue
<div role="tablist" class="tabs tabs-bordered">
  <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'isr' }">
    Pagos Provisionales ISR
  </a>
  <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'iva' }">
    Declaraciones IVA
  </a>
</div>
```

## 🔄 State Management

The module uses Pinia for state management:
- `provisionalPaymentStore` - Manages payments, declarations, and active tab
- `modalStore` (shared) - Manages modal visibility

## 🌐 API Integration

All API calls are centralized in `services/provisionalPaymentService.ts`:
- `getProvisionalPaymentsService` - Fetch ISR payments
- `getVATDeclarationsService` - Fetch VAT declarations
- `getProvisionalPaymentKPIsService` - Fetch KPI data
- `getCalculationInfoService` - Fetch calculation info
- `generateDeclarationService` - Generate new declaration
- `downloadDeclarationService` - Download receipt
- `markAsPaidService` - Mark as paid
- `deleteProvisionalPaymentService` - Delete pending payment

## 🎯 SAT Compliance

The module follows Mexican SAT requirements:
- Monthly provisional payments
- ISR calculation based on profit coefficient
- VAT calculation (collected - creditable)
- Deadline tracking (17th of each month)
- Payment reference tracking

## 📝 Workflow

1. **View KPIs**: Check current month amounts and next due date
2. **Check Alert**: Review upcoming deadline warning
3. **Select Tab**: Choose ISR or IVA tab
4. **Review History**: View all previous declarations
5. **Generate New**: Create new declaration if needed
6. **Download**: Download receipts for records
7. **Track Status**: Monitor payment status

## 💡 Tips

- **Pay on time**: Declarations are due on the 17th of each month
- **Keep records**: Download all receipts for accounting
- **Check calculations**: Review calculation info for accuracy
- **Monitor status**: Track pending and overdue payments
- **Use profit coefficient**: Updated annually from previous year

## 📐 Calculation Formulas

### **ISR Provisional**
```
Taxable Profit = Income - Deductions
ISR = Taxable Profit × Profit Coefficient × 30%
```

### **VAT**
```
VAT to Pay = Collected VAT - Creditable VAT
If result is negative: Favor Balance
```

## 🔐 Security

- Protected API endpoints
- Secure payment tracking
- Audit trail for all actions
- Role-based access control
