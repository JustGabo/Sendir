import React from 'react';
import { AuthProvider } from './context/AuthContext';
import DashboardScreen from './(protected)/dashboard/page';

export default function App() {
  return (
    <div>
      <AuthProvider>
      <DashboardScreen />
    </AuthProvider>
    </div>
  );
}
