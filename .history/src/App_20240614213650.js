import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Todo from './pages/Todo/Todo';
import Registration from './Registration';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route 
            path='/todo' 
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            } 
          />
          <Route path='/registration' element={<Registration />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
