import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulação de login (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar mensagem de sucesso
      toast.success('Login realizado com sucesso!');
      
      // Salvar autenticação (simulado)
      localStorage.setItem('authToken', 'simulated-token-123');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'Thiago Pereira',
        email: formData.email,
        role: 'Professor',
        instituicao: 'CEFET-MG / UFMG'
      }));
      
      // Redirecionar após 1 segundo
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="login-card" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Cabeçalho */}
        <div className="text-center mb-4">
          <h1 className="text-primary fw-bold mb-2">Cell.IA</h1>
        </div>

        {/* Título do formulário */}
        <h2 className="text-center mb-3">Login</h2>
        

        {/* Alerta informativo (do TCC) */}
        <div className="alert alert-info mb-4">
          <small>
            <strong>Nota (TCC):</strong> A autenticação via Google foi removida para 
            maior controle pelo banco de dados.
          </small>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Entrando...
              </>
            ) : 'Entrar no Sistema'}
          </button>

          <div className="text-center mt-4">
            <small className="text-muted">
              Não tem conta?{' '}
              <button 
                className="btn btn-link p-0 text-primary fw-bold"
                style={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  toast.info('Entre em contato com o administrador para solicitar acesso.');
                }}
              >
                Solicitar acesso
              </button>
            </small>
          </div>
        </form>

        {/* Rodapé */}
        <div className="text-center mt-5 pt-3 border-top">
          <small className="text-muted d-block">
            Versão 2.0 • Migrado de Flutter para React
          </small>
          <small className="text-muted">
           Engenharia de Computação CEFET-MG
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;