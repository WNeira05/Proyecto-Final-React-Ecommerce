import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css'; 

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit, errors } = useAuth();

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        <div className="form-group">
          <label htmlFor="formBasicEmail">Correo Electrónico</label>
          <input
            id="formBasicEmail"
            type="email"
            placeholder="Ingrese el email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="formBasicPassword">Contraseña</label>
          <input
            id="formBasicPassword"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-login">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
};

export default Login;
