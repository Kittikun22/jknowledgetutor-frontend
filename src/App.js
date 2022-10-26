import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Payment from './pages/payment';
import Subpack from './pages/SubPackageList';
import Courses from './pages/Courses'
import CreateCourses from './pages/Create_course'
import Logout from './pages/Logout'
import CoursesContents from './pages/CoursesContents';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-courses" element={<CreateCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/subpack" element={<Subpack />} />
        <Route path="/course/:courseId" element={<CoursesContents />} />
      </Routes>
    </>
  );
}

export default App;
