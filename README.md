🚀 Funcionalidades Implementadas

✅ Cart — Componente de Carrito

🎬 Drawer animado lateral	Se abre/cierra con animación desde el lateral derecho.

🧺 Listado de productos agrupados	Agrupa por ID e incluye nombre, descripción, precio y subtotal.

➕➖ Controles de cantidad	Botones para aumentar/disminuir la cantidad de cada ítem.

❌ Eliminar ítem	Botón para quitar un producto específico del carrito.

🗑️ Vaciar carrito (clearCart)	Elimina todos los productos del carrito.

🛍️ Confirmar compra (confirmarCompra)	Descuenta el stock y limpia el carrito.

🏠 Redirección al Home	Si el carrito está vacío, redirige automáticamente.

✅ CartContext — Gestión del Carrito Global

🧠 Context API	Uso de createContext y useState para manejar el estado global.

🗃️ Carga de productos	Desde un archivo JSON simulado.

📉 Control de stock	Antes de agregar o aumentar cantidad, se verifica disponibilidad.

💬 Mensajes interactivos	Integración con SweetAlert2 para mostrar alertas amigables.

🧮 Agrupamiento de Productos

🧩 Cuando se agregan productos al carrito:

    Se agrupan automáticamente por id.

    Se actualiza la cantidad total por producto.

🔧 Funciones Principales

➕ handleAddToCart

    ✅ Verifica si el producto ya está en el carrito.

    🔒 Controla que la cantidad no supere el stock disponible.

    🔁 Si existe, incrementa la cantidad.

    🆕 Si no, lo agrega al array cart.

➖ handleDeleteFromCart

    ➖ Si hay más de uno, disminuye la cantidad.

    ❌ Si hay solo uno, lo elimina del carrito.

🔼 handleIncreaseQuantity

    🚫 Verifica que no supere el stock antes de aumentar.

🗑️ clearCart

    🧹 Elimina todos los productos del carrito.

🛍️ confirmarCompra

    📉 Descuenta el stock disponible.

    🧼 Limpia el carrito.

    ✅ Muestra mensaje de éxito con SweetAlert2.