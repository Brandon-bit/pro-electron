# Anuales (Annual Declarations) Module

Complete module for managing annual tax declarations with 6 specialized tabs for different fiscal obligations.

## 📁 Folder Structure

```
Anuales/
├── components/                          # Tab components
│   ├── InflationAdjustmentTab.vue      # Inflation adjustment
│   ├── CreditsTab.vue                  # Average credit balance
│   ├── DebtsTab.vue                    # Average debt balance
│   ├── ProfitCoefficientTab.vue        # Profit coefficient
│   ├── AccountingReconciliationTab.vue # Accounting reconciliation
│   └── AnnualISRTab.vue                # Annual ISR declaration
├── services/                            # API service calls
│   └── annualDeclarationService.ts
├── store/                               # Pinia state management
│   └── annualDeclarationStore.ts
├── types/                               # TypeScript type definitions
│   └── annualDeclarationTypes.ts
├── views/                               # Main view component
│   └── AnnualDeclarationsView.vue
├── index.ts                             # Module exports
└── README.md                            # This file
```

## 🎯 Features

### **6 Specialized Tabs**

#### **1. Ajuste Anual por Inflación**
- Calculation of annual inflation adjustment
- Average credits and debts tracking
- Inflation rate application
- Determines if adjustment is taxable or deductible

**Formula:**
```
Inflation Adjustment = (Average Credits - Average Debts) × Inflation Rate
```

#### **2. Saldo Promedio de Créditos**
- Monthly credit balance tracking
- Average balance calculation
- Accounts receivable management
- Investment tracking

**Purpose:**
- Required for inflation adjustment calculation
- Tracks financial assets throughout the year

#### **3. Saldo Promedio de Deudas**
- Monthly debt balance tracking
- Average balance calculation
- Accounts payable management
- Loan tracking

**Purpose:**
- Required for inflation adjustment calculation
- Tracks financial liabilities throughout the year

#### **4. Coeficiente de Utilidad**
- Profit coefficient calculation
- Based on previous year's results
- Used for provisional payments

**Formula:**
```
Coefficient = Taxable Profit / Nominal Income
```

**Application:**
- Applied to current year provisional payments
- Updated annually

#### **5. Conciliación Contable Fiscal**
- Reconciliation between accounting and tax results
- Tax additions tracking
- Tax deductions tracking
- Final taxable profit determination

**Process:**
```
1. Accounting Profit
2. (+) Tax Additions
3. (-) Tax Deductions
= Taxable Profit
```

#### **6. ISR Anual**
- Annual ISR declaration
- Tax calculation
- Provisional payments deduction
- Final payment or favor balance

**Calculation:**
```
1. Taxable Profit
2. × ISR Rate (30%)
3. = ISR Caused
4. (-) Provisional Payments
= ISR to Pay or Favor Balance
```

## 🚀 Usage

### Importing the Main View

```typescript
import { AnnualDeclarationsView } from '@/modules/Fiscal/Anuales'
```

### Using the Store

```typescript
import useAnnualDeclarationStore from '@/modules/Fiscal/Anuales/store/annualDeclarationStore'

const annualDeclarationStore = useAnnualDeclarationStore()
annualDeclarationStore.setActiveTab('inflation-adjustment')
annualDeclarationStore.setSelectedYear(2025)
```

## 📊 Data Structure

### Inflation Adjustment Type

```typescript
{
    id: number
    year: number
    averageCredits: number
    averageDebts: number
    inflationRate: number
    inflationAdjustment: number
    adjustmentType: 'Acumulable' | 'Deducible'
}
```

### Profit Coefficient Type

```typescript
{
    id: number
    year: number
    totalIncome: number
    totalDeductions: number
    taxableProfit: number
    coefficient: number
    applicableYear: number
}
```

### Annual ISR Type

