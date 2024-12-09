import React, { useState } from 'react';
import './PermissionManagement.css';

const PermissionManagement = () => {
    const [permissions, setPermissions] = useState([]);
    const [permissionName, setPermissionName] = useState('');
    const [editPermission, setEditPermission] = useState(null);
    const [newPermissionName, setNewPermissionName] = useState('');

    // Add Permission
    const handleAddPermission = () => {
        if (permissionName.trim() === '') return;
        const newPermission = { id: Date.now(), name: permissionName };
        setPermissions([...permissions, newPermission]);
        setPermissionName('');
    };

    // Delete Permission
    const handleDeletePermission = (id) => {
        setPermissions(permissions.filter((permission) => permission.id !== id));
    };

    // Edit Permission
    const handleEditPermission = (permission) => {
        setEditPermission(permission);
        setNewPermissionName(permission.name);
    };

    // Save Edited Permission
    const handleSaveEditedPermission = () => {
        if (newPermissionName.trim() === '') return;
        setPermissions(
            permissions.map((permission) =>
                permission.id === editPermission.id
                    ? { ...permission, name: newPermissionName }
                    : permission
            )
        );
        setEditPermission(null);
        setNewPermissionName('');
    };

    return (
        <div className="permission-management">
            <h2>Permission Management</h2>
            {/* Add Permission */}
            <div className="permission-input">
                <input
                    type="text"
                    value={permissionName}
                    onChange={(e) => setPermissionName(e.target.value)}
                    placeholder="Enter Permission Name"
                    className="input-field"
                />
                <button onClick={handleAddPermission} className="btn btn-add">
                    Add Permission
                </button>
            </div>
            {/* Edit Permission */}
            {editPermission && (
                <div className="permission-edit">
                    <input
                        type="text"
                        value={newPermissionName}
                        onChange={(e) => setNewPermissionName(e.target.value)}
                        className="input-field"
                        placeholder="Edit Permission Name"
                    />
                    <button onClick={handleSaveEditedPermission} className="btn btn-save">
                        Save
                    </button>
                    <button onClick={() => setEditPermission(null)} className="btn btn-cancel">
                        Cancel
                    </button>
                </div>
            )}
            {/* Permission List */}
            <ul className="permission-list">
                {permissions.map((permission) => (
                    <li key={permission.id} className="permission-item">
                        <span className="permission-name">{permission.name}</span>
                        <div className="permission-actions">
                            <button
                                onClick={() => handleEditPermission(permission)}
                                className="btn btn-edit"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeletePermission(permission.id)}
                                className="btn btn-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PermissionManagement;
