import './App.css';
//import Registration from './Registration';
//import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Todo } from './pages';

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
