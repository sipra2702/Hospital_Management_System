import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import About from './pages/public/About';
import Doctor from './pages/public/Doctor'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';

// Route Guards
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import Cardiology from "./pages/public/Cardiology";
import Neurology from "./pages/public/Neurology";
import Orthopedics from './pages/public/Orthopedics';
import Pediatrics from "./pages/public/Pediatrics";
import Emergency from "./pages/public/Emergency";


function App() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="services" element={<Services/>} />
         <Route path="about" element={<About/>} />
          <Route path="doctor" element={<Doctor/>} />
          <Route path="contact" element={<Contact/>} />
          

        
        <Route path="/departments/cardiology" element={<Cardiology />} />
        <Route path="/departments/neurology" element={<Neurology />} />
        <Route path="/departments/orthopedics" element={<Orthopedics />} />
        <Route path="/departments/pediatrics" element={<Pediatrics />} />
        <Route path="/departments/emergency" element={<Emergency />} />
       

        
        {/* Only accessible if NOT logged in */}
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* Only accessible if logged in */}
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Admin Routes with Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;