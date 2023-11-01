import { useForm } from "react-hook-form";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, json } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:1337/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.user.userType === "businessUser") {
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success("Registration successful!");
          window.location.href = "/business-user";
        } else if (userData.user.userType === "mainAdmin") {
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success("Registration successful!");
          window.location.href = "/all-packages";
        }
      } else {
        toast.error("Already exist user!");
      }
    } catch (error) {
      toast.error("Error in registration!");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Registration </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-danger">Username is required</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <span className="text-danger">
              Email is required and should be valid
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <span className="text-danger">
              Password is required and should be at least 8 characters long
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUserType">
          <Form.Label>User Type</Form.Label>
          <Form.Select {...register("userType", { required: true })}>
            <option value="">Select User Type</option>
            <option value="mainAdmin">Main Admin</option>
            <option value="businessUser">Business User</option>
          </Form.Select>
          {errors.userType && (
            <span className="text-danger">User type is required</span>
          )}
        </Form.Group>

        <div className="my-4">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none">
            Login
          </Link>
        </div>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
