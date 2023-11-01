import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "../../constants/messages";

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
          localStorage.setItem("token", userData.token);

          if (userData.user.userType === "mainAdmin") {
            window.location.href = "/all-packages";
            localStorage.setItem("userData", JSON.stringify(userData));
            toast.success(message.LOGIN_SUCCESSFULL_AS_MAINADMIN);
          } else if (userData.user.userType === "businessUser") {
            window.location.href = "/business-user";
            localStorage.setItem("userData", JSON.stringify(userData));
            toast.success(message.LOGIN_SUCCESSFULL_AS_BUSINESSUSER);
          }
        } else {
          toast.error(message.NO_TOKEN_RECIEVED);
        }
      } else {
        toast.error(message.CREDENTIALS_FAILED);
      }
    } catch (error) {
      toast.error(message.LOGIN_SERVER_ERROR);
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
            <span className="text-danger">{message.EMAIL_REQUIRED}</span>
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
            <span className="text-danger">{message.PASSWORD_REQUIRED}</span>
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
