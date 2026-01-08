import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Button, Paper, Grid, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, Alert, Divider
} from '@mui/material';
import { ArrowBack as BackIcon, Download, Print } from '@mui/icons-material';

const ResultsPage = () => {
  const { id } = useParams();  // ← PEGA O ID DA URL
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados baseado no ID
    loadExamData();
  }, [id]);

  const loadExamData = async () => {
    try {
      // Dados MOCK - no futuro virá da API
      const mockExams = {
        1: {
          id: 1,
          title: 'Belinha - Hemograma Completo',
          date: '2023-11-15',
          status: 'finalizado',
          patientName: 'Belinha (Cachorro - Shih Tzu)',
          tutorName: 'Maria Silva',
          cellCount: 42,
          results: {
            leucocitos: '8.2 x 10^3/μL',
            eritrocitos: '5.4 x 10^6/μL',
            plaquetas: '250 x 10^3/μL',
            hemoglobina: '14.2 g/dL',
            hematocrito: '42%'
          },
          observations: 'Hemograma dentro dos parâmetros normais para a espécie.'
        },
        2: {
          id: 2,
          title: 'Rex - Controle Mensal',
          date: '2023-11-10',
          status: 'processando',
          patientName: 'Rex (Cachorro - Pastor Alemão)',
          tutorName: 'João Santos',
          cellCount: null,
          results: null,
          observations: 'Exame em processamento. Resultado disponível em breve.'
        }
      };

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Encontrar exame pelo ID
      const foundExam = mockExams[id] || mockExams[1];
      setExam(foundExam);
      
    } catch (error) {
      console.error('Erro ao carregar exame:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Carregando resultados...</Typography>
      </Container>
    );
  }

  if (!exam) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">
          Exame não encontrado. ID: {id}
        </Alert>
        <Button 
          startIcon={<BackIcon />} 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Voltar ao Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Botão voltar */}
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Voltar
      </Button>

      {/* Cabeçalho */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          {exam.title}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Paciente
            </Typography>
            <Typography variant="body1">
              {exam.patientName}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Tutor
            </Typography>
            <Typography variant="body1">
              {exam.tutorName}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Data
            </Typography>
            <Typography variant="body1">
              {exam.date}
            </Typography>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip 
              label={exam.status === 'finalizado' ? 'Concluído' : 'Em processamento'}
              color={exam.status === 'finalizado' ? 'success' : 'warning'}
              size="small"
            />
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Células Contadas
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {exam.cellCount ? `${exam.cellCount} leucócitos` : 'Em análise'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Resultados */}
      {exam.status === 'finalizado' && exam.results ? (
        <>
          <Typography variant="h5" gutterBottom>
            Resultados do Exame
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Parâmetro</strong></TableCell>
                  <TableCell><strong>Resultado</strong></TableCell>
                  <TableCell><strong>Valor de Referência</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Leucócitos</TableCell>
                  <TableCell>{exam.results.leucocitos}</TableCell>
                  <TableCell>6.0 - 17.0 x 10^3/μL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Eritrócitos</TableCell>
                  <TableCell>{exam.results.eritrocitos}</TableCell>
                  <TableCell>5.0 - 8.0 x 10^6/μL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Plaquetas</TableCell>
                  <TableCell>{exam.results.plaquetas}</TableCell>
                  <TableCell>200 - 500 x 10^3/μL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hemoglobina</TableCell>
                  <TableCell>{exam.results.hemoglobina}</TableCell>
                  <TableCell>12.0 - 18.0 g/dL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hematócrito</TableCell>
                  <TableCell>{exam.results.hematocrito}</TableCell>
                  <TableCell>37 - 55%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Observações:
            </Typography>
            <Typography variant="body2">
              {exam.observations}
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="contained" startIcon={<Download />}>
              Download PDF
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Imprimir
            </Button>
          </Box>
        </>
      ) : (
        <Alert severity="warning">
          <Typography variant="subtitle2" fontWeight="bold">
            Exame em Processamento
          </Typography>
          <Typography variant="body2">
            Este exame está sendo processado pelo sistema. Os resultados estarão disponíveis em breve.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Status atual: {exam.status === 'processando' ? 'Processando imagem' : 'Aguardando processamento'}
          </Typography>
        </Alert>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="body2" color="text.secondary" align="center">
        ID do Exame: {id} | Sistema Cell.IA
      </Typography>
    </Container>
  );
};

export default ResultsPage;