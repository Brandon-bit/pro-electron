# Informativas (Informative Declarations) Module

Complete module for managing informative tax declarations with 5 specialized tabs for different fiscal obligations.

## 📁 Folder Structure

```
Informativas/
├── components/                          # Tab components
│   ├── DIOTTab.vue                     # DIOT declaration
│   ├── ElectronicAccountingTab.vue     # Electronic accounting
│   ├── InterestTab.vue                 # Interest declaration
│   ├── CashDepositsTab.vue             # Cash deposits declaration
│   └── TaxLossTab.vue                  # Tax loss declaration
├── services/                            # API service calls
│   └── informativeDeclarationService.ts
├── store/                               # Pinia state management
│   └── informativeDeclarationStore.ts
├── types/                               # TypeScript type definitions
│   └── informativeDeclarationTypes.ts
├── views/                               # Main view component
│   └── InformativeDeclarationsView.vue
├── index.ts                             # Module exports
└── README.md                            # This file
```

## 🎯 Features

### **5 Specialized Tabs**

#### **1. DIOT - Declaración Informativa de Operaciones con Terceros**
Monthly declaration reporting operations with suppliers.

**Information to report:**
- Supplier RFC
- Operation type
- Taxable base
- Transferred VAT
- Withheld VAT

**Purpose:**
- Track VAT operations with suppliers
- Required monthly
- Supports VAT deduction validation

#### **2. Contabilidad Electrónica (Electronic Accounting)**
Monthly submission of accounting information to SAT in XML format.

**Files to send:**
- Chart of accounts (Catálogo de cuentas)
- Trial balance (Balanza de comprobación)
- Journal entries (Pólizas del periodo)
- Account auxiliaries (Auxiliares de cuenta)
- Folio auxiliaries (Auxiliares de folios)

**Purpose:**
- Comply with Anexo 24 RMF
- Monthly obligation
- XML format required

#### **3. Informativa de Interés (Interest Declaration)**
Annual declaration of interest paid and received.

**Information to report:**
- Interest paid on loans
- Interest received on investments
- Financial institution
- Withheld ISR

**Purpose:**
- Annual obligation
- Reports financial interest
- Supports ISR deduction

#### **4. Informativa de Depósitos en Efectivo (Cash Deposits)**
Declaration of cash deposits exceeding $15,000 MXN.

**Information to report:**
- Deposit date
- Bank institution
- Account number
- Deposit amount
- Operation description

**Purpose:**
- Anti-money laundering compliance
- Monthly obligation
- Threshold: $15,000 MXN

#### **5. Quebranto (Tax Loss)**
Declaration of fiscal losses and their application.

**Information to report:**
- Fiscal loss of the year
- Pending losses to apply
- Losses applied in the year
- Remaining balance
- Inflation adjustment

**Purpose:**
- Track tax losses
- 10-year application period
- Annual obligation

## 🚀 Usage

### Importing the Main View

```typescript
import { InformativeDeclarationsView } from '@/modules/Fiscal/Informativas'
```

### Using the Store

```typescript
import useInformativeDeclarationStore from '@/modules/Fiscal/Informativas/store/informativeDeclarationStore'

const informativeDeclarationStore = useInformativeDeclarationStore()
informativeDeclarationStore.setActiveTab('diot')
informativeDeclarationStore.setSelectedYear(2025)
informativeDeclarationStore.setSelectedMonth(10)
```

## 📊 Data Structure

### DIOT Type

```typescript
{
    id: number
    period: string
    year: number
    month: number
    suppliers: DIOTSupplierType[]
    status: 'Borrador' | 'Generada' | 'Presentada'
}
```

### Electronic Accounting Type

```typescript
{
    id: number
    period: string
    year: number
    month: number
    catalogFile: string
    balanceFile: string
    trialBalanceFile: string
    policiesFile: string
    auxiliaryFile: string
    status: 'Pendiente' | 'Generada' | 'Enviada'
}
```

### Cash Deposit Type

```typescript
{
    date: Date
    accountNumber: string
    bankName: string
    amount: number
    description: string
}
```

## 🎨 UI Components Used

- `BaseTitle` - Page title component
- DaisyUI Tabs - Tab navigation system
- Cards - Content containers
- Alerts - Information and warnings
- Material Symbols Icons - Icon system

## 📋 Main Features

### **Tab Navigation**
- 5 specialized tabs
- Horizontal scrollable on mobile
- Active tab highlighting
- Smooth transitions

### **Information Cards**
- Each tab has explanatory content
- Info/Warning alerts with context
- Lists of required information
- Process descriptions

