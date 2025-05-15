# Consignas pre-entrega.

## Requerimiento #1: Funcionalidad básica del carrito de compras

Listar productos disponibles
Crea un componente (por ejemplo, ProductList) que muestre los productos.
Puedes usar una lista fija o una obtenida desde una API.
Manejo del carrito con useState
Crea un estado para el carrito (const [cart, setCart] = useState([])).
Este estado debe actualizarse al agregar o quitar productos.
Agregar productos al carrito
Implementa un botón en cada producto con un evento onClick.
Al hacer clic, el producto debe agregarse al carrito usando setCart.
Mostrar el carrito en otro componente
Crea un componente separado (por ejemplo, Cart) que reciba y muestre los productos del carrito.
Diseño del layout general
Crea un diseño claro y navegable: navbar, footer y vista principal de productos.

## ✅ Requerimiento #2: Conexión con una API de productos

Conectar con una API
Usa fetch en useEffect para traer datos desde una API pública de productos (o cualquier otra).
Manejo de carga y errores
Crea estados para manejar el loading (isLoading) y errores (error).
Actualizar estado con useState
Guarda los productos en un estado como products.
Actualizar el diseño del eCommerce
Asegúrate de que los datos de la API se integren correctamente al diseño.
Manejo de efectos secundarios con useEffect
Llama a la API solo cuando el componente se monte o cuando sea necesario actualizar los productos.
Ampliar funcionalidad del carrito
Permitir eliminar productos del carrito, ver cantidades o totales.

## ✅ Requerimiento #3: Implementación de rutas

Agregar rutas con react-router-dom
Instala y configura las rutas (BrowserRouter, Routes, Route).
Manejo de carga y errores por ruta
Muestra mensajes apropiados en cada vista si hay errores o carga.
Crear componentes por sección
Ejemplo: Home, ProductDetail, Cart, About.
Navegar entre productos
Permite ver detalles de un producto al hacer clic.

## ✅ Requerimiento #4: Rutas dinámicas y protegidas

Rutas dinámicas
Usa rutas como /product/:id para mostrar detalles individuales.
Interactividad
Permite que los componentes reaccionen al contexto (e.g., mostrar un producto según su ID).
Rutas protegidas
Simula autenticación para acceder a ciertas rutas (por ejemplo, /admin solo si está logueado).
Navbar

Crea una barra de navegación con links a todas las secciones.
src/
├── assets/
│
├── auth/
│ └── RutasProtegidas.jsx
│
├── components/
│ ├── Cart.jsx
│ ├── DetallesProductos.jsx
│ ├── ProductList.jsx
│ ├── Productos.jsx
│ └── estaticos/
│ ├── styleCart.css
│ └── styleProductos.css
│
├── context/
│ └── CartContext.jsx
│
├── pages/
│ ├── AcercaDe.jsx
│ ├── Admin.jsx
│ ├── Contactos.jsx
│ ├── GaleriaDeProductos.jsx
│ ├── Home.jsx
│ ├── Login.jsx
│ └── NotFound.jsx
│
│
├── App.jsx
├── index.jsx
