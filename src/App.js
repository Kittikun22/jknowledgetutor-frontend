import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Payment from './pages/payment';
import Subpack from './pages/packageList';
import Courses from './pages/Courses'
import CreateCourses from './pages/Create_course'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-courses" element={<CreateCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/subpack" element={<Subpack />} />
      </Routes>
    </>
  );
}

export default App;
