import React from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";
import Header from "../common/Header";
import { message } from "../../constants/messages";
import { api } from "../../api/api";
import { endpoints } from "../../constants/apiEndpoints";

const PackageForm = () => {
  const validationSchema = yup.object().shape({
    packageName: yup.string().required(message.PACKAGE_NAME_REQUIRED),
    price: yup
      .number()
      .typeError(message.PRICE_SHOULD_NUMBER)
      .required(message.PRICE_REQUIRED),
    status: yup.string().required(message.STATUS_REQUIRED),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (packageFormData) => {
    console.log(packageFormData);
    try {
      const response = await api(
        endpoints.CREATE_PACKAGE_API,
        packageFormData,
        "post"
      );

      if (response && response.status === 200) {
        const data = response.data;

        toast.success(message.PACKAGE_CREATED);
        console.log("Package created:", data.package);
        window.location.href = "/all-packages";
      } else {
        toast.error(message.FAILED_PACKAGE_CREATION);
        console.log("Failed to create package");
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR);
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
      <ToastContainer />
    </>
  );
};

export default PackageForm;
