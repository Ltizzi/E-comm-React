# README

## Para instalar y correr:

```
$ npm install
$ npm run dev

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

*Carrito (añadir uno o más productos, borrarlos)
*Barra de búsqueda (filtra productos según el texto ingresado)
*Componente para la visualización detallada del producto
*Administración de productos ('CRUD' para crear, actualizar y borrar productos usando mockAPI). En el componente AdminPanel hay una tabla con paginación que simula un manejo administrativo básico del sitio.
*Perfil de usuario + login y registro).
*Las ventas tienen en cuenta el stock.