### **Responsive Design**
- Mobile-friendly tabs
- Horizontal scroll for small screens
- Custom scrollbar styling
- Optimized layout

## 📱 Features Matching React Component

✅ **Header** - Title and subtitle
✅ **5 Tabs** - All tabs implemented
✅ **Tab Navigation** - Grid layout on desktop
✅ **Card Layout** - Each tab in a card
✅ **Descriptions** - CardDescription equivalent
✅ **Content Areas** - Placeholder content
✅ **Responsive** - Mobile-friendly
✅ **Clean Design** - Minimal and professional

## 📊 Tab Comparison

### **React Component:**
```tsx
<TabsList className="grid w-full grid-cols-5">
  <TabsTrigger value="diot">DIOT</TabsTrigger>
  <TabsTrigger value="contabilidad">Contabilidad electrónica</TabsTrigger>
  <TabsTrigger value="interes">Informativa de interés</TabsTrigger>
  <TabsTrigger value="depositos">Informativa de depósitos en efectivo</TabsTrigger>
  <TabsTrigger value="quebranto">Quebranto</TabsTrigger>
</TabsList>
```

### **Vue Component:**
```vue
<div role="tablist" class="tabs tabs-bordered">
  <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'diot' }">
    DIOT
  </a>
  <!-- ... 4 more tabs -->
</div>
```

## 🔄 State Management

The module uses Pinia for state management:
- `informativeDeclarationStore` - Manages active tab, year, and month
- Simple and efficient state updates
- Persistent across navigation

## 🌐 API Integration

All API calls are centralized in `services/informativeDeclarationService.ts`:

**DIOT:**
- `getDIOTService` - Fetch DIOT data
- `generateDIOTService` - Generate DIOT
- `submitDIOTService` - Submit to SAT

**Electronic Accounting:**
- `getElectronicAccountingService` - Fetch data
- `generateElectronicAccountingService` - Generate files
- `sendElectronicAccountingService` - Send to SAT

**Interest:**
- `getInterestDeclarationService` - Fetch data
- `saveInterestDeclarationService` - Save declaration
- `submitInterestDeclarationService` - Submit to SAT

**Cash Deposits:**
- `getCashDepositsService` - Fetch deposits
- `saveCashDepositService` - Save deposit
- `submitCashDepositsService` - Submit to SAT

**Tax Loss:**
- `getTaxLossService` - Fetch tax loss
- `saveTaxLossService` - Save tax loss
- `submitTaxLossService` - Submit to SAT

## 🎯 SAT Compliance

The module follows Mexican SAT requirements:
- **DIOT**: Monthly (Art. 32 CFF)
- **Electronic Accounting**: Monthly (Anexo 24 RMF)
- **Interest**: Annual
- **Cash Deposits**: Monthly (Art. 55 LIVA)
- **Tax Loss**: Annual (Art. 57 LISR)

## 📝 Workflow

1. **Select Tab**: Choose the obligation to work on
2. **Review Info**: Read the explanatory alerts
3. **Enter/Generate Data**: Input or generate required information
4. **Review**: Verify the information
5. **Submit**: Present to SAT

## 💡 Tips

- **DIOT**: Generate from supplier invoices
- **Electronic Accounting**: Export from accounting system
- **Interest**: Collect from bank statements
- **Cash Deposits**: Monitor $15,000 threshold
- **Tax Loss**: Track for 10 years

## 📐 Key Obligations

### **Monthly**
- DIOT (17th of following month)
- Electronic Accounting (Last day of following month)
- Cash Deposits (If applicable)

### **Annual**
- Interest Declaration (February 15th)
- Tax Loss (With annual return)

## 🔐 Security

- Protected API endpoints
- Period-based data isolation
- Audit trail for all submissions
- Role-based access control

## 🎨 Design Features

- **Horizontal Tabs**: All 5 tabs visible on desktop
- **Scrollable**: Horizontal scroll on mobile
- **Custom Scrollbar**: Styled for better UX
- **Active Highlighting**: Clear visual feedback
- **Card Layout**: Consistent design pattern
- **Info Alerts**: Contextual help in each tab
- **Warning Alerts**: Important notices
- **Material Icons**: Professional iconography

## 📱 Responsive Behavior

- **Desktop**: 5 tabs in grid layout
- **Tablet**: Horizontal scroll with visible tabs
- **Mobile**: Swipeable tab navigation
- **Touch-friendly**: Large tap targets
- **Optimized**: Fast tab switching

## 🚀 Future Enhancements

Each tab is ready for:
- Forms and data entry
- Tables and data display
- File upload functionality
- XML generation
- SAT integration
- Historical data viewing
- Status tracking
- Deadline reminders
