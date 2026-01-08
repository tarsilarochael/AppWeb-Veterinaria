import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Camera, 
  Upload, 
  History, 
  Person, 
  Logout,
  CheckCircle,
  AccessTime,
  PlayCircle,
  ArrowForward
} from '@mui/icons-material';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dados do usuário (do localStorage)
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Se não tem usuário, redireciona para login
      navigate('/login');
    }
    
    // Carregar exames (simulado)
    loadExams();
  }, [navigate]);

  const loadExams = async () => {
    try {
      // Simulação de carga de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados de exemplo baseados no TCC
      const mockExams = [
        {
          id: 1,
          title: 'Belinha - Hemograma Completo',
          date: '2023-11-15',
          status: 'finalizado',
          cellCount: 42,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          title: 'Rex - Controle Mensal',
          date: '2023-11-10',
          status: 'processando',
          cellCount: null,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          title: 'Luna - Pré-Operatório',
          date: '2023-11-05',
          status: 'aguardando',
          cellCount: null,
          imageUrl: 'https://via.placeholder.com/150'
        },
        {
          id: 4,
          title: 'Thor - Check-up Anual',
          date: '2023-10-28',
          status: 'finalizado',
          cellCount: 38,
          imageUrl: 'https://via.placeholder.com/150'
        }
      ];
      
      setExams(mockExams);
    } catch (error) {
      toast.error('Erro ao carregar exames');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.info('Logout realizado com sucesso');
    navigate('/login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'finalizado':
        return <CheckCircle className="text-success" />;
      case 'processando':
        return <PlayCircle className="text-warning" />;
      case 'aguardando':
        return <AccessTime className="text-secondary" />;
      default:
        return <AccessTime className="text-secondary" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'finalizado':
        return 'Processamento finalizado';
      case 'processando':
        return 'Processando';
      case 'aguardando':
        return 'Aguardando o processamento';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'finalizado':
        return 'success';
      case 'processando':
        return 'warning';
      case 'aguardando':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">
            <Camera className="me-2" />
            Cell.IA
          </span>
          
          <div className="d-flex align-items-center">
            <div className="text-white me-3">
              <Person className="me-1" />
              <span className="d-none d-md-inline">
                {user?.name || 'Usuário'} ({user?.role || 'Professor'})
              </span>
            </div>
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              <Logout className="me-1" />
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container py-4">
        {/* Boas-vindas (Figura 7 do TCC) */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title mb-3">
                  Olá, <span className="text-primary">{user?.name || 'Professor'}!</span> 👋
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="row mb-5">
          <div className="col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <Camera style={{ fontSize: '3rem', color: '#4c5af2' }} />
                </div>
                <h4 className="card-title">Capturar Imagem</h4>
                <p className="card-text text-muted">
                  Use a câmera do dispositivo para capturar imagens diretamente do microscópio.
                </p>
                <Link to="/camera" className="btn btn-primary btn-lg w-100">
                  <Camera className="me-2" />
                  Acessar Câmera
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body text-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <Upload style={{ fontSize: '3rem', color: '#28a745' }} />
                </div>
                <h4 className="card-title">Upload da Galeria</h4>
                <p className="card-text text-muted">
                  Envie imagens já capturadas da galeria do dispositivo para análise.
                </p>
                <button 
                  className="btn btn-success btn-lg w-100"
                  onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                >
                  <Upload className="me-2" />
                  Fazer Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Últimos exames (Figura 6 do TCC) */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">
                    <History className="me-2" />
                    Últimos Exames
                  </h4>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={loadExams}
                  >
                    Atualizar
                  </button>
                </div>
              </div>
              <div className="card-body">
                {exams.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">Nenhum exame encontrado.</p>
                    <p>Capture sua primeira imagem para começar!</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Exame</th>
                          <th>Data</th>
                          <th>Status</th>
                          <th>Células Contadas</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exams.map((exam) => (
                          <tr key={exam.id}>
                            <td>
                              <strong>{exam.title}</strong>
                            </td>
                            <td>
                              {new Date(exam.date).toLocaleDateString('pt-BR')}
                            </td>
                            <td>
                              <span className={`badge bg-${getStatusColor(exam.status)}`}>
                                {getStatusIcon(exam.status)} {getStatusText(exam.status)}
                              </span>
                            </td>
                            <td>
                              {exam.cellCount ? (
                                <span className="fw-bold">{exam.cellCount} leucócitos</span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>
                              <Link 
                                to={`/results/${exam.id}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Ver Detalhes
                                <ArrowForward className="ms-1" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Informações do sistema */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info">
              <h6 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Informações do Sistema (TCC)
              </h6>
              <ul className="mb-0">
                <li>
                  <strong>Arquitetura:</strong> Frontend React + Backend NestJS + Python (Detectron2)
                </li>
                <li>
                  <strong>Processamento:</strong> Imagens são enviadas para fila de jobs no AWS Lambda
                </li>
                <li>
                  <strong>Classificação:</strong> Utiliza Fast R-CNN para detecção de leucócitos
                </li>
                <li>
                  <strong>Status possíveis:</strong> Aguardando → Processando → Finalizado
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6>Cell.IA - Sistema Veterinário</h6>
            </div>
            <div className="col-md-6 text-md-end">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;