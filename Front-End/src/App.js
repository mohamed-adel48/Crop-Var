import './index.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import { LanguageProvider } from './LanguageContext';
import Cookies from "js-cookie";
import { ToastContainer,toast } from 'react-toastify';
import { 
  Route,
  Routes,Redirect 
 } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const token = Cookies.get('jwt');

    if (token) {
      if (!window.location.href.split("/").includes("dashboard"))
      window.location.href = '/dashboard'; // Replace '/home' with the actual URL of your home page
    }
  }, []);
  return (
    <div className="App">
      <LanguageProvider>
      <Routes>
      <Route path='/'  element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='*' to="/login" />
      </Routes>
      </LanguageProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
