import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import StudentHome from './pages/StudentHome';
import StudentGoals from './pages/StudentGoals';
import StudentClareira from './pages/StudentClareira';
import StudentCredit from './pages/StudentCredit';
import ParentDashboard from './pages/ParentDashboard';
import ParentControls from './pages/ParentControls';
import ParentApprovals from './pages/ParentApprovals';
import FaceCheck from './pages/FaceCheck';

function AppRouter() {
  const { currentView } = useApp();

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'student-home':
      return <StudentHome />;
    case 'student-goals':
      return <StudentGoals />;
    case 'student-clareira':
      return <StudentClareira />;
    case 'student-credit':
      return <StudentCredit />;
    case 'parent-dashboard':
      return <ParentDashboard />;
    case 'parent-controls':
      return <ParentControls />;
    case 'parent-approvals':
      return <ParentApprovals />;
    case 'face-check':
      return <FaceCheck />;
    default:
      return <LandingPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
