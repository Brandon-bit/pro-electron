# Facturas Recibidas Module

Complete module for managing received invoices (supplier invoices) with KPIs, XML upload, validation, and full management functionality.

## 📁 Folder Structure

```
FacturasRecibidas/
├── components/                      # Vue components
│   ├── KPICard.vue                 # KPI display card
│   ├── ReceivedInvoiceFilters.vue  # Search and filter component
│   ├── InfoAlert.vue               # Information alert
│   ├── UploadXmlModal.vue          # XML file upload modal
│   ├── ReceivedInvoiceDetailModal.vue # Invoice detail view
│   └── RejectInvoiceModal.vue      # Invoice rejection modal
├── composables/                     # Business logic and utilities
│   ├── mappingReceivedInvoiceData.ts
│   ├── useReceivedInvoice.ts
│   └── useReceivedInvoiceActions.ts
├── services/                        # API service calls
│   └── receivedInvoiceService.ts
├── store/                           # Pinia state management
│   └── receivedInvoiceStore.ts
├── types/                           # TypeScript type definitions
│   └── receivedInvoiceTypes.ts
├── validations/                     # Zod validation schemas
│   └── receivedInvoiceValidation.ts
├── views/                           # Main view component
│   └── ReceivedInvoicesView.vue
├── index.ts                         # Module exports
└── README.md                        # This file
```

## 🎯 Features

### **Dashboard with KPIs**
- **Total Recibido**: Total received amount for the month
- **Facturas Recibidas**: Number of invoices received
- **IVA Acreditable**: Total creditable tax
- **Pendientes de Validar**: Invoices pending validation

### **XML Upload**
- Drag & drop XML file upload
- Automatic data extraction from XML
- File size validation (max 5MB)
- XML format validation

### **Advanced Filters**
- Search by folio, supplier, or UUID
- Date range filter (from/to)
- Export to Excel functionality
- Real-time filtering

### **Invoice Management**
- View detailed invoice information
- Validate invoices against SAT
- Reject invoices with reason
- Download PDF and XML files
- Delete pending invoices

### **Status Management**
- **Validada**: Validated invoices (ready for tax deduction)
- **Pendiente**: Pending validation
- **Rechazada**: Rejected invoices
- **Cancelada**: Canceled invoices

## 🚀 Usage

### Importing the Main View

```typescript
import { ReceivedInvoicesView } from '@/modules/Fiscal/FacturasRecibidas'
```

### Using the Store

```typescript
import useReceivedInvoiceStore from '@/modules/Fiscal/FacturasRecibidas/store/receivedInvoiceStore'

const receivedInvoiceStore = useReceivedInvoiceStore()
receivedInvoiceStore.setData(invoice)
receivedInvoiceStore.setFilters({ dateFrom: '2025-01-01', dateTo: '2025-12-31' })
```

### Using Actions

```typescript
import { useReceivedInvoiceActions } from '@/modules/Fiscal/FacturasRecibidas/composables/useReceivedInvoiceActions'

const { getReceivedInvoices, uploadXml, validateInvoice, rejectInvoice } = useReceivedInvoiceActions()
```

## 📊 Data Structure

### Received Invoice Type

```typescript
{
    id: number
    folio: string
    uuid: string
    supplierName: string
    supplierRfc: string
    issueDate: Date
    subtotal: number
    tax: number
    total: number
    currency: string
    status: ReceivedInvoiceStatusType
    items: ReceivedInvoiceItemType[]
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
- `BaseTextArea` - Multiline text input
- `KPICard` - Custom KPI display card
- `ReceivedInvoiceFilters` - Custom filter component
- `InfoAlert` - Information alert component
- Material Symbols Icons - Icon system

## 📋 Main Features

### **Upload XML**
1. Click "Cargar XML" button
2. Select XML file (max 5MB)
3. System extracts invoice data automatically
4. Invoice is created with "Pendiente" status

### **Validate Invoice**
1. Click on invoice to view details
2. Review invoice information
3. Click "Validar Factura" button
4. Invoice status changes to "Validada"

### **Reject Invoice**
1. Click on invoice to view details
2. Click "Rechazar Factura" button
3. Enter rejection reason (min 10 characters)
4. Confirm rejection
5. Invoice status changes to "Rechazada"

## 🔧 Configuration

The module uses environment variables for API configuration:

```env
VITE_API_URL=your_api_url
```

## 📱 Features Matching React Component

✅ **KPI Cards** - 4 cards showing key metrics
✅ **Search and Filters** - Search bar with date range filters
✅ **Export Button** - Export invoices to Excel
✅ **Info Alert** - SAT validation information
✅ **Table View** - Complete table with all invoice data
✅ **Status Badges** - Color-coded status indicators
✅ **Action Buttons** - View and download actions per row
✅ **Upload XML** - File upload functionality
✅ **Responsive Design** - Mobile-friendly layout

## ✅ Validation

Form validation using Zod schemas:
- XML file format validation
- File size validation (max 5MB)
- Rejection reason validation (min 10 characters)

## 🔄 State Management

The module uses Pinia for state management:
- `receivedInvoiceStore` - Manages invoice data, selected invoice, and filters
- `modalStore` (shared) - Manages modal visibility

## 🌐 API Integration

All API calls are centralized in `services/receivedInvoiceService.ts`:
- `getReceivedInvoicesService` - Fetch invoices with filters
- `getReceivedInvoiceKPIsService` - Fetch KPI data
- `uploadXmlService` - Upload XML file
- `validateInvoiceService` - Validate invoice
- `rejectInvoiceService` - Reject invoice with reason
- `downloadPdfService` - Download PDF
- `downloadXmlService` - Download XML
- `deleteReceivedInvoiceService` - Delete pending invoice
- `exportReceivedInvoicesService` - Export to Excel

## 🎯 SAT Compliance

The module follows Mexican SAT requirements:
- XML CFDI validation
- Supplier RFC validation
- Invoice validation before tax deduction
- Rejection tracking with reasons

## 🔐 Security

- File type validation (XML only)
- File size limits (5MB max)
- Secure file uploads
- Protected API endpoints

## 📝 Workflow

1. **Receive Invoice**: Supplier sends XML file
2. **Upload XML**: Upload file through system
3. **Auto-Extract**: System extracts data from XML
4. **Review**: Review invoice details
5. **Validate/Reject**: Validate for tax deduction or reject with reason
6. **Download**: Download PDF/XML for records
7. **Export**: Export invoices for accounting

## 💡 Tips

- **Validate promptly**: Invoices should be validated quickly for tax purposes
- **Keep XMLs**: Always download and backup XML files
- **Document rejections**: Provide clear reasons when rejecting invoices
- **Regular exports**: Export invoices regularly for accounting records
