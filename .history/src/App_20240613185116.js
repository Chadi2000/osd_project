import './App.css';
//import Registration from './Registration';
//import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Todo from './pages/Todo/Todo.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
