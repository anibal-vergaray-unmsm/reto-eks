# RETO - EKS

# Pre-requisitos ✅
- MongoDB/MongoDB Atlas

# Variables a Configurar

En el archivo reto-eks/.env:
- `DB_CONNECTION`, URI de la base de datos MongoDB
- `TEST_DB_CONNECTION`, URI de la base de datos de datos MongoDB de prueba para los test end-to-end (Puede usar la anterior, si desea)
- `JWT_SECRET`, Secret para JWT

# Instalación y Ejecución

```
git clone https://github.com/anibal-vergaray-unmsm/reto-eks
cd reto-eks
npm install
npm run start:dev

```
# Scripts
- `prebuild`, Para eliminar el build actual
- `build`, Para generar el build
- `lint`, Para verificar la sintaxis del codigo
- `test`, Para ejecutar test unitarios
- `test:e2e`, Para ejecutar test end-to-end
- `test:cov`, Para revisar la cobertura de los tests
- `start`, Para ejecutar el proyecto
- `start:dev`, Para ejecutar el proyecto en modo desarrollador
- `start:prod`, Para ejecutar el build del proyecto