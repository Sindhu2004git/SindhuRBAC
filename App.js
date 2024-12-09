import React from 'react';
import UserManagement from './components/UserManagement/UserManagement';
import RoleManagement from './components/RoleManagement/RoleManagement';
import PermissionManagement from './components/PermissionManagement/PermissionManagement';

function App() {
    return (
        <div className="container mt-4">
            <h1 style={{ textAlign: 'center' }}>RBAC Admin Dashboard</h1>
            <UserManagement />
            <RoleManagement />
            <PermissionManagement />
        </div>
    );
}

export default App;
