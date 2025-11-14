# Pipeline de Operaciones Module

This module manages the operations pipeline for client onboarding, providing a Kanban-style interface for tracking operations through different stages.

## 📁 Folder Structure

```
PipelineDeOperaciones/
├── components/           # Vue components
│   ├── tabs/            # Tab components for operation details
│   │   ├── OperationSummaryTab.vue
│   │   ├── OperationDocumentsTab.vue
│   │   ├── OperationValidationsTab.vue
│   │   └── OperationHistoryTab.vue
│   ├── ApprovalModal.vue
│   ├── IncidentModal.vue
│   ├── KanbanColumn.vue
│   ├── OperationCard.vue
│   └── OperationDetailModal.vue
├── composables/         # Business logic and utilities
│   ├── mappingOperationData.ts
│   ├── useOperation.ts
│   └── useOperationActions.ts
├── services/           # API service calls
│   └── operationService.ts
├── store/              # Pinia state management
│   └── operationStore.ts
├── types/              # TypeScript type definitions
│   └── operationTypes.ts
├── validations/        # Zod validation schemas
│   └── operationValidation.ts
├── views/              # Main view component
│   └── PipelineView.vue
├── index.ts           # Module exports
└── README.md          # This file
```

## 🎯 Features

- **Kanban Board**: Visual pipeline with 7 stages (Recepción, Validación Automática, Revisión Manual, etc.)
- **Operation Cards**: Compact cards showing key operation information
- **Detail Modal**: Comprehensive view with tabs for Summary, Documents, Validations, and History
- **SLA Tracking**: Color-coded time tracking for each operation
- **Priority Management**: High, Medium, Low priority levels
- **Incident Notifications**: Template-based incident reporting to clients
- **Approval Workflow**: Streamlined approval process for operations
- **Comment System**: Add notes and comments to operation history

## 🚀 Usage

### Importing the Main View

```typescript
import { PipelineView } from '@/modules/MesaDeControl/PipelineDeOperaciones'
```

### Using the Store

```typescript
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'

const operationStore = useOperationStore()
operationStore.setData(operation)
```

### Using Actions

```typescript
import { useOperationActions } from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperationActions'

const { getOperations, approveOperation, sendIncident } = useOperationActions()
```

## 📊 Operation Stages

1. **Recepción** - Initial reception of operation
2. **Validación Automática** - Automatic validation processes
3. **Revisión Manual** - Manual review by operators
4. **Pendiente de Aprobación** - Awaiting final approval
5. **Aprobado** - Approved operations
6. **Rechazado** - Rejected operations
7. **Pendiente de Corrección** - Awaiting client corrections

## 🎨 UI Components Used

- `BaseTitle` - Page title component
- `BaseModal` - Modal wrapper
- `BaseTextArea` - Text area input
- Material Symbols Icons - Icon system

## 🔧 Configuration

The module uses environment variables for API configuration:

```env
VITE_API_URL=your_api_url
```

## 📝 Mock Data

The module includes mock data for development purposes. Remove or comment out the mock data in `PipelineView.vue` when the API is ready.

## 🎨 Styling

The module uses DaisyUI classes and follows the project's design system with:
- Badge colors for priority and status
- Card components for consistent layouts
- Responsive design with horizontal scrolling for Kanban columns

## 🔄 State Management

The module uses Pinia for state management with the following stores:
- `operationStore` - Manages operation data and selected operation
- `modalStore` (shared) - Manages modal visibility

## ✅ Validation

Form validation is handled using Zod schemas defined in `validations/operationValidation.ts`.

## 🌐 API Integration

All API calls are centralized in `services/operationService.ts`. Update the service methods when integrating with the backend.
