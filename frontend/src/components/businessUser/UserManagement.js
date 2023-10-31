import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Toast } from "react-bootstrap";
import Header from "../common/Header";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: null,
    username: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    fetch("http://localhost:1337/users")
      .then((response) => response.json())
      .then((data) =>
        setUsers(data.filter((user) => user.userType === "businessUser"))
      )
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:1337/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("User deleted successfully!");
          console.log("User deleted successfully");

          setUsers(users.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting user:", error);
      });
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:1337/users/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: editedUser.username,
        email: editedUser.email,
        status: editedUser.status,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("User updated successfully");
          console.log("User updated successfully");

          fetch("http://localhost:1337/users")
            .then((response) => response.json())
            .then((data) =>
              setUsers(data.filter((user) => user.userType === "businessUser"))
            )
            .catch((error) => console.error("Error fetching users:", error));
          setShowEditModal(false);
        } else {
          console.error("Failed to update user");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="mt-3 text-center">Total Business User</h2>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Package ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.packageId}</td>
                <td>{user.status}</td>
                <td>
                  <AiFillEdit
                    className="me-3"
                    onClick={() => handleEdit(user)}
                  />

                  <AiFillDelete onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={editedUser.status}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, status: e.target.value })
                  }
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="premium">Premium</option>
                  <option value="free">Free</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserManagement;
