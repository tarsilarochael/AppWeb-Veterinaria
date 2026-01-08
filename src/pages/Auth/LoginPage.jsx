import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // IMPORTANTE!

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
      // Simulação de login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Login realizado com sucesso!');
      
      localStorage.setItem('authToken', 'simulated-token-123');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'Thiago Pereira',
        email: formData.email,
        role: 'aluno',
        instituicao: 'CEFET-MG'
      }));
      
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ 
            color: '#667eea', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            fontSize: '2.5rem'
          }}>
            Cell.IA
          </h1>
        </div>

        {/* Título do formulário */}
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

        {/* Alerta informativo */}
        <div style={{
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <strong>Nota:</strong> A autenticação via Google foi removida para 
          maior controle pelo banco de dados.
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Senha
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
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
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                Entrando...
              </>
            ) : 'Entrar no Sistema'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <small style={{ color: '#6c757d' }}>
              Não tem conta?{' '}
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: 'bold',
                  padding: 0,
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
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
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '1rem',
          borderTop: '1px solid #dee2e6'
        }}>
          <small style={{ color: '#6c757d', display: 'block' }}>
            Versão 2.0 • Migrado de Flutter para React
          </small>
        </div>
      </div>

      {/* Adicionar animação do spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsividade */
        @media (max-width: 576px) {
          .login-card {
            padding: 1.5rem;
            margin: 0 1rem;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;