import React from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import Header from "./Header";

const PackageForm = () => {
  const validationSchema = yup.object().shape({
    packageName: yup.string().required("Package Name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
    status: yup.string().required("Status is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (packageFormData) => {
    try {
      const response = await fetch("http://localhost:1337/packages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(packageFormData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Package created:", data.package);
        // Toast.success("Package created successfully!");
        window.location.href = "/all-packages";
      } else {
        console.log("Failed to create package");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <h2 className="text-center mt-4">Package Form</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="container">
        <Form.Group className="mb-3" controlId="packageName">
          <Form.Label>Package Name</Form.Label>
          <Controller
            name="packageName"
            control={control}
            render={({ field }) => (
              <Form.Control
                type="text"
                {...field}
                placeholder="Enter package name"
              />
            )}
          />
          {errors.packageName && (
            <span className="text-danger">{errors.packageName.message}</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Form.Control type="text" {...field} placeholder="Enter price" />
            )}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Form.Select {...field}>

                <option value="">Select status</option> 
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            )}
          />
          {errors.status && (
            <span className="text-danger">{errors.status.message}</span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PackageForm;
