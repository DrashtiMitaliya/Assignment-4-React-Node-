// PackageCard.js

import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "../../constants/messages";

const PackageCard = ({ pkg, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedPackage, setEditedPackage] = useState(pkg);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPackage({ ...editedPackage, [name]: value });
  };

  const statusStyle = {
    backgroundColor: pkg.status === "active" ? "green" : "black",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:1337/packages/${pkg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedPackage),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(message.PACKAGE_UPDATED);
        console.log("Package updated:", data.package);
        setShowModal(false);
      } else {
        toast.error(message.FAILED_UPDATE);
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR)
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pkg.packageName}</Card.Title>
        <Card.Text>Price: {pkg.price}</Card.Text>
        <Card.Text>
          Status: <span style={statusStyle}>{pkg.status}</span>
        </Card.Text>

        <Button variant="transparent" onClick={handleEdit}>
          <AiFillEdit />
        </Button>
        <Button variant="transparent" onClick={() => handleDelete(pkg.id)}>
          <AiFillDelete />
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="packageName" className="mb-3">
                <Form.Label>Package Name</Form.Label>
                <Form.Control
                  type="text"
                  name="packageName"
                  value={editedPackage.packageName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={editedPackage.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={editedPackage.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Card.Body>

      <ToastContainer />
    </Card>
  );
};

export default PackageCard;
