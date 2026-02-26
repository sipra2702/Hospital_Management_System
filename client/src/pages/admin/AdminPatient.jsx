import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AdminPatient = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // =============================
    // Fetch All Users
    // =============================
    const fetchUsers = async () => {
        try {
            const res = await api.get("/users"); // adjust if route different
            setUsers(res.data.data);
        } catch (error) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // =============================
    // Update Role
    // =============================
    const updateRole = async (id, role) => {
        try {
            await api.put(`/users/${id}`, { role });
            fetchUsers();
        } catch (error) {
            alert("Failed to update role");
        }
    };

    // =============================
    // Delete User
    // =============================
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    // =============================
    // Loading State
    // =============================
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold">Loading Users...</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Patient Management
            </h2>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">{user.name}</td>

                                <td className="p-4">{user.email}</td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-blue-100 text-blue-600"
                                            }
                    `}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td className="p-4 space-x-2">
                                    {user.role !== "admin" ? (
                                        <button
                                            onClick={() =>
                                                updateRole(user._id, "admin")
                                            }
                                            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                updateRole(user._id, "user")
                                            }
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Make User
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No Users Found
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPatient;