```typescript
{
    id: number
    year: number
    taxableProfit: number
    isrRate: number
    isrAmount: number
    provisionalPayments: number
    isrToPay: number
    favorBalance: number
    status: 'Borrador' | 'Presentada' | 'Pagada'
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
- 6 specialized tabs
- Horizontal scrollable on mobile
- Active tab highlighting
- Smooth transitions

### **Information Cards**
- Each tab has explanatory content
- Info alerts with context
- Formula displays
- Process descriptions

### **Responsive Design**
- Mobile-friendly tabs
- Horizontal scroll for small screens
- Custom scrollbar styling
- Optimized layout

## 📱 Features Matching React Component

✅ **Header** - Title and subtitle
✅ **6 Tabs** - All tabs implemented
✅ **Tab Navigation** - Grid layout on desktop
✅ **Card Layout** - Each tab in a card
✅ **Descriptions** - CardDescription equivalent
✅ **Content Areas** - Placeholder content
✅ **Responsive** - Mobile-friendly
✅ **Clean Design** - Minimal and professional

## 📊 Tab Comparison

### **React Component:**
```tsx
<TabsList className="grid w-full grid-cols-6">
  <TabsTrigger value="ajuste-inflacion">Ajuste anual por inflación</TabsTrigger>
  <TabsTrigger value="creditos">Saldo promedio de créditos</TabsTrigger>
  <TabsTrigger value="deudas">Saldo promedio de deudas</TabsTrigger>
  <TabsTrigger value="coeficiente">Coeficiente de utilidad</TabsTrigger>
  <TabsTrigger value="conciliacion">Conciliación contable fiscal</TabsTrigger>
  <TabsTrigger value="isr">ISR anual</TabsTrigger>
</TabsList>
```

### **Vue Component:**
```vue
<div role="tablist" class="tabs tabs-bordered">
  <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'inflation-adjustment' }">
    Ajuste anual por inflación
  </a>
  <!-- ... 5 more tabs -->
</div>
```

## 🔄 State Management

The module uses Pinia for state management:
- `annualDeclarationStore` - Manages active tab and selected year
- Simple and efficient state updates
- Persistent across navigation

## 🌐 API Integration

All API calls are centralized in `services/annualDeclarationService.ts`:
- `getInflationAdjustmentService` - Fetch inflation adjustment data
- `saveInflationAdjustmentService` - Save inflation adjustment
- `getCreditBalancesService` - Fetch credit balances
- `saveCreditBalanceService` - Save credit balance
- `getDebtBalancesService` - Fetch debt balances
- `saveDebtBalanceService` - Save debt balance
- `getProfitCoefficientService` - Fetch profit coefficient
- `saveProfitCoefficientService` - Save profit coefficient
- `getAccountingReconciliationService` - Fetch reconciliation
- `saveAccountingReconciliationService` - Save reconciliation
- `getAnnualISRService` - Fetch annual ISR
- `saveAnnualISRService` - Save annual ISR
- `submitAnnualISRService` - Submit ISR declaration

## 🎯 SAT Compliance

The module follows Mexican SAT requirements:
- Annual inflation adjustment (Art. 44 LISR)
- Credit and debt average balances
- Profit coefficient calculation
- Accounting-tax reconciliation
- Annual ISR declaration (Art. 9 LISR)
- Deadline: March 31st of following year

## 📝 Workflow

1. **Select Tab**: Choose the obligation to work on
2. **Review Info**: Read the explanatory alerts
3. **Enter Data**: Input required information
4. **Calculate**: System performs calculations
5. **Save**: Store the information
6. **Submit**: Present to SAT when ready

## 💡 Tips

- **Complete in order**: Follow the natural flow of tabs
- **Start with credits/debts**: Required for inflation adjustment
- **Calculate coefficient**: Needed for next year's provisionals
- **Reconcile carefully**: Ensures accurate taxable profit
- **Review before submit**: ISR declaration is final

## 📐 Key Calculations

### **Inflation Adjustment**
```
Adjustment = (Avg Credits - Avg Debts) × Inflation Rate
If positive: Taxable (Acumulable)
If negative: Deductible (Deducible)
```

### **Profit Coefficient**
```
Coefficient = Taxable Profit ÷ Nominal Income
Applied to: Next year's provisional payments
```

### **Annual ISR**
```
ISR = Taxable Profit × 30%
Final = ISR - Provisional Payments
```

## 🔐 Security

- Protected API endpoints
- Year-based data isolation
- Audit trail for all changes
- Role-based access control

## 🎨 Design Features

- **Horizontal Tabs**: All 6 tabs visible on desktop
- **Scrollable**: Horizontal scroll on mobile
- **Custom Scrollbar**: Styled for better UX
- **Active Highlighting**: Clear visual feedback
- **Card Layout**: Consistent design pattern
- **Info Alerts**: Contextual help in each tab
- **Material Icons**: Professional iconography

## 📱 Responsive Behavior

- **Desktop**: 6 tabs in grid layout
- **Tablet**: Horizontal scroll with visible tabs
- **Mobile**: Swipeable tab navigation
- **Touch-friendly**: Large tap targets
- **Optimized**: Fast tab switching

## 🚀 Future Enhancements

Each tab is ready for:
- Forms and data entry
- Tables and data display
- Calculations and validations
- Reports and exports
- SAT integration
- Historical data viewing
