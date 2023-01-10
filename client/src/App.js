import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Space } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import './index.css'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import  PublicRoute  from './components/PublicRoute';
import UsersList from './pages/admin/UsersList';
import AuthRoute from './components/AuthRoute';
function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status">
          </div>
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/Register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><AuthRoute><UsersList /></AuthRoute></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
