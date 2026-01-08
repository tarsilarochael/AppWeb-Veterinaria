import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { AccountCircle, Lock, Login as LoginIcon } from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Integrar com backend real
      // Simulação de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Login bem-sucedido
      toast.success('Login realizado com sucesso!');
      
      // Salvar token/auth no localStorage
      localStorage.setItem('authToken', 'simulated-token');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'Thiago',
        email: formData.email,
        role: 'Professor'
      }));
      
      // Redirecionar para dashboard
      navigate('/dashboard');
      
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        {/* Logo/Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Cell.IA
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sistema de Análise de Células Veterinárias
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desenvolvido em parceria CEFET-MG / UFMG
          </Typography>
        </Box>

        {/* Formulário de Login */}
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            <LoginIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Login
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Acesso restrito a profissionais autorizados
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Nota:</strong> A autenticação via Google foi removida conforme 
              especificado no TCC para maior controle pelo banco de dados.
            </Typography>
          </Alert>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <AccountCircle sx={{ mr: 1, color: 'action.active' }} />
              }}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />
              }}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Entrar'
              )}
            </Button>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Não tem conta?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 'bold'
                  }}
                >
                  Solicitar acesso
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        {/* Informações do sistema */}
        <Box mt={4} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Versão 2.0 • Migrado de Flutter para React
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            Projeto de TCC - Engenharia de Computação CEFET-MG
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;