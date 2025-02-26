import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import AudioManagement from './pages/AudioManagement';
import EHRGeneration from './pages/EHRGeneration';
import Translation from './pages/Translation';
import PDFExport from './pages/PDFExport';
import AddPatient from './pages/AddPatient';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/audio" element={<AudioManagement />} />
              <Route path="/generate" element={<EHRGeneration />} />
              <Route path="/translate" element={<Translation />} />
              <Route path="/export" element={<PDFExport />} />
              <Route path="/add-patient" element={<AddPatient />} />
            </Route>
          </Routes>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;