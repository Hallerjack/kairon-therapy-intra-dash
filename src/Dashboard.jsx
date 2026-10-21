import React, { useState } from 'react';
import './index.css';

const mesActual = new Date().toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

function Dashboard({ usuario, onLogout }) {
  // Estado para simular qué sección está activa
  const [activeTab, setActiveTab] = useState('resumen');

  const iniciales = `${usuario.nombres?.[0] ?? ''}${usuario.apellidos?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="dashboard-container">
      {/* MENU LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-k">K<span>&lt;</span></span>
            <span className="logo-text">Kairon</span>
          </div>
          <p className="subtitle">Gestión Clínica</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'resumen' ? 'active' : ''} onClick={() => setActiveTab('resumen')}>
              <i className="fa-solid fa-chart-pie"></i> Resumen
            </li>
            <li className={activeTab === 'empresas' ? 'active' : ''} onClick={() => setActiveTab('empresas')}>
              <i className="fa-solid fa-building"></i> Empresas
            </li>
            <li className={activeTab === 'trabajadores' ? 'active' : ''} onClick={() => setActiveTab('trabajadores')}>
              <i className="fa-solid fa-users"></i> Trabajadores
            </li>
            <li className={activeTab === 'sesiones' ? 'active' : ''} onClick={() => setActiveTab('sesiones')}>
              <i className="fa-solid fa-notes-medical"></i> Registro Sesiones
            </li>
            <li className={activeTab === 'informes' ? 'active' : ''} onClick={() => setActiveTab('informes')}>
              <i className="fa-solid fa-file-pdf"></i> Informes
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">{iniciales}</div>
            <div>
              <strong>{usuario.nombres} {usuario.apellidos}</strong>
              <small>{usuario.rol === 'administrador' ? 'Administrador' : 'Terapeuta'}</small>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Salir</button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <header className="top-header">
          <h2>
            {activeTab === 'resumen' && 'Resumen General'}
            {activeTab === 'empresas' && 'Gestión de Empresas y Centros'}
            {activeTab === 'trabajadores' && 'Directorio de Trabajadores'}
            {activeTab === 'sesiones' && 'Registro de Sesiones (M7)'}
            {activeTab === 'informes' && 'Generación de Informes'}
          </h2>
          <div className="header-actions">
            <span className="date-badge">{mesActual}</span>
          </div>
        </header>

        <div className="content-area">
          {/* Aquí inyectaremos los componentes dinámicos según el tab activo */}
          <div className="placeholder-card">
            <h3>Bienvenido al Panel de Kairon Therapy</h3>
            <p>Selecciona una opción del menú lateral para comenzar a gestionar los datos.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;