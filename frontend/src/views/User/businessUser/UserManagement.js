import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../components/common/Header";
import { message } from "../../../constants/messages";
import { api } from "../../../api/api";
import { endpoints } from "../../../constants/apiEndpoints";

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
    const fetchData = async () => {
      try {
        const response = await api(endpoints.GET_ALL_USERS_API, null, "get");
        if (response && response.status === 200) {
          setUsers(
            response.data.filter((user) => user.userType === "businessUser")
          );
        } else {
          console.error("Error fetching data:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api(
        `${endpoints.DELETE_USERS_API}${id}`,
        null,
        "delete"
      );
      if (response && response.status === 200) {
        toast.success(message.USER_DELETED);
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.error(message.FAILED_USER_ERROR);
        console.error("Error response data:", response.data);
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR);
      console.error("Error deleting user:", error);
    }
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

  const handleUpdate = async () => {
    try {
      const response = await api(
        `${endpoints.UPDATE_USERS_API}${editedUser.id}`,
        {
          username: editedUser.username,
          email: editedUser.email,
          status: editedUser.status,
        },
        "put"
      );

      if (response && response.status === 200) {
        toast.success(message.BUSINESS_USER_UPDATED);

        const usersResponse = await api("users", null, "get");
        if (usersResponse && usersResponse.status === 200) {
          const data = usersResponse.data;
          setUsers(data.filter((user) => user.userType === "businessUser"));
          setShowEditModal(false);
        } else {
          toast.error(message.FAILED_UPDATE_USER);
        }
      } else {
        toast.error(message.FAILED_UPDATE_USER);
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR);
      console.error("Error updating user:", error);
    }
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
