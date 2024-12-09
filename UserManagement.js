import React, { useState } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const addUser = (user) => {
        if (editIndex !== null) {
            editUser(editIndex, user);
        } else {
            setUsers([...users, user]);
        }
    };

    const editUser = (index, updatedUser) => {
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
        setEditIndex(null); // Exit edit mode
    };

    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, idx) => idx !== index);
        setUsers(updatedUsers);
    };

    const startEdit = (index) => {
        setEditIndex(index);
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <UserForm
                onSubmit={addUser}
                userToEdit={editIndex !== null ? users[editIndex] : null}
            />
            <UserTable users={users} onEdit={startEdit} onDelete={deleteUser} />
        </div>
    );
};

export default UserManagement;
