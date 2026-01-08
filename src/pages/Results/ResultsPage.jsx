import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Search, FilterList } from '@mui/icons-material';

const ResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="results-container">
      {/* Header */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowBack className="me-1" />
            Voltar
          </button>
          <span className="navbar-brand fw-bold">Resultados</span>
          <div></div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Filtros */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text">
                <Search />
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar exames por título, data ou status..."
              />
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-secondary w-100">
              <FilterList className="me-2" />
              Filtrar
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h3 className="card-title mb-4">Todos os Exames</h3>
                
                <div className="alert alert-warning">
                  <strong>Página em desenvolvimento</strong>
                  <p className="mb-0 mt-2">
                    Esta página mostrará a lista completa de exames com filtros avançados,
                    visualização de imagens processadas e download de relatórios.
                  </p>
                </div>

                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3">📊</div>
                  <h4>Funcionalidade em construção</h4>
                  <p className="text-muted">
                    Baseado na Figura 5 do TCC, esta página mostrará os resultados 
                    detalhados com imagens analisadas e contagem de células.
                  </p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/dashboard')}
                  >
                    Voltar ao Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;