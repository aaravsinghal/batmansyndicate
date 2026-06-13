import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import FakeCover from './pages/fakeCover';
import OverviewPage from './pages/overview';
import MissionsPage from './pages/missions';
import CommsPage from './pages/comms';
import EquipmentPage from './pages/equipment';
import MapPage from './pages/map';
import WaynePage from './pages/wayne';
import NotFoundPage from './pages/404';

function LockGuard({ children }) {
  const sessionCheck = localStorage.getItem('session_active');
  if (sessionCheck === 'true') {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default function App() {
  const handleUnlock = () => {
    console.log('ooh so you know how to open this , interesting');
    localStorage.setItem('session_active', 'true');
    

    window.location.pathname = '/dashboard'; 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FakeCover onUnlock={handleUnlock} />} />
        <Route path="/dashboard" element={<LockGuard><OverviewPage /></LockGuard>} />
        <Route path="/dashboard/missions" element={<LockGuard><MissionsPage /></LockGuard>} />
        <Route path="/dashboard/comms" element={<LockGuard><CommsPage /></LockGuard>} />
        <Route path="/dashboard/equipment" element={<LockGuard><EquipmentPage /></LockGuard>} />
        <Route path="/dashboard/map" element={<LockGuard><MapPage /></LockGuard>} />
        <Route path="/dashboard/wayne" element={<LockGuard><WaynePage /></LockGuard>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
