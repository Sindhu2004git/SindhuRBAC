import React, { useState } from 'react';
import './RoleManagement.css';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');
    const [permissions, setPermissions] = useState({
        read: false,
        write: false,
        delete: false,
    });
    const [editingRole, setEditingRole] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const [editedPermissions, setEditedPermissions] = useState({});
    const [predefinedRole, setPredefinedRole] = useState('');

    // Predefined roles with default permissions
    const predefinedRoles = {
        Admin: { read: true, write: true, delete: true },
        Editor: { read: true, write: true, delete: false },
        Viewer: { read: true, write: false, delete: false },
    };

    // Handle predefined role selection
    const handlePredefinedRole = (roleName) => {
        setPredefinedRole(roleName);
        setPermissions(predefinedRoles[roleName] || {});
    };

    // Add a new role
    const addRole = () => {
        if (newRole.trim() === '') return;
        const role = {
            id: Date.now(),
            name: newRole,
            permissions: { ...permissions },
        };
        setRoles([...roles, role]);
        setNewRole('');
        setPredefinedRole('');
        setPermissions({ read: false, write: false, delete: false });
    };

    // Start editing a role
    const startEditing = (role) => {
        setEditingRole(role);
        setEditedRoleName(role.name);
        setEditedPermissions({ ...role.permissions });
    };

    // Save the edited role
    const saveEditedRole = () => {
        if (editedRoleName.trim() === '') return;
        setRoles(
            roles.map((role) =>
                role.id === editingRole.id
                    ? { ...role, name: editedRoleName, permissions: editedPermissions }
                    : role
            )
        );
        setEditingRole(null);
    };

    // Delete a role
    const deleteRole = (id) => {
        setRoles(roles.filter((role) => role.id !== id));
    };

    return (
        <div className="role-management">
            <h2>Role Management</h2>

            {/* Add Role Form */}
            <div className="add-role">
                <select
                    value={predefinedRole}
                    onChange={(e) => handlePredefinedRole(e.target.value)}
                    className="form-select"
                >
                    <option value="">Select Predefined Role</option>
                    {Object.keys(predefinedRoles).map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Enter custom role name"
                    className="form-input"
                />
                <div className="permissions">
                    <label>
                        <input
                            type="checkbox"
                            checked={permissions.read}
                            onChange={(e) =>
                                setPermissions({ ...permissions, read: e.target.checked })
                            }
                        />
                        Read
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={permissions.write}
                            onChange={(e) =>
                                setPermissions({ ...permissions, write: e.target.checked })
                            }
                        />
                        Write
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={permissions.delete}
                            onChange={(e) =>
                                setPermissions({ ...permissions, delete: e.target.checked })
                            }
                        />
                        Delete
                    </label>
                </div>
                <button onClick={addRole} className="btn btn-primary">Add Role</button>
            </div>

            {/* Edit Role Form */}
            {editingRole && (
                <div className="edit-role">
                    <input
                        type="text"
                        value={editedRoleName}
                        onChange={(e) => setEditedRoleName(e.target.value)}
                        className="form-input"
                    />
                    <div className="permissions">
                        <label>
                            <input
                                type="checkbox"
                                checked={editedPermissions.read}
                                onChange={(e) =>
                                    setEditedPermissions({
                                        ...editedPermissions,
                                        read: e.target.checked,
                                    })
                                }
                            />
                            Read
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={editedPermissions.write}
                                onChange={(e) =>
                                    setEditedPermissions({
                                        ...editedPermissions,
                                        write: e.target.checked,
                                    })
                                }
                            />
                            Write
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={editedPermissions.delete}
                                onChange={(e) =>
                                    setEditedPermissions({
                                        ...editedPermissions,
                                        delete: e.target.checked,
                                    })
                                }
                            />
                            Delete
                        </label>
                    </div>
                    <button onClick={saveEditedRole} className="btn btn-success">Save</button>
                    <button onClick={() => setEditingRole(null)} className="btn btn-secondary">Cancel</button>
                </div>
            )}

            {/* Roles Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={role.id}>
                            <td>{index + 1}</td>
                            <td>{role.name}</td>
                            <td>
                                {Object.keys(role.permissions)
                                    .filter((perm) => role.permissions[perm])
                                    .join(', ')}
                            </td>
                            <td>
                                <button
                                    onClick={() => startEditing(role)}
                                    className="btn btn-warning btn-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteRole(role.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManagement;
