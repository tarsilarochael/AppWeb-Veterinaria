import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import ResultsPage from './pages/Results/ResultsPage';

// Router
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Router>
      <div className="App">
        <AppRouter />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;