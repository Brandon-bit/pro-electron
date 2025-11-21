# 📱 Coordinador de Redes Sociales - Sistema Reactivo Multi-Plataforma

## 🎯 Descripción

Sistema completo para gestionar publicaciones en múltiples redes sociales con configuraciones específicas por plataforma, similar a Ayrshare. El formulario es completamente reactivo y muestra opciones dinámicas según las redes sociales seleccionadas.

## ✨ Características

### 🔄 Formulario Reactivo
- **Selección dinámica de redes sociales**: El usuario selecciona las plataformas donde quiere publicar
- **Opciones específicas por plataforma**: Cada red social muestra sus propias configuraciones
- **Preview de medios**: Vista previa de imágenes y videos antes de publicar
- **Validación en tiempo real**: Feedback inmediato sobre campos requeridos
- **Soporte multi-archivo**: Carga múltiples imágenes/videos en una sola publicación

### 🌐 Plataformas Soportadas

#### 1. Facebook 📘
- Tipo de publicación: Post Regular, Reel, Historia
- Configuración visual con botones de selección

#### 2. Instagram 📷
- Tipo de publicación: Feed, Reel, Historia
- Opción para compartir Reel en el Feed
- Diseño con gradiente característico de Instagram

#### 3. TikTok 🎵
- Nivel de privacidad: Público, Amigos, Privado
- Desactivar comentarios, duetos, stitch
- Configuración de contenido de marca
- Marca orgánica

#### 4. YouTube ▶️
- **Título del video** (requerido)
- Visibilidad: Público, No listado, Privado
- Opción para YouTube Shorts

#### 5. LinkedIn 💼
- Visibilidad: Público, Solo Conexiones

#### 6. Twitter/X 🐦
- Responder a tweet (ID)
- Citar tweet (ID)

#### 7. Telegram ✈️
- Notificaciones silenciosas
- Modo de parseo: Markdown, HTML

#### 8. Reddit 🤖
- Subreddit
- Flair ID y texto

#### 9. Google My Business 🏢
- Tipo de tema: Estándar, Evento, Oferta
- Tipo de acción: Reservar, Ordenar, Comprar, etc.
- Configuración de eventos y ofertas

## 📁 Estructura de Archivos

```
CordinadorRedesSociales/
├── components/
│   ├── socialPostForm.vue          # Formulario principal reactivo
│   ├── SocialNetworkSelector.vue   # Selector de redes sociales
│   └── platforms/                  # Componentes específicos por plataforma
│       ├── FacebookOptions.vue
│       ├── InstagramOptions.vue
│       ├── TikTokOptions.vue
│       ├── YouTubeOptions.vue
│       ├── TwitterOptions.vue
│       └── LinkedInOptions.vue
├── composables/
│   └── useSocialActions.ts         # Lógica de negocio y mapper
├── services/
│   └── socialPostService.ts        # Llamadas a la API
├── types/
│   └── socialPostTypes.ts          # Definiciones de TypeScript
└── views/
    └── socialCordinador.vue        # Vista principal
```

## 🔧 Uso del Formulario

### Crear una Nueva Publicación

1. **Seleccionar una marca** en el dropdown superior
2. **Hacer clic en "Nueva Publicación"**
3. **Escribir el contenido** del post (máx. 5000 caracteres)
4. **Seleccionar redes sociales** donde publicar
5. **Configurar opciones específicas** que aparecen dinámicamente
6. **Subir archivos multimedia** (opcional, múltiples archivos)
7. **Programar fecha** de publicación
8. **Seleccionar estado**: Borrador, Programado, Publicado, Archivado
9. **Guardar publicación**

### Ejemplo de Flujo

```
Usuario selecciona: Facebook + Instagram + YouTube
                    ↓
Formulario muestra automáticamente:
├─ Opciones de Facebook (Post Regular/Reel/Historia)
├─ Opciones de Instagram (Feed/Reel/Historia + Compartir en Feed)
└─ Opciones de YouTube (Título + Visibilidad + Shorts)
```

## 💾 Estructura de Datos

### Datos Enviados al Backend

```typescript
{
  postContent: string,              // Contenido de la publicación
  scheduleDate: string,             // Fecha ISO 8601
  status: 'draft' | 'scheduled' | 'published' | 'archived',
  shortenLinks: boolean,            // Acortar enlaces automáticamente
  selectedPlatforms: string[],      // ['facebook', 'instagram', 'youtube']
  mediaFiles: File[],               // Archivos multimedia
  platformData: {                   // Configuraciones específicas
    facebook: {
      facebookPostType: 'regular'
    },
    instagram: {
      instagramPostType: 'feed',
      instagramReelShareToFeed: false
    },
    youtube: {
      youTubeTitle: 'Mi video',
      youTubeVisibility: 'public',
      youTubeShorts: false
    }
  }
}
```

### Mapeo al Backend

El mapper (`useSocialActions.ts`) convierte los datos del formulario a:

```typescript
FormData {
  idMarca: string,
  idCuenta: string,
  idUsuario: string,
  postContent: string,
  status: string,
  shortenLinks: string,
  scheduleDate: string (ISO),
  mktPostPlatforms: string (JSON),  // Array de plataformas
  mediaFiles: File[]                // Archivos multimedia
}
```

## 🎨 Componentes Reactivos

### SocialNetworkSelector

Muestra todas las redes sociales disponibles con toggles para seleccionar/deseleccionar.

**Props:**
- `modelValue`: Array de plataformas seleccionadas

**Emits:**
- `update:modelValue`: Actualiza las plataformas seleccionadas

### Componentes de Plataforma

Cada componente de plataforma (`FacebookOptions`, `InstagramOptions`, etc.) recibe y emite `PlatformSpecificData`.

**Props:**
- `modelValue`: Configuración específica de la plataforma

**Emits:**
- `update:modelValue`: Actualiza la configuración

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│  Usuario interactúa con el formulario                   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  SocialPostForm (socialPostForm.vue)                    │
│  - Gestiona estado del formulario                       │
│  - Valida datos                                          │
│  - Emite evento 'submit'                                 │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Vista Principal (socialCordinador.vue)                 │
│  - Recibe datos del formulario                          │
│  - Llama a useSocialPostActions.createPost()            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Composable (useSocialActions.ts)                       │
│  - Valida datos                                          │
│  - Mapea a FormData                                      │
│  - Construye mktPostPlatforms                            │
│  - Llama al servicio                                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Servicio (socialPostService.ts)                        │
│  - Envía FormData al backend                             │
│  - Maneja respuesta/errores                              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Backend API                                             │
│  - Procesa FormData                                      │
│  - Deserializa mktPostPlatforms                          │
│  - Guarda archivos multimedia                            │
│  - Inserta en 3 tablas (transacción)                     │
│    ├─ mkt_posts                                          │
│    ├─ mkt_post_platforms                                 │
│    └─ mkt_post_media                                     │
└──────────────────────────────────────────────────────────┘
```

## 🧪 Testing

### Probar el Formulario

1. Selecciona diferentes combinaciones de redes sociales
2. Verifica que las opciones específicas aparezcan/desaparezcan
3. Sube múltiples archivos y verifica el preview
4. Intenta enviar sin completar campos requeridos
5. Verifica que la validación funcione correctamente

### Casos de Prueba

```typescript
// Caso 1: Solo Facebook
selectedPlatforms: ['facebook']
// Debe mostrar: FacebookOptions

// Caso 2: Facebook + Instagram
selectedPlatforms: ['facebook', 'instagram']
// Debe mostrar: FacebookOptions + InstagramOptions

// Caso 3: YouTube (requiere título)
selectedPlatforms: ['youtube']
// Validación debe fallar si youTubeTitle está vacío
```

## 📝 Notas Importantes

1. **YouTube requiere título**: Si seleccionas YouTube, el campo `youTubeTitle` es obligatorio
2. **Archivos multimedia**: Soporta imágenes y videos, múltiples archivos
3. **Fecha programada**: Usa `datetime-local` para mejor UX
4. **Estado del post**: 
   - `draft`: Borrador, no se publica
   - `scheduled`: Programado para publicarse en `scheduleDate`
   - `published`: Publicado inmediatamente
   - `archived`: Archivado, no visible

## 🚀 Próximas Mejoras

- [ ] Integración con Ayrshare API para publicación real
- [ ] Preview del post según cada plataforma
- [ ] Programación recurrente (diaria, semanal, mensual)
- [ ] Análisis de mejores horarios para publicar
- [ ] Hashtags sugeridos por IA
- [ ] Acortador de enlaces integrado
- [ ] Biblioteca de medios reutilizables
- [ ] Templates de publicaciones
- [ ] Calendario de contenido mejorado

## 🐛 Troubleshooting

### El formulario no muestra opciones de plataforma
- Verifica que `selectedPlatforms` tenga valores
- Revisa la consola para errores de importación de componentes

### Los archivos no se suben
- Verifica que el input acepte el tipo de archivo correcto
- Revisa el límite de tamaño en el backend

### Error al enviar el formulario
- Abre la consola y revisa el FormData que se está enviando
- Verifica que `mktPostPlatforms` sea un JSON válido
- Asegúrate de que el backend esté configurado para recibir FormData

## 📚 Referencias

- [Ayrshare API Documentation](https://docs.ayrshare.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [DaisyUI Components](https://daisyui.com/components/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
