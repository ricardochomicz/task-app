
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';




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
