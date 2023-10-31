import React, { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";

const PackageUpgrade = () => {
  // State for package data and trial period
  const [packageData, setPackageData] = useState({
    currentPackage: "Trial Pack",
    validityDays: 14, // Trial validity period in days
  });
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      // Check the remaining days from the trial period
      // Perform API call or check remaining days in the trial period
      // Example: if (remainingDays <= 0) setShowUpgradeAlert(true);
      setShowUpgradeAlert(true); // Temporary, for demonstration
    };
    checkValidity();
  }, []);

  const handleUpgrade = () => {
    // Logic to upgrade package - integrate with backend
    console.log("Upgrading package...");
  };

  return (
    <div className="container">
      <h2>Package Upgrade</h2>
      {showUpgradeAlert ? (
        <Alert variant="warning">
          Your Trial Pack will expire soon. Upgrade your package to continue
          accessing services.
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              Current Package: {packageData.currentPackage}
            </Card.Title>
            <Card.Text>
              Your current package is valid for {packageData.validityDays} days.
            </Card.Text>
            <Button onClick={handleUpgrade} variant="primary">
              Upgrade Package
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default PackageUpgrade;
