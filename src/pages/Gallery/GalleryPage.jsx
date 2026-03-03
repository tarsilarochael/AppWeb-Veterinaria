import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, CloudUpload, Delete, Visibility, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

const GalleryPage = () => {
  const navigate = useNavigate();
  
  // Estado para controlar qual a imagem que está aberta em ecrã inteiro
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Simulando algumas imagens que já estariam na base de dados
  const [images, setImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1578507065211-1ca377b5d1e8?auto=format&fit=crop&w=300&q=80', date: '2023-11-15', name: 'amostra_belinha.jpg' },
    { id: 2, url: 'https://images.unsplash.com/photo-1574323136511-2d708fc7814e?auto=format&fit=crop&w=300&q=80', date: '2023-11-10', name: 'amostra_rex.jpg' },
    { id: 3, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80', date: '2023-10-28', name: 'amostra_thor.jpg' }
  ]);

  // Função para lidar com o upload de novas imagens
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simulação de upload
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now(),
        url: reader.result,
        date: new Date().toISOString().split('T')[0],
        name: file.name
      };
      
      setImages([newImage, ...images]);
      toast.success('Imagem enviada com sucesso!');
    };
    reader.readAsDataURL(file);
  };

  // Função para apagar imagem
  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
    toast.info('Imagem removida da galeria.');
  };

  return (
    <div className="gallery-container" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-light bg-white shadow-sm p-3 mb-4">
        <div className="container d-flex justify-content-between">
          <button 
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowBack className="me-1" />
            Voltar
          </button>
          <span className="navbar-brand fw-bold m-0" style={{ color: '#667eea' }}>Galeria Cell.IA</span>
          <div style={{ width: '80px' }}></div>
        </div>
      </nav>

      <div className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0 text-secondary">Minhas Imagens</h2>
          <div>
            <input 
              type="file" 
              id="upload-image" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-image" className="btn btn-primary d-flex align-items-center shadow-sm">
              <CloudUpload className="me-2" />
              Fazer Upload
            </label>
          </div>
        </div>

        {/* Grid de Imagens */}
        {images.length === 0 ? (
          <div className="text-center py-5 bg-white rounded shadow-sm">
            <CloudUpload style={{ fontSize: '4rem', color: '#ccc' }} className="mb-3" />
            <h5 className="text-muted">A tua galeria está vazia</h5>
            <p className="text-muted">Faz o upload de imagens do microscópio para começar.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {images.map((img) => (
              <div className="col" key={img.id}>
                <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                  <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e9ecef', cursor: 'pointer' }} onClick={() => setSelectedImage(img)}>
                    <img 
                      src={img.url} 
                      className="card-img-top h-100 w-100" 
                      alt={img.name}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="card-body p-3">
                    <h6 className="card-title text-truncate mb-1" title={img.name}>
                      {img.name}
                    </h6>
                    <small className="text-muted">Capturada em: {img.date}</small>
                  </div>
                  
                  <div className="card-footer bg-white border-top-0 p-3 d-flex justify-content-between">
                    {/* 👇 Aqui mudámos para definir a imagem selecionada e abrir a janela! */}
                    <button 
                      className="btn btn-sm btn-outline-primary d-flex align-items-center"
                      onClick={() => setSelectedImage(img)}
                    >
                      <Visibility fontSize="small" className="me-1" />
                      Ver
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger d-flex align-items-center"
                      onClick={() => handleDelete(img.id)}
                    >
                      <Delete fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 👇 Janela Modal para visualizar a imagem em grande */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedImage(null)} // Clicar fora fecha a imagem
        >
          <div 
            style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}
            onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche a janela
          >
            <button 
              className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
              style={{ position: 'absolute', top: '-15px', right: '-15px', width: '40px', height: '40px', zIndex: 10000, boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              onClick={() => setSelectedImage(null)}
            >
              <Close />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.name} 
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            />
          </div>
        </div>
      )}

      <style>{`
        .hover-shadow {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;