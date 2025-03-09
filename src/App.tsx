import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="container mx-auto ">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
