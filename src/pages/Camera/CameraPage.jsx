import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const CameraPage = () => {
  const navigate = useNavigate();

  return (
    <div className="camera-container">
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
          <span className="navbar-brand fw-bold">Câmera</span>
          <div></div> {/* Espaçador */}
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center p-5">
                <div className="display-1 text-muted mb-4">📸</div>
                <h2 className="mb-3">Funcionalidade de Câmera</h2>
                <p className="text-muted mb-4">
                  Esta funcionalidade permitirá capturar imagens diretamente do microscópio 
                  usando a câmera do dispositivo.
                </p>
                
                <div className="alert alert-info mb-4">
                  <strong>Funcionalidade em desenvolvimento:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Integração com react-webcam</li>
                    <li>Captura direta do microscópio</li>
                    <li>Pré-visualização em tempo real</li>
                    <li>Envio automático para análise</li>
                  </ul>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button className="btn btn-primary btn-lg">
                    Simular Captura
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-lg"
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

export default CameraPage;