import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("isAuth") === "true";
    if (auth) {
      setIsAuthenticated(true);
      navigate("/admin");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = "Email es requerido";
    if (!password) validationErrors.password = "Password es requerido";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("data/users.json");
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: "Credenciales inválidas" });
      } else {
        if (foundUser.role === "admin") {
          setIsAuthenticated(true);
          localStorage.setItem("isAuth", true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrors({
        email: "Algo salió mal. Por favor, intentá de nuevo más tarde.",
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        errors,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
