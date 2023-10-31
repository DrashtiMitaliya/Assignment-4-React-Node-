import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

import Header from "../common/Header";

const MainAdminDashboard = () => {
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   fetch("http://localhost:1337/users")
  //     .then((response) => response.json())
  //     .then((data) => setUserData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);



  // const handleLogout = () => {
  //   setUserData({});
  //   window.location.href = "/";
  // };

  // Example data for display
  const adminData = {
    name: "Admin Name", // Replace with actual admin name
    role: "Main Admin", // Role identification
    // Add more admin-specific data as needed
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Main Admin Dashboard</h2>
        <Card>
          <Card.Body>
            <Card.Title>{adminData.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {adminData.role}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MainAdminDashboard;
