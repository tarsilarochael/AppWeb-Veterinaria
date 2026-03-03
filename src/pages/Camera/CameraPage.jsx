import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, CameraAlt, FlipCameraIos, Download } from '@mui/icons-material';
import { toast } from 'react-toastify';

const CameraPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' = traseira, 'user' = frontal

  // Iniciar a câmera
  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      toast.error('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  useEffect(() => {
    startCamera();
    
    // Limpar a câmera quando sair da página
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]); // Reinicia se mudar o giro da câmera

  // Função para programar a captura de imagens
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Ajustar o tamanho do canvas para o tamanho do vídeo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Converter para imagem (base64)
      const imageUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageUrl);
      toast.success('Imagem capturada com sucesso!');
    }
  };

  // Programar giro de tela / câmera
  const toggleCamera = () => {
    setFacingMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="camera-container" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-light bg-white shadow-sm p-3">
        <div className="container d-flex justify-content-between">
          <button 
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowBack className="me-1" />
            Voltar
          </button>
          <span className="navbar-brand fw-bold m-0" style={{ color: '#667eea' }}>Cell.IA Câmera</span>
          <div style={{ width: '80px' }}></div> {/* Espaçador para centralizar o título */}
        </div>
      </nav>

      {/* Conteúdo / Interface */}
      <div className="container py-4 d-flex flex-column align-items-center">
        <div className="card border-0 shadow-lg w-100" style={{ maxWidth: '600px', overflow: 'hidden' }}>
          
          {/* Previsão da Câmera ou Imagem Capturada */}
          <div className="bg-dark position-relative d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            {!capturedImage ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }}
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Captura do microscópio" 
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }}
              />
            )}
            
            {/* Canvas oculto usado apenas para processar a captura */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {/* Controles e Botões */}
          <div className="card-body bg-white text-center p-4">
            {!capturedImage ? (
              <div className="d-flex justify-content-center gap-4 align-items-center">
                <button 
                  className="btn btn-light rounded-circle p-3 shadow-sm"
                  onClick={toggleCamera}
                  title="Girar Câmera"
                >
                  <FlipCameraIos fontSize="large" color="primary" />
                </button>
                
                <button 
                  className="btn btn-primary rounded-circle shadow"
                  onClick={takePhoto}
                  style={{ width: '80px', height: '80px', border: '4px solid #e0e7ff' }}
                  title="Capturar"
                >
                  <CameraAlt fontSize="large" />
                </button>
              </div>
            ) : (
              <div className="d-grid gap-3 d-md-flex justify-content-center">
                <button 
                  className="btn btn-outline-secondary btn-lg"
                  onClick={retakePhoto}
                >
                  Tirar Outra
                </button>
                <button 
                  className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
                  onClick={() => toast.info('Imagem enviada para análise da IA!')}
                >
                  <Download className="me-2" />
                  Analisar Imagem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;