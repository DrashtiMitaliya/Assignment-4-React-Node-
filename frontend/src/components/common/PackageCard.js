// PackageCard.js

import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

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
    color: "white", // Text color
    padding: "5px",
    borderRadius: "5px", // Adjust padding for better display
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
        console.log("Package updated:", data.package);
        setShowModal(false);
      } else {
        console.log("Failed to update package");
      }
    } catch (error) {
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
    </Card>
  );
};

export default PackageCard;
