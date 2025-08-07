# Practicing Playwright (JavaScript)

Proyecto de ejemplo para practicar pruebas end-to-end con Playwright y JavaScript usando `@playwright/test`.

## Requisitos
- Node.js 18+ (recomendado) y npm
- Playwright se instala como dependencia de desarrollo (los navegadores se instalan con un comando adicional)

## Instalación

- Linux:
```bash
npm install
npx playwright install --with-deps
```

- Windows (PowerShell o CMD):
```powershell
npm install
npx playwright install
```

- macOS:
```bash
npm install
npx playwright install
```

Notas:
- En macOS, si es necesario, instala las Command Line Tools: `xcode-select --install`.
- En Windows no se requiere `--with-deps`. Si estás detrás de un proxy corporativo, configura npm (`npm config set proxy ...`).

## Ejecutar pruebas
- Ejecutar todo el suite:
```bash
npx playwright test
```
- Modo UI (explorador de pruebas):
```bash
npx playwright test --ui
```
- Ejecutar solo Chromium o Firefox:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```
- Ejecutar un archivo específico:
```bash
npx playwright test tests/test-login.spec.js
```
- Ejecutar un test por su título (grep):
```bash
npx playwright test -g "Login"
```

## Reportes, trazas, videos y screenshots
- Abrir el reporte HTML más reciente:
```bash
npx playwright show-report
```
- Directorios relevantes (se crean al correr pruebas):
  - `playwright-report/`: reporte HTML
  - `test-results/`: artefactos por corrida (trazas, videos si están habilitados, etc.)

En la configuración actual (`playwright.config.js`):
- `reporter: 'html'`
- `use.trace: 'on'` (recopila trazas en reintentos)
- `use.video: 'on'`

## Configuración principal
Archivo: `playwright.config.js`
- `testDir: './tests'`
- `baseURL: 'https://ecommerce-playground.lambdatest.io/'`
- `fullyParallel: true` (archivos en paralelo)
- `forbidOnly` activo en CI
- `retries: 2` y `workers: 1` en CI
- Proyectos configurados: `chromium` y `firefox` (Safari está comentado)

Puedes usar rutas relativas a `baseURL` en las pruebas, por ejemplo `page.goto('/')`.

## Estructura del proyecto
```
practicing-playwright-javascript/
├─ tests/
│  ├─ example.spec.js
│  ├─ test-homepage.spec.js
│  └─ test-login.spec.js
├─ playwright.config.js
├─ package.json
├─ package-lock.json
├─ playwright-report/
└─ test-results/
```

## Pruebas incluidas (resumen)
- `tests/test-login.spec.js`: flujo de login exitoso en `ecommerce-playground.lambdatest.io` usando `baseURL` y selectores por rol/label.
- `tests/test-homepage.spec.js`: validaciones básicas de título y URL de la homepage.
- `tests/example.spec.js`: ejemplos mínimos contra `https://playwright.dev/`.

## Sugerencias de scripts (opcional)
Si prefieres usar scripts de npm, puedes agregar a `package.json` la sección `scripts` similar a:
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "report": "playwright show-report",
    "install:browsers": "playwright install --with-deps"
  }
}
```
Luego ejecutas, por ejemplo: `npm run test` o `npm run test:ui`.

## Variables de entorno (opcional)
El archivo de configuración incluye ejemplos comentados para cargar `.env` con `dotenv`. Si deseas usar variables de entorno:
1. Descomenta las líneas correspondientes en `playwright.config.js`.
2. Crea un archivo `.env` en la raíz con tus variables.

## Solución de problemas
- Si en Linux faltan librerías del sistema, usa `npx playwright install --with-deps`.
- Si un test falla de forma intermitente, abre trazas con `npx playwright show-report` y revisa la corrida.
- Asegúrate de no dejar `test.only` en commits de CI; la config lo prohíbe.

## Licencia
ISC

