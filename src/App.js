import RegisterPage from './pages/RegisterPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ResetPage from './pages/ResetPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<RegisterPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resetpassword' element={<ResetPage />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
