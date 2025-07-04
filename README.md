# Stock Analyzer UI

## 📊 Descripción

Stock Analyzer UI es una aplicación frontend desarrollada en **Vue.js 3** que proporciona una interfaz web moderna y sencilla para visualizar y analizar datos de inversiones en acciones. La aplicación se conecta con el backend de Stock Analyzer (desarrollado en Go) para obtener datos en tiempo real y mostrar recomendaciones de inversión basadas en análisis avanzados.

## 🎯 Funcionalidades

- **Visualización de Stocks**: Muestra listados de acciones con información detallada
- **Filtros Avanzados**: Permite filtrar por múltiples criterios (corredora, rating, etc.)
- **Top de Inversiones**: Visualiza las mejores oportunidades de inversión
- **Información de Empresas**: Detalles completos de cada empresa

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework frontend
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de estilos
- **Vue Router** - Enrutamiento de la aplicación

## 🔗 Backend Conectado

Esta aplicación frontend se conecta con el backend **Stock Analyzer** desarrollado en Go:

- **Repositorio**: [https://github.com/Carlosmercg/stock-analyzer](https://github.com/Carlosmercg/stock-analyzer)
- **Tecnología**: Go con Gin framework
- **Base de Datos**: CockroachDB
- **APIs Integradas**: Finnhub para datos extra

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Carlosmercg/Stock-Analyzer-UI.git
   cd Stock-Analyzer-UI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   - Asegúrate de que el backend de Stock Analyzer esté ejecutándose
   - El backend debe estar disponible en `http://localhost:8085` (por defecto)

4. **Ejecutar la aplicación**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

## 📱 Características de la Interfaz

### Componentes Principales

- **StockList**: Lista principal de acciones con información básica
- **StockCard**: Tarjetas individuales con datos de cada acción
- **CompanyDetail**: Vista detallada de información empresarial
- **Filtros**: Sistema de filtrado por múltiples criterios

### Diseño

- Interfaz limpia y moderna
- Diseño responsivo para móviles y desktop
- Paleta de colores profesional
- Navegación intuitiva

## 🔌 Endpoints Utilizados

La aplicación consume los siguientes endpoints del backend:

- `GET /api/stocks/` - Lista de stocks con paginación
- `GET /api/stocks/filter` - Filtrado avanzado
- `GET /api/stocks/top` - Top 20 mejores inversiones
- `GET /api/stocks/top-by-brokerage` - Top por corredora
- `GET /api/stocks/company/info` - Información de empresa

## 📊 Sistema de Análisis

El frontend visualiza los datos analizados por el backend, incluyendo:

- **Scores de inversión** calculados automáticamente
- **Ratings de corredoras** (Buy, Hold, Sell, etc.)
- **Información de precios** y objetivos
- **Datos de empresas** desde Finnhub

## 🎨 Personalización

La aplicación utiliza Tailwind CSS para estilos, permitiendo fácil personalización:

- Modifica `tailwind.config.js` para cambiar colores y temas
- Edita componentes Vue para ajustar la interfaz
- Personaliza la lógica de filtrado en los servicios

## 📞 Contacto

**Desarrollador**: Carlos Mercado - @Carlosmercg

**Backend**: [https://github.com/Carlosmercg/stock-analyzer](https://github.com/Carlosmercg/stock-analyzer)

---

*Stock Analyzer UI - Interfaz moderna para análisis de inversiones*
