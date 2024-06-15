import './App.css';
//import Registration from './Registration';
//import Login from './Login';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Todo from './pages/Todo/Todo.tsx';
import Registration from './Registration.js';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <ProtectedRoute path="/todo" element={<Todo />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
