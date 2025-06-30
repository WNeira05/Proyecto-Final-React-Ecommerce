import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";

const SearchBar = () => {
    const { busqueda, setBusqueda } = useContext(CartContext);

    return (
        <div style={{ margin: '20px 0' }}>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                    padding: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ccc'
                }}
            />
        </div>
    );
};

export default SearchBar;
