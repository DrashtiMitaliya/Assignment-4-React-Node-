import React from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Header from "../../components/common/Header";
import { message } from "../../constants/messages";

const AddBusinessUser = () => {
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
       
          window.location.href = "/add-business-user";

        } else if (userData.user.userType === "mainAdmin") {
          window.location.href = "/all-packages";
        }
        toast.success(message.BUSINESS_USER_ADDED);
      } else {
        toast.error(message.ALREADY_EXISTS_USER);
      }
    } catch (error) {
      toast.error(message.SERVER_ERROR);
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <h2 className="mt-3">Add Business User</h2>

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
               {message.PASSWORD_REQUIRED  }
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserType">
            <Form.Label>User Type</Form.Label>
            <Form.Select {...register("userType", { required: true })}>
              <option value="">Select User Type</option>

              <option value="businessUser">Business User</option>
            </Form.Select>
            {errors.userType && (
              <span className="text-danger">{message.USER_TYPE_REQUIRED}</span>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />

        <Button
          style={{ width: "200px" }}
          className=" mt-3 "
          variant="outline-primary"
          href="/add-business-user"
        >
          Show all Business users
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddBusinessUser;
