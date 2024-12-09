<ul>
    {roles.map((role) => (
        <li key={role.id}>
            {role.name}
            <div>
                <button onClick={() => handleEditRole(role)} className="btn btn-info btn-sm">Edit</button>
                <button onClick={() => handleDeleteRole(role.id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
        </li>
    ))}
</ul>
