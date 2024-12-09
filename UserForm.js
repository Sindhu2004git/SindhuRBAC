import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, userToEdit }) => {
    const [user, setUser] = useState({ name: '', email: '', role: 'admin', status: 'active' });

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit); // Populate form with the user to edit
        }
    }, [userToEdit]);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user);
        setUser({ name: '', email: '', role: 'admin', status: 'active' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                className="form-control mb-2"
                required
            />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control mb-2"
                required
            />
            <select name="role" value={user.role} onChange={handleChange} className="form-select mb-2" required>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            <select name="status" value={user.status} onChange={handleChange} className="form-select mb-3" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <button type="submit" className="btn btn-primary">
                {userToEdit ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
};

export default UserForm;
