import { useState } from 'react';
import Dashboard from './Dashboard';
import './index.css';

function App() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      // 1. Enviamos la petición POST al backend local
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      // 2. Evaluamos la respuesta
      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // 3. Si todo va bien, guardamos el Token y cambiamos el estado
      localStorage.setItem('kairon_token', data.token); // Guardamos el token de seguridad
      localStorage.setItem('kairon_user', JSON.stringify(data.usuario)); // Opcional: guardamos datos del usuario
      setIsAuthenticated(true); // Cambiamos la vista al Dashboard

    } catch (err) {
      setError(err.message);
    }
  };

  // Si el usuario ya está autenticado, mostramos el Dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Si no está autenticado, mostramos el Login
  return (
    <div className="login-wrapper">
      <div className="header-brand">
        <div className="logo">
          <span className="logo-k">K<span className="logo-arrow">&lt;</span></span>
          <span className="logo-text">Kairon</span>
        </div>
        <p>Gestión Clínica</p>
      </div>

      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="coordinador@kairontherapy.com" 
              value={credentials.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              placeholder="••••••••" 
              value={credentials.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;