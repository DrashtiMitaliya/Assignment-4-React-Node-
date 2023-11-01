import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import Header from "../common/Header";

const BusinessUserDashboard = () => {
  const [packagesData, setPackagesData] = useState();
  const [validity, setValidity] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("userData"));
    setValidity(userFromLocalStorage.user.validity);

    fetch("http://localhost:1337/packages?packageName=trial")
      .then((response) => response.json())
      .then((data) => setPackagesData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const trialData = packagesData?.filter(
    (packagesData) => packagesData.packageName === "trial"
  );

  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-4 " style={{ fontSize: "2rem" }}>
          Yeah !! You have default one trial pack{" "}
        </div>

        <Card>
          <Card.Body>
            <Card.Title>Package Name : {trialData?.[0].packageName}</Card.Title>
            <Card.Text className="mb-2 text-muted">
              Price: {trialData?.[0].price}
            </Card.Text>
            <Card.Text className="mb-2">
              Validity Ended in :{moment(validity).format("LLLL")}
            </Card.Text>

            <Button
              variant="primary"
              onClick={() => alert("Upgrade Trial Pack")}
            >
              Upgrade Trial Pack
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BusinessUserDashboard;
