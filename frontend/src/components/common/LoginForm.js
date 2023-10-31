import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, json } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:1337/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();

        if (userData.token) {
          // Store the token in local storage
          localStorage.setItem("token", userData.token);

          if (userData.user.userType === "mainAdmin") {
            toast.success("Logged in as Main Admin");
            window.location.href = "/all-packages";
            localStorage.setItem("userData", JSON.stringify(userData));
          } else if (userData.user.userType === "businessUser") {
            toast.success("Logged in as Business User");
            window.location.href = "/business-user";
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        } else {
          toast.error("No token received. Login failed.");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Error while logging in.");
    }
  };

  return (
    <div className="container ">
      <h1 className="text-center">Login </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Email is required</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Password is required</span>
          )}
        </Form.Group>

        <div className="my-3">
          don't have an account ?{" "}
          <Link to="/registration" className="text-decoration-none">
            Sign up
          </Link>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
