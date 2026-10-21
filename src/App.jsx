import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { api } from './api';
import './index.css';

function App() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Al cargar la página, recupera la sesión si la cookie sigue vigente
  useEffect(() => {
    api('/auth/me')
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setCheckingSession(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      setUsuario(data.usuario);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => {});
    setUsuario(null);
    setCredentials({ email: '', password: '' });
  };

  if (checkingSession) {
    return null;
  }

  // Si el usuario ya está autenticado, mostramos el Dashboard
  if (usuario) {
    return <Dashboard usuario={usuario} onLogout={handleLogout} />;
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