# Documentación Técnica - IdentiWorld

## 🏗️ Arquitectura de la Aplicación

### Patrón de Arquitectura
La aplicación sigue una arquitectura modular basada en Angular con:
- **Standalone Components**: Uso de componentes independientes de Angular 19
- **Signal-based State Management**: Gestión reactiva del estado con Angular Signals
- **Service Layer**: Servicios para lógica de negocio y comunicación
- **Lazy Loading**: Carga diferida de módulos para optimización

### Estructura de Componentes

#### Layout Components
- **AppLayout**: Componente principal que envuelve toda la aplicación
- **AppTopbar**: Barra superior con navegación y controles
- **AppSidebar**: Menú lateral de navegación
- **AppFooter**: Pie de página
- **AppConfigurator**: Configurador de temas y apariencia

#### Page Components
- **Dashboard**: Página de inicio con información general
- **Login/SignIn**: Componentes de autenticación
- **IdentiWorld**: Exploración y gestión de Identimons
- **Profile**: Perfil del usuario
- **Team**: Gestión del equipo de Identimons

#### Specialty Components
- **IdentiArtComponent**: Generación de arte procedural
- **IdentiStatsComponent**: Visualización de estadísticas

## 🔧 Servicios Principales

### LayoutService
```typescript
// Gestión del estado del layout y temas
interface layoutConfig {
    preset?: string;        // Preset del tema (Aura, Lara, Nora)
    primary?: string;       // Color primario
    surface?: string;       // Color de superficie
    darkTheme?: boolean;    // Modo oscuro/claro
    menuMode?: string;      // Modo del menú (static/overlay)
}
```

### IdentiWorldService
```typescript
// Gestión de Identimons
interface Identimon {
    id: string;
    name: string;
    birth: string;
    random: string;
    stats: Stats;
}

interface Stats {
    life: number;
    defense: number;
    attack: number;
    speed: number;
    luck: number;
    magic: number;
    power: number;
    mana: number;
    rarity: {
        value: number;
        type: string;
        color: string;
    };
}
```

## 🎨 Sistema de Temas

### Configuración de Temas
La aplicación utiliza PrimeNG Themes con configuración dinámica:

```typescript
// Presets disponibles
const presets = {
    Aura,    // Tema moderno y limpio
    Lara,    // Tema clásico y elegante
    Nora     // Tema minimalista
};
```

### Paletas de Colores
- **Primary Colors**: emerald, blue, purple, teal, etc.
- **Surface Colors**: slate, gray, zinc, neutral, stone, etc.
- **Dark/Light Mode**: Transiciones automáticas con CSS

## 🔐 Sistema de Autenticación

### Encriptación
- **bcryptjs**: Hash de contraseñas con salt
- **localStorage**: Almacenamiento local de usuarios y sesiones

### Flujo de Autenticación
1. **Registro**: Validación → Hash de contraseña → Almacenamiento
2. **Login**: Verificación → Comparación de hash → Creación de sesión
3. **Logout**: Limpieza de sesión → Redirección

## 🎮 Generación de Identimons

### Algoritmo de Generación
```typescript
const convertToNumber = (value: string): number => {
    const nums = value.split("").map((c) => c.charCodeAt(0));
    return nums.reduce((acc, curr) => acc + curr, 0);
}

const createIdentimon = (id: string): Identimon => {
    // Extracción de segmentos del ULID
    const life = convertToNumber(id.slice(10, 12));
    const defense = convertToNumber(id.slice(12, 14));
    // ... más estadísticas
}
```

### Sistema de Rareza
- **Common** (Común): < 130
- **Uncommon** (Poco común): 130-144
- **Rare** (Raro): 145-149
- **Epic** (Épico): 150-154
- **Legendary** (Legendario): > 155

## 🎨 Generación de Arte

### MinIdenticons
Cada Identimon tiene un avatar único generado mediante:
```typescript
const art = () => 'data:image/svg+xml,' + encodeURIComponent(minidenticon(this.id))
```

### Visualización de Estadísticas
Barras de progreso coloreadas por tipo:
- Life: Verde (#4caf50)
- Defense: Rojo (#f44336)
- Attack: Naranja (#ff9800)
- Speed: Cian (#00bcd4)
- Luck: Verde lima (#8bc34a)
- Magic: Púrpura (#9c27b0)
- Power: Rosa (#e91e63)
- Mana: Azul (#2196f3)

## 🛠️ Configuración de Build

### Angular Configuration
- **Target**: ES2022
- **Bundle**: Application builder
- **Assets**: Optimización automática
- **Styles**: SCSS + Tailwind CSS

### Docker Configuration
```dockerfile
# Construcción multi-stage para optimización
FROM node:18-alpine AS build
# ... configuración de build

FROM nginx:alpine AS production
# ... configuración de servidor
```

## 🧪 Testing Strategy

### Unit Tests
- Componentes críticos cubiertos
- Servicios principales testeados
- Mocks para dependencias externas

### E2E Tests
- Flujos de usuario principales
- Navegación entre páginas
- Funcionalidades de autenticación

## 🔄 Estado de la Aplicación

### Angular Signals
```typescript
// Gestión reactiva del estado
layoutConfig = signal<layoutConfig>(this._config);
layoutState = signal<LayoutState>(this._state);
identimons = signal<Identimon[]>([]);
```

### LocalStorage Schema
```json
{
  "users": [
    {
      "email": "user@example.com",
      "displayName": "Usuario",
      "hashedPassword": "...",
      "favouriteNumber": 42,
      "birthDate": "...",
      "identimons": [...],
      "coins": 125
    }
  ],
  "session": {
    "user": { ... },
    "timestamp": "..."
  }
}
```

## 🚀 Optimizaciones

### Performance
- **Standalone Components**: Reducción del bundle size
- **OnPush Change Detection**: Optimización de renderizado
- **Lazy Loading**: Carga diferida de rutas
- **Tree Shaking**: Eliminación de código no utilizado

### UX/UI
- **Responsive Design**: Adaptación a diferentes pantallas
- **Dark Mode**: Transiciones suaves entre temas
- **Loading States**: Feedback visual durante operaciones
- **Error Handling**: Gestión elegante de errores

## 🔧 Scripts de Desarrollo

### Comandos Útiles
```bash
# Desarrollo
pnpm dev                    # Servidor de desarrollo
pnpm build                  # Build de producción
pnpm test                   # Tests unitarios
pnpm format                 # Formateo de código

# Docker
docker build -t identiworld .
docker run -p 8080:80 identiworld

# Análisis
ng analyze                  # Análisis del bundle
ng lint                     # Linting del código
```

## 📊 Métricas y Monitoreo

### Bundle Size
- **Initial Bundle**: ~500KB (optimizado)
- **Lazy Chunks**: Carga diferida por ruta
- **Vendor Bundle**: Librerías de terceros separadas

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s

---

Esta documentación técnica proporciona una visión detallada de la implementación y arquitectura de IdentiWorld.