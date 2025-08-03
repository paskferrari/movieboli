import React from 'react';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminRoute from '../../components/auth/AdminRoute';

const AdminPage = () => {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
};

export default AdminPage;