// AllPackagesPage.js

import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/common/Header";
import PackageCard from "../../components/package/PackageCard";
import { message } from "../../constants/messages";


const AllPackagesPage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/packages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const handleAdd = () => {
    window.location.href = "/add-package";
  };

  const handleDelete = async (packageId) => {
    try {
      await fetch(`http://localhost:1337/packages/${packageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(message.PACKAGE_DELETED)
      setPackages(packages.filter((pkg) => pkg.id !== packageId));
    } catch (error) {
      toast.error(message.SERVER_ERROR)
      console.error("Error deleting package:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2>All Packages</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {packages &&
            packages.map((pkg) => (
              <Col key={pkg.id}>
                <PackageCard pkg={pkg} handleDelete={handleDelete} />
              </Col>
            ))}
        </Row>

        <Button variant="primary" className="mt-4" onClick={handleAdd}>
          Add Package
        </Button>
      </Container>
      <ToastContainer />
    </>
  );
};

export default AllPackagesPage;
