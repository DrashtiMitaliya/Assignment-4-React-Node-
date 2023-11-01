import { useForm } from "react-hook-form";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "../../constants/messages";

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
          toast.success(message.REGISTERED_AS_BUSINESS_USER);
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData));
          window.location.href = "/business-user";
        } else if (userData.user.userType === "mainAdmin") {
          toast.success(message.REGISTERED_AS_ADMIN_USER);
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData));
          window.location.href = "/all-packages";
        }
      } else {
        toast.error(message.ALREADY_EXISTS_USER);
      }
    } catch (error) {
      toast.error(message.ERROR_IN_REGISTRATION);
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
            <span className="text-danger">{message.USERNAME_REQUIRED}</span>
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
              {message.EMAIL_REQUIRED}
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
              {message.EMAIL_REQUIRED}
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
            <span className="text-danger">{message.userType}</span>
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
