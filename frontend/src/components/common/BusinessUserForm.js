import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BusinessUserForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    userType: 'businessUser',
    packageId: '', // Assuming the Business User selects a package
    status: 'active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting user data to backend (Create or Update)
    console.log('Submitted User Data:', userData);
    // Reset form fields after submission
    setUserData({
      username: '',
      email: '',
      userType: 'businessUser',
      packageId: '',
      status: 'active',
    });
  };

  // Delete user function - to be implemented

  return (
    <div className="container">
      <h2>Business User Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="packageId">
          <Form.Label>Package ID</Form.Label>
          <Form.Control
            type="text"
            name="packageId"
            value={userData.packageId}
            onChange={handleInputChange}
            placeholder="Enter package ID"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={userData.status}
            onChange={handleInputChange}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* Delete button - to be implemented */}
      </Form>
    </div>
  );
};

export default BusinessUserForm;
