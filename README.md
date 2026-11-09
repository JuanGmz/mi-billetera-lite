# Mi Billetera Lite

PWA para registrar gastos diarios. Funciona offline, es instalable y guarda los datos en IndexedDB.

## Ejecutar en local
```bash
npx serve . -l 8080   # o: python3 -m http.server 8080
```
Abrir http://localhost:8080 (localhost cuenta como contexto seguro).

## Desplegar (GitHub Pages)
Subir el repo, activar Settings → Pages → rama `main` / raíz. Todas las rutas son relativas, así que funciona bajo `/<repo>/`.

## Pruebas de aceptación
1. **Instalación:** Chrome muestra el ícono de instalar; abre en ventana standalone.
2. **Lighthouse:** DevTools → Lighthouse (categoría PWA / Installable).
3. **Offline:** DevTools → Network → Offline → F5; la app carga con CSS y JS.
4. **Persistencia:** offline, agregar "Taxis" $150, cerrar y reabrir; el gasto y el total siguen ahí.

Al cambiar archivos del App Shell, subir `CACHE_NAME` en `sw.js` (p. ej. `billetera-v2`); `activate` borra la caché anterior.
