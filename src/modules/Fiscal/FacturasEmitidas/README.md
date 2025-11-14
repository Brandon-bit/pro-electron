# Facturas Emitidas Module

Complete module for managing issued invoices (CFDI) with KPIs, filters, and full CRUD functionality according to Mexican SAT regulations.

## 📁 Folder Structure

```
FacturasEmitidas/
├── components/              # Vue components
│   ├── KPICard.vue         # KPI display card
│   ├── InvoiceFilters.vue  # Search and filter component
│   ├── AddEditForm.vue     # Invoice creation/edit form
│   ├── InvoiceItemsForm.vue # Invoice items/concepts form
│   ├── DeleteInvoice.vue   # Delete confirmation
│   ├── InvoiceModal.vue    # Main modal for CRUD operations
│   ├── InvoiceDetailModal.vue # Invoice detail view
│   └── CancelInvoiceModal.vue # Invoice cancellation
├── composables/            # Business logic and utilities
│   ├── mappingInvoiceData.ts
│   ├── useInvoice.ts
│   └── useInvoiceActions.ts
├── services/              # API service calls
│   └── invoiceService.ts
├── store/                 # Pinia state management
│   └── invoiceStore.ts
├── types/                 # TypeScript type definitions
│   └── invoiceTypes.ts
├── validations/           # Zod validation schemas
│   └── invoiceValidation.ts
├── views/                 # Main view component
│   └── IssuedInvoicesView.vue
├── index.ts              # Module exports
└── README.md             # This file
```

## 🎯 Features

### **Dashboard with KPIs**
- **Total Facturado**: Total invoiced amount for the month
- **Facturas Emitidas**: Number of invoices issued
- **IVA Cobrado**: Total tax collected
- **Pendientes de Cobro**: Outstanding invoices

### **Advanced Filters**
- Search by folio, client name, or UUID
- Date range filter (from/to)
- Export to Excel functionality
- Real-time filtering

### **Invoice Management**
- Create draft invoices with multiple items/concepts
- Edit draft invoices before stamping
- Delete draft invoices
- View detailed invoice information
- Stamp invoices (timbrado) to convert to valid CFDI
- Cancel stamped invoices with reason
- Download PDF and XML files

### **Invoice Items**
- Add/remove multiple concepts dynamically
- Calculate subtotals, taxes (IVA 16%), and totals automatically
- Support for discounts
- Product/service codes (clave SAT)

### **Status Management**
- **Borrador**: Draft invoices (editable)
- **Timbrada**: Valid stamped invoices
- **Cancelada**: Canceled invoices
- **Pagada**: Paid invoices
- **Vencida**: Overdue invoices

## 🚀 Usage

### Importing the Main View

```typescript
import { IssuedInvoicesView } from '@/modules/Fiscal/FacturasEmitidas'
```

### Using the Store

```typescript
import useInvoiceStore from '@/modules/Fiscal/FacturasEmitidas/store/invoiceStore'

const invoiceStore = useInvoiceStore()
invoiceStore.setData(invoice)
invoiceStore.setFilters({ dateFrom: '2025-01-01', dateTo: '2025-12-31' })
```

### Using Actions

```typescript
import { useInvoiceActions } from '@/modules/Fiscal/FacturasEmitidas/composables/useInvoiceActions'

const { getInvoices, getKPIs, createInvoice, stampInvoice } = useInvoiceActions()
```

## 📊 Data Structure

### Invoice Type

```typescript
{
    id: number
    folio: string
    serie: string
    uuid: string
    clientName: string
    clientRfc: string
    issueDate: Date
    subtotal: number
    tax: number
    total: number
    currency: string
    status: InvoiceStatusType
    items: InvoiceItemType[]
}
```

### KPI Type

```typescript
{
    title: string
    value: string
    subtitle: string
    icon: string
    color: string
}
```

## 🎨 UI Components Used

- `BaseTitle` - Page title component
- `BaseButton` - Action buttons
- `BaseTable` - Data table with pagination
- `BaseModal` - Modal wrapper
- `BaseFormInput` - Text/number inputs
- `BaseFormSelect` - Select dropdowns
- `BaseTextArea` - Multiline text input
- `KPICard` - Custom KPI display card
- `InvoiceFilters` - Custom filter component
- Material Symbols Icons - Icon system

## 📋 Form Fields

### Client Information
- Client Name (required)
- Client RFC (required, validated format)

### Invoice Information
- Serie (required)
- Issue Date (required)
- Payment Date (optional)
- Currency (MXN, USD, EUR)

### Payment Information
- Payment Method (PUE, PPD)
- Payment Form (01-Efectivo, 03-Transferencia, etc.)
- CFDI Use (G01, G03, I01, P01, etc.)

### Invoice Items (Dynamic)
- Quantity (required)
- Unit (required)
- Product/Service Code (required)
- Description (required)
- Unit Price (required)
- Discount (optional)
- **Total calculated automatically**

## 🔧 Configuration

The module uses environment variables for API configuration:

```env
VITE_API_URL=your_api_url
```

## 📱 Features Matching React Component

✅ **KPI Cards** - 4 cards showing key metrics
✅ **Search and Filters** - Search bar with date range filters
✅ **Export Button** - Export invoices to Excel
✅ **Table View** - Complete table with all invoice data
✅ **Status Badges** - Color-coded status indicators
✅ **Action Buttons** - View and download actions per row
✅ **Responsive Design** - Mobile-friendly layout

## ✅ Validation

Form validation using Zod schemas:
- RFC format validation (Mexican tax ID)
- Required fields validation
- Number range validation
- Array length validation (min 1 item, max 100 items)

## 🔄 State Management

The module uses Pinia for state management:
- `invoiceStore` - Manages invoice data, selected invoice, and filters
- `modalStore` (shared) - Manages modal visibility

## 🌐 API Integration

All API calls are centralized in `services/invoiceService.ts`:
- `getInvoicesService` - Fetch invoices with filters
- `getInvoiceKPIsService` - Fetch KPI data
- `createInvoiceService` - Create new invoice
- `updateInvoiceService` - Update draft invoice
- `stampInvoiceService` - Stamp invoice (timbrado)
- `cancelInvoiceService` - Cancel invoice
- `downloadPdfService` - Download PDF
- `downloadXmlService` - Download XML
- `sendInvoiceByEmailService` - Send by email
- `deleteInvoiceService` - Delete draft invoice
- `exportInvoicesService` - Export to Excel

## 🎯 SAT Compliance

The module follows Mexican SAT requirements:
- CFDI 4.0 structure
- Valid payment methods and forms
- Product/service codes (clave SAT)
- CFDI use codes
- RFC validation
- UUID tracking
- Cancellation reasons

## 🔐 Security

- Input validation on all forms
- RFC format validation
- Amount validation
- Secure file downloads
- Protected API endpoints

## 📝 Next Steps

1. **Connect API**: Update service methods with real endpoints
2. **Test KPIs**: Verify KPI calculations with real data
3. **Add More Filters**: Status filter, amount range, etc.
4. **Email Integration**: Implement send by email functionality
5. **Reports**: Add additional reporting features
