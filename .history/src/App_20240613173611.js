import './App.css';
// import Registration from './Registration';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes, Swicth } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
