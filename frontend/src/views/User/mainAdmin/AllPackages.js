import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../components/common/Header";
import { message } from "../../../constants/messages";
import PackageCard from "../../../components/package/PackageCard";
import { api } from "../../../api/api";
import { endpoints } from "../../../constants/apiEndpoints";

const AllPackagesPage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(endpoints.GET_ALL_PACKAGE_API, null, "get");
        if (response && response.status === 200) {
          setPackages(response.data);
        } else {
          console.error("Error fetching data:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    window.location.href = "/add-package";
  };

  const handleDelete = async (packageId) => {
    try {
      const response = await api(
        `${endpoints.DELETE_PACKAGE_API}${packageId}`,
        null,
        "delete"
      );

      if (response && response.status === 200) {
        toast.success(message.PACKAGE_DELETED);
        setPackages(packages.filter((pkg) => pkg.id !== packageId));
      } else {
        toast.error(message.SERVER_ERROR);
        console.error("Error deleting package:", response);
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR);
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
