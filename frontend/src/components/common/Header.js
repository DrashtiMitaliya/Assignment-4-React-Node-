import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/users")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

 

 
  const handleLogout = () => {
    setUserData({});
    window.location.href = "/";
  };

  return (
    <Navbar bg="light" expand="lg" className="p-4">
      <Navbar.Brand href="#">User-Roles</Navbar.Brand>

      <div className="d-flex justify-content-end gap-3">
        Role :
        {localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).user.userType}
        <Nav>
          <Button variant="outline-primary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
        {localStorage.getItem("userData") &&
          JSON.parse(localStorage.getItem("userData")).user.userType ===
            "mainAdmin" && (
            <Button
              variant="outline-secondary"
              onClick={() => (window.location.href = "/businnesuserform")}
            >
              Add Business User
            </Button>
          )}
      </div>
    </Navbar>
  );
};

export default Header;
