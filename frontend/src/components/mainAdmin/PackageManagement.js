import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    packageName: "",
    price: "",
    status: "active",
  });

  // Fetch packages from backend
  useEffect(() => {
    // Perform API call to get packages
    // Update 'packages' state with the fetched data
    // Example: setPackages(fetchedPackages);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting package data to backend (Create or Update)
    console.log("Submitted Package:", formData);
    setShowModal(false);
    // Reset form fields after submission
    setFormData({ id: null, packageName: "", price: "", status: "active" });
  };

  const handleEdit = (packageItem) => {
    setFormData(packageItem);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // Logic for deleting the package
    console.log("Deleting package with ID:", id);
  };

  return (
    <div className="container">
      <h2>Package Management</h2>
      <Button onClick={() => setShowModal(true)}>Add Package</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Package Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((packageItem) => (
            <tr key={packageItem.id}>
              <td>{packageItem.id}</td>
              <td>{packageItem.packageName}</td>
              <td>{packageItem.price}</td>
              <td>{packageItem.status}</td>
              <td>
                <Button onClick={() => handleEdit(packageItem)}>Edit</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(packageItem.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal for package addition or update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.id ? "Edit Package" : "Add Package"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="packageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                name="packageName"
                value={formData.packageName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {formData.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PackageManagement;
