import React, { useState, useEffect } from "react";
import "./UserForm.scss";

const UserForm = ({
  handleAddUser,
  handleUpdateUser,
  handleCancel,
  selectedUser,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [selectedUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { firstName, lastName, email };

    try {
      if (selectedUser) {
        await handleUpdateUser(user);
      } else {
        await handleAddUser(user);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setError("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleFormCancel = () => {
    handleCancel();
    setError("");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
      <input
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="First Name"
        required
      />
      <input
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        required
        type="email"
      />
      {error && <div className="error-message">{error}</div>}
      <div className="form-buttons">
        {selectedUser ? (
          <>
            <button type="submit">Update User</button>
            <button type="button" onClick={handleFormCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit">Add User</button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
