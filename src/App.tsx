import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto ">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
