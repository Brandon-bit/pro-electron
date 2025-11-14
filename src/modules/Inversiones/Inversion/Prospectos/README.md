# Prospectos (Prospects) Module

Complete module for managing investment prospects with KPIs, advanced filtering, and full CRUD operations.

## 📁 Folder Structure

```
Prospectos/
├── components/                      # Vue components
│   ├── KPICard.vue                 # KPI display card
│   ├── ProspectFilters.vue         # Search and filters
│   ├── ProspectFormModal.vue       # Create/Edit/Delete modal
│   └── ProspectDetailModal.vue     # Detail view modal
├── composables/                     # Business logic and utilities
│   ├── mappingProspectData.ts      # Data mapping
│   ├── useProspect.ts              # Table columns and utilities
│   └── useProspectActions.ts       # CRUD operations
├── services/                        # API service calls
│   └── prospectService.ts
├── store/                           # Pinia state management
│   └── prospectStore.ts
├── types/                           # TypeScript type definitions
│   └── prospectTypes.ts
├── validations/                     # Zod validation schemas
│   └── prospectValidation.ts
├── views/                           # Main view component
│   └── ProspectsView.vue
├── index.ts                         # Module exports
└── README.md                        # This file
```

## 🎯 Features

### **Dashboard with KPIs**
- **Total Prospectos**: Total number of prospects
- **Valor Pipeline**: Total estimated value
- **Tasa de Conversión**: Conversion rate
- **Prospectos Calientes**: High priority prospects

### **Advanced Filtering**
- Search by name, email, company
- Filter by status
- Filter by source
- Filter by priority
- Date range filtering
- Export to Excel

### **Prospect Management**
- Create new prospects
- Edit existing prospects
- Delete prospects
- View detailed information
- Track activities
- Manage pipeline

### **Status Tracking**
- **Nuevo**: New prospect
- **Contactado**: Contacted
- **Calificado**: Qualified
- **Propuesta**: Proposal sent
- **Negociación**: In negotiation
- **Ganado**: Won
- **Perdido**: Lost

### **Priority Levels**
- **Baja**: Low priority
- **Media**: Medium priority
- **Alta**: High priority
- **Urgente**: Urgent

### **Source Tracking**
- Referido
- Web
- Llamada
- Email
- Redes Sociales
- Evento
- Otro

## 🚀 Usage

### Importing the Main View

```typescript
import { ProspectsView } from '@/modules/Inversiones/Inversion/Prospectos'
```

### Using the Store

```typescript
import useProspectStore from '@/modules/Inversiones/Inversion/Prospectos/store/prospectStore'

const prospectStore = useProspectStore()
prospectStore.setSelectedProspect(prospect)
prospectStore.setFilters({ status: 'Nuevo' })
```

### Using Actions

```typescript
import { useProspectActions } from '@/modules/Inversiones/Inversion/Prospectos/composables/useProspectActions'

const { getProspects, createProspect, updateProspect } = useProspectActions()
```

## 📊 Data Structure

### Prospect Type

```typescript
{
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    company?: string
    position?: string
    source: ProspectSourceType
    status: ProspectStatusType
    priority: ProspectPriorityType
    estimatedValue: number
    probability: number
    expectedCloseDate?: Date
    assignedTo?: string
    notes?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
}
```

## 🎨 UI Components Used

- `BaseTitle` - Page title component
- `BaseButton` - Action buttons
- `BaseTable` - Data table with pagination
- `BaseModal` - Modal dialogs
- `BaseFormInput` - Form inputs
- `BaseFormSelect` - Form selects
- `KPICard` - Custom KPI display card
- `ProspectFilters` - Custom filter component
- Material Symbols Icons - Icon system
- DaisyUI Components - UI framework

## 📋 Main Features

### **Create Prospect**
1. Click "Nuevo Prospecto" button
2. Fill in the form:
   - Personal information (name, email, phone)
   - Company information
   - Prospect details (source, status, priority)
   - Financial information (estimated value, probability)
   - Address
   - Notes
3. Click "Guardar"

### **Edit Prospect**
1. Click edit button on table row
2. Modify the information
3. Click "Actualizar"

### **View Details**
1. Click view button on table row
2. See complete prospect information
3. View contact details, address, notes
4. Check activity history

### **Delete Prospect**
1. Click delete button on table row
2. Confirm deletion
3. Prospect is removed

### **Filter Prospects**
1. Use search bar for quick search
2. Click "Filtros" for advanced filters
3. Select status, source, priority
4. Click "Aplicar Filtros"

### **Export Prospects**
1. Apply desired filters
2. Click "Exportar" button
3. Excel file downloads automatically

## 🎯 Workflow

1. **Lead Generation** → New prospect enters system
2. **Contact** → Initial contact made
3. **Qualification** → Prospect is qualified
4. **Proposal** → Proposal sent
5. **Negotiation** → Terms negotiated
6. **Close** → Won or Lost

## 💡 Key Metrics

- **Pipeline Value**: Sum of all estimated values
- **Conversion Rate**: (Won / Total) × 100
- **Average Deal Size**: Total Value / Number of Prospects
- **Sales Cycle**: Average time from New to Won

## 📐 Validation Rules

- **Name**: Required, max 100 characters
- **Email**: Required, valid email format
- **Phone**: Required, min 10 digits
- **Estimated Value**: Min 0
- **Probability**: 0-100%
- **Notes**: Max 1000 characters

## 🔐 Security

- Protected API endpoints
- User-based access control
- Audit trail for all actions
- Data encryption

## 🎨 Design Features

- **Responsive Layout**: Works on all devices
- **KPI Dashboard**: Visual metrics
- **Advanced Filters**: Powerful search
- **Status Badges**: Color-coded status
- **Priority Indicators**: Visual priority levels
- **Progress Bars**: Probability visualization
- **Modal Forms**: Clean data entry
- **Detail View**: Comprehensive information display

## 📱 Responsive Behavior

- **Desktop**: Full table with all columns
- **Tablet**: Optimized column layout
- **Mobile**: Stacked card view
- **Touch-friendly**: Large tap targets

## 🚀 Future Enhancements

- Activity timeline
- Email integration
- Calendar integration
- Document attachments
- Task management
- Automated follow-ups
- Pipeline visualization
- Forecasting tools
- Team collaboration
- Mobile app

## 📊 Table Features

- **Sortable columns**
- **Pagination**
- **Row actions** (View, Edit, Delete)
- **Status badges**
- **Priority indicators**
- **Progress bars** for probability
- **Responsive design**
- **Export functionality**

## 🎯 Best Practices

1. **Regular Updates**: Keep prospect information current
2. **Activity Tracking**: Log all interactions
3. **Follow-ups**: Set reminders for follow-ups
4. **Qualification**: Properly qualify prospects
5. **Pipeline Management**: Keep pipeline clean
6. **Data Quality**: Maintain accurate data
7. **Team Collaboration**: Share information
8. **Reporting**: Regular pipeline reviews

## 💼 Business Value

- **Increased Conversions**: Better prospect management
- **Faster Sales Cycle**: Streamlined process
- **Better Forecasting**: Accurate pipeline data
- **Team Efficiency**: Centralized information
- **Data-Driven Decisions**: KPIs and metrics
- **Customer Relationships**: Better tracking
- **Revenue Growth**: Optimized sales process
