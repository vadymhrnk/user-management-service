import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  searchUsersByName,
} from "../../services/api";
import UserForm from "../UserForm/UserForm";
import "./UserList.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    loadUsers(currentPage, pageSize, debouncedSearchTerm);
  }, [currentPage, pageSize, debouncedSearchTerm]);

  const loadUsers = async (page, size, name = "") => {
    try {
      let data;
      if (name) {
        data = await searchUsersByName(name, page, size);
      } else {
        data = await fetchUsers(page, size);
      }
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleAddUser = async (user) => {
    try {
      await addUser(user);
      loadUsers(currentPage, pageSize);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await updateUser(selectedUser.id, user);
      loadUsers(currentPage, pageSize);
      setSelectedUser(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      loadUsers(currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="user-list-container">
      <div className="user-form-container">
        <UserForm
          handleAddUser={handleAddUser}
          handleUpdateUser={handleUpdateUser}
          handleCancel={handleCancelEdit}
          selectedUser={selectedUser}
        />
      </div>
      <div className="user-table-container">
        <h2>User List</h2>

        <div className="search-input">
          <label htmlFor="search">Search by name: </label>
          <input
            id="search"
            type="text"
            placeholder="Enter name to search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        <div className="page-size-selector">
          <label htmlFor="page-size">Page Size: </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
