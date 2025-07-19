import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CompanyDashboard from './pages/company/CompanyDashboard';
import UserJobs from './pages/user/UserJobs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import JobDetails from './pages/user/JobDetails';
import MyApplications from './pages/user/MyApplications';
import CompanyApplications from './pages/company/CompanyApplications';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="/company/dashboard" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } />

        <Route path="/company/applications/:jobId" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyApplications />
          </ProtectedRoute>
        } />

        <Route path="/user/jobs" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserJobs />
          </ProtectedRoute>
        } />

        <Route path="/user/jobs/:id" element={
          <ProtectedRoute allowedRoles={['user']}>
            <JobDetails />
          </ProtectedRoute>
        } />

        <Route path="/user/applications" element={
          <ProtectedRoute allowedRoles={['user']}>
            <MyApplications />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
