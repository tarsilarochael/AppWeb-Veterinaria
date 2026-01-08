import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CameraPage from '../pages/Camera/CameraPage';
import ResultsPage from '../pages/Results/ResultsPage';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRouter() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/camera" element={
        <ProtectedRoute>
          <CameraPage />
        </ProtectedRoute>
      } />
      
      <Route path="/results" element={
        <ProtectedRoute>
          <ResultsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/results/:id" element={
        <ProtectedRoute>
          <div className="container mt-5">
            <h1>Detalhe do Resultado</h1>
            <p>Página em desenvolvimento</p>
          </div>
        </ProtectedRoute>
      } />
      
      {/* Rota padrão */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Rota 404 */}
      <Route path="*" element={
        <div className="container mt-5 text-center">
          <h1 className="text-danger">404</h1>
          <p>Página não encontrada</p>
          <a href="/" className="btn btn-primary">Voltar ao Dashboard</a>
        </div>
      } />
    </Routes>
  );
}

export default AppRouter;