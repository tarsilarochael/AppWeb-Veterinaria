import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithGoogle } from '../../services/firebase/auth.service'; // Importando a função real!

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Chama a função que abre o pop-up do Google
      const userData = await signInWithGoogle();
      
      toast.success(`Bem-vinda(o), ${userData.name}!`);
      
      // Salva os dados reais no localStorage
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', JSON.stringify({
        name: userData.name,
        email: userData.email,
        photo: userData.photoURL,
        role: 'veterinario' // ou pega do seu banco de dados depois
      }));
      
      // Manda pro Dashboard
      navigate('/dashboard');
      
    } catch (error) {
      toast.error('Poxa, deu erro ao conectar com o Google. Tenta de novo?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleGoogleLogin}
      disabled={loading}
      style={{
        width: '100%', padding: '0.5rem', backgroundColor: '#fff', 
        color: '#757575', border: '1px solid #ddd', borderRadius: '0.375rem', 
        fontWeight: 'bold', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', gap: '10px', marginTop: '1rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1
      }}
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
      {loading ? 'Conectando...' : 'Entrar com Google'}
    </button>
  );
};

export default GoogleSignIn;