import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuth] = useState(false);
    const [busqueda, setBusqueda] = useState("");


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        fetch('https://685631e91789e182b37d51a2.mockapi.io/articles')
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setProductos(data);
                    setCargando(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Error al cargar los productos:', err);
                setCargando(false);
                setError(true);
            });
    }, []);

    const productosFiltrados = productos.filter((producto) =>
        producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleAddToCart = (productoNuevo) => {
        let agregado = false;

        setCart(prevCart => {
            const productoExistente = prevCart.find(item => item.id === productoNuevo.id);
            const productoCatalogo = productos.find(p => p.id === productoNuevo.id);
            const stockDisponible = productoCatalogo ? productoCatalogo.stock : 0;

            const cantidadEnCarrito = productoExistente ? productoExistente.cantidad : 0;
            const cantidadTotal = cantidadEnCarrito + productoNuevo.cantidad;

            if (cantidadTotal > stockDisponible) {
                Swal.fire({
                    title: "Stock insuficiente",
                    text: `Solo hay ${stockDisponible} unidades disponibles de este producto.`,
                    icon: "warning",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f27474",
                });
                return prevCart;
            }

            agregado = true;

            if (productoExistente) {
                return prevCart.map(item =>
                    item.id === productoNuevo.id
                        ? { ...item, cantidad: item.cantidad + productoNuevo.cantidad }
                        : item
                );
            } else {
                return [...prevCart, { ...productoNuevo }];
            }
        });

        if (agregado) {
            toast.success(`El producto ${productoNuevo.nombre} se ha agregado al carrito`);
        }
    };

    const handleDeleteFromCart = (producto) => {
        setCart(prevCart =>
            prevCart
                .map(item => {
                    if (item.id === producto.id) {
                        if (item.cantidad > 1) {
                            return { ...item, cantidad: item.cantidad - 1 };
                        } else {
                            return null;
                        }
                    }
                    return item;
                })
                .filter(item => item !== null)
        );
    };

    const handleIncreaseQuantity = (producto) => {
        const productoCatalogo = productos.find(p => p.id === producto.id);
        const stockDisponible = productoCatalogo ? productoCatalogo.stock : 0;

        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === producto.id) {
                    if (item.cantidad < stockDisponible) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    } else {
                        Swal.fire({
                            title: "Stock insuficiente",
                            text: `No se puede agregar más de ${stockDisponible} unidades.`,
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#f27474",
                        });
                    }
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart"); 
    };

    const confirmarCompra = () => {
        const nuevosProductos = productos.map(prod => {
            const itemEnCarrito = cart.find(item => item.id === prod.id);
            if (itemEnCarrito) {
                const nuevoStock = prod.stock - itemEnCarrito.cantidad;
                return { ...prod, stock: nuevoStock >= 0 ? nuevoStock : 0 };
            }
            return prod;
        });

        setProductos(nuevosProductos);
        clearCart();

        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            productos,
            productosFiltrados,
            busqueda,
            setBusqueda,
            cargando,
            error,
            handleAddToCart,
            handleDeleteFromCart,
            handleIncreaseQuantity,
            clearCart,
            confirmarCompra,
            isAuthenticated,
            setIsAuth
        }}>
            {children}
        </CartContext.Provider>
    );
};
