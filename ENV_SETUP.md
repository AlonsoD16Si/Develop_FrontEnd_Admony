# Configuración de Variables de Entorno

Para mayor seguridad, las URLs de la API se configuran mediante variables de entorno.

## Pasos para configurar

1. **Crea el archivo `.env.local`** en la raíz del proyecto con el siguiente contenido:

```env
# Configuración de la API
# Este archivo contiene las variables de entorno para desarrollo local
# NO compartas este archivo - está en .gitignore

# URL base de la API backend
# Para desarrollo local usa: http://localhost:3000
# Para servidor en red usa: http://192.168.56.1:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

2. **Crea el archivo `.env.example`** (opcional, para documentación) con el siguiente contenido:

```env
# Configuración de la API
# Copia este archivo a .env.local y ajusta los valores según tu entorno

# URL base de la API backend
# Para desarrollo local: http://localhost:3000
# Para servidor en red: http://192.168.56.1:3000
# Para producción: https://api.tudominio.com
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Valores según el entorno

- **Desarrollo local**: `http://localhost:3000`
- **Servidor en red local**: `http://192.168.56.1:3000` (o la IP de tu servidor)
- **Producción**: `https://api.tudominio.com` (o la URL de tu API en producción)

## Importante

- El archivo `.env.local` está en `.gitignore` y **NO se subirá al repositorio**
- El archivo `.env.example` puede subirse al repositorio como documentación
- Después de crear o modificar `.env.local`, reinicia el servidor de desarrollo de Next.js

## Verificación

Los archivos `login/page.tsx` y `register/page.tsx` ahora usan la función `apiRequest` de `lib/api.ts`, que lee automáticamente la variable `NEXT_PUBLIC_API_URL` del archivo `.env.local`.

