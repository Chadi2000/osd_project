import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Todo from './pages/Todo/Todo.tsx';
//import Registration from './Registration.js';
import { AuthProvider } from './utils/AuthContext.js';
import ProtectedRoute from './utils/ProtectedRoute.js';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/todo'
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
          {/* <Route path='/registration' element={<Registration />} /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
