import { Outlet } from 'react-router-dom';
import ASidebar from '../admin/ASidebar';

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <ASidebar />
      <div className="main-content" style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;