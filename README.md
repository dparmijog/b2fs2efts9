# IdentiWorld - Angular 19 Application

## 📋 Descripción del Proyecto

IdentiWorld es una aplicación web interactiva construida con Angular 19 que permite a los usuarios explorar y coleccionar criaturas digitales llamadas "Identimons". La aplicación incluye un sistema de autenticación, gestión de perfiles, y un mundo virtual donde los usuarios pueden descubrir y contratar Identimons únicos.

## 🎯 Características Principales

- **Sistema de Autenticación**: Login y registro de usuarios con encriptación de contraseñas
- **Perfil de Usuario**: Gestión de información personal y datos del usuario
- **IdentiWorld**: Exploración y contratación de Identimons únicos
- **Gestión de Equipo**: Administración de Identimons contratados
- **Interfaz Moderna**: UI responsiva con PrimeNG y Tailwind CSS
- **Temas Dinámicos**: Soporte para modo claro/oscuro con múltiples presets

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 19**: Framework principal de la aplicación
- **TypeScript**: Lenguaje de programación tipado
- **PrimeNG 19**: Biblioteca de componentes UI
- **Tailwind CSS**: Framework de estilos utilitarios
- **RxJS**: Programación reactiva
- **Chart.js**: Visualización de datos

### Librerías Adicionales
- **bcryptjs**: Encriptación de contraseñas
- **ulid**: Generación de identificadores únicos
- **minidenticons**: Generación de avatares únicos

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Karma & Jasmine**: Testing
- **Docker**: Containerización

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── identimons/           # Componentes relacionados con Identimons
│   │   ├── identi.art.component.ts      # Generación de arte visual
│   │   └── identi.stats.component.ts    # Visualización de estadísticas
│   ├── layout/               # Componentes de layout
│   │   ├── component/        # Componentes de interfaz
│   │   │   ├── app.layout.ts
│   │   │   ├── app.topbar.ts
│   │   │   ├── app.sidebar.ts
│   │   │   ├── app.footer.ts
│   │   │   └── app.configurator.ts
│   │   └── service/          # Servicios de layout
│   │       └── layout.service.ts
│   ├── pages/                # Páginas principales
│   │   ├── auth/             # Autenticación
│   │   │   ├── login.ts
│   │   │   ├── signin.ts
│   │   │   └── quit.ts
│   │   ├── dashboard/        # Panel principal
│   │   ├── identiworld/      # Mundo de Identimons
│   │   ├── profile/          # Perfil de usuario
│   │   ├── team/             # Gestión de equipo
│   │   └── notfound/         # Página 404
│   └── service/              # Servicios globales
│       ├── identime.service.ts
│       └── identiworld.service.ts
├── assets/                   # Recursos estáticos
│   ├── layout/               # Estilos de layout
│   └── demo/                 # Recursos de demostración
└── styles.scss               # Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm
- Angular CLI

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd fs2_exp3_s8
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
pnpm dev
# o
npm run dev
```

4. **Acceder a la aplicación**
```
http://localhost:4200
```

## 🐳 Docker

### Construir imagen Docker
```bash
docker build -t identiworld .
```

### Ejecutar contenedor
```bash
docker run -p 8080:80 identiworld
```

## 📱 Funcionalidades Detalladas

### 1. Sistema de Autenticación
- **Login** (`/auth`): Autenticación de usuarios existentes
- **Registro** (`/register`): Creación de nuevas cuentas
- **Logout** (`/quit`): Cierre de sesión con animación

### 2. Dashboard Principal
- Panel de bienvenida al IdentiWorld
- Navegación principal a todas las funcionalidades

### 3. IdentiWorld (`/identiworld`)
- Exploración de Identimons únicos generados dinámicamente
- Visualización de estadísticas detalladas
- Sistema de rareza con colores diferenciados
- Contratación de Identimons para el equipo

### 4. Gestión de Perfil (`/profile`)
- Visualización de información personal
- Datos del usuario logueado

### 5. Gestión de Equipo (`/team`)
- Administración de Identimons contratados
- Visualización del equipo personal

## 🎨 Sistema de Temas

La aplicación incluye un configurador avanzado de temas con:
- **Múltiples presets**: Aura, Lara, Nora
- **Colores primarios**: Amplia gama de opciones
- **Colores de superficie**: Diferentes paletas
- **Modo oscuro/claro**: Cambio dinámico
- **Modos de menú**: Estático y overlay

## 🔧 Componentes Principales

### IdentiArtComponent
Genera arte visual único para cada Identimon utilizando la librería `minidenticons`.

### IdentiStatsComponent
Muestra las estadísticas de los Identimons en barras de progreso:
- Vida (Life)
- Defensa (Defense)
- Ataque (Attack)
- Velocidad (Speed)
- Suerte (Luck)
- Magia (Magic)
- Poder (Power)
- Maná (Mana)

### LayoutService
Gestiona el estado del layout, temas y configuraciones de la interfaz.

### IdentiWorldService
Maneja la generación y gestión de Identimons, incluyendo:
- Creación de criaturas únicas
- Cálculo de estadísticas
- Sistema de rareza

## 🧪 Testing

### Ejecutar tests
```bash
pnpm test
# o
npm test
```

### Tests incluidos
- Dashboard Component
- Profile Component
- Servicios principales

## 🔧 Scripts Disponibles

- `pnpm dev`: Ejecuta el servidor de desarrollo
- `pnpm build`: Construye la aplicación para producción
- `pnpm test`: Ejecuta los tests unitarios
- `pnpm format`: Formatea el código con Prettier

## 🌐 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Dashboard | Página principal |
| `/auth` | Login | Autenticación |
| `/register` | SignIn | Registro |
| `/quit` | Quit | Cierre de sesión |
| `/identiworld` | IdentiWorld | Exploración de Identimons |
| `/profile` | ProfileComponent | Perfil de usuario |
| `/team` | TeamComponent | Gestión de equipo |
| `/notfound` | Notfound | Página 404 |

## 💾 Almacenamiento de Datos

La aplicación utiliza `localStorage` para persistir:
- Información de usuarios registrados
- Sesión activa del usuario
- Identimons contratados
- Configuraciones de tema

## 🎮 Mecánicas del Juego

### Generación de Identimons
- Cada Identimon se genera con un ULID único
- Las estadísticas se calculan basándose en el ID
- Sistema de rareza: Common, Uncommon, Rare, Epic, Legendary

### Sistema de Estadísticas
- 8 atributos principales con valores de 0-180
- Colores únicos para cada estadística
- Visualización en barras de progreso

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Ejecuta los tests
5. Envía un Pull Request

## 📄 Licencia

Este proyecto es parte de un ejercicio académico para DUOC UC.

## 👨‍💻 Autor

**Diego** - Desarrollador principal

---

¡Explora el IdentiWorld y descubre criaturas únicas! 🦄✨