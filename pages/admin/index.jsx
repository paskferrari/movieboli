import React from 'react';
import AdminDashboard from '../../components/admin/AdminDashboard';
// Rimuovi l'import di AdminRoute
// import AdminRoute from '../../components/auth/AdminRoute';

const AdminPage = () => {
  return (
    // Rimuovi il wrapper AdminRoute per accesso pubblico
    <AdminDashboard />
  );
};

export default AdminPage;