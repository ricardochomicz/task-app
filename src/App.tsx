import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <NavBar />
        <div className="container mx-auto ">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
