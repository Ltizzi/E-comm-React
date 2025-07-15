# README

Primer proyecto hecho en React. Un E-commerce pseudo funcional (sin API real y con login/comprar hardcoded) de una tienda de disco. Las imágenes fueron creadas con ChatGPT. Se usó TailwindCSS y DaisyUI para estilos y componentes. También se uso react-router-dom para enrutamiento y react-icons para íconos. Proyecto creado y potenciado por Vite.

## Para instalar y correr:

```
$ npm install           #Para instalar
$ npm run dev           #Para correr local como dev
$ npm run build         #Para construír el proyecto para producción

```

## Usuarios hardcodeados:

```
"users":[
    {
        "type": "basic",
        "user": "basic@gmail.com",
        "password": "12345"
    },
    {
        "type": "admin",
        "user": "admin@gmail.com",
        "password": "12345"
    }

]

```

Se proveen dos usuarios pero de todos modos está la opción de registrarse (tanto en login como en el menú nav) en la ruta '/signup'.

## FEATURES:

*Carrito (añadir uno o más productos, borrarlos, lógica en AppContext)
*Barra de búsqueda (filtra productos según el texto ingresado)
*Componente para la visualización detallada del producto
*Administración de productos ('CRUD' para crear, actualizar y borrar productos usando mockAPI). En el componente AdminPanel hay una tabla con paginación que simula un manejo administrativo básico del sitio.
*Perfil de usuario + login y registro (lógica en AuthContext).
*Las ventas tienen en cuenta el stock.
