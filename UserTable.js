import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => (
    <table className="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                            {user.status}
                        </span>
                    </td>
                    <td>
                        <button className="btn btn-info btn-sm" onClick={() => onEdit(index, user)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default UserTable;
