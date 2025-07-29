import React from 'react';
import AdminRoute from '../../components/auth/AdminRoute';
import AdminDashboard from '../../components/admin/AdminDashboard';

const AdminPage = () => {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
};

export default AdminPage;