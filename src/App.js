import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';  // ✅ import here

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            {/* ✅ Protect Home */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home showAlert={showAlert} />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
