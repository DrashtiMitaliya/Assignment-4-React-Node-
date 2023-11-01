import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_API_URL } from "../constants/apiEndpoints";
import { toastErrorMessage } from "../constants/messages";

const mainUrl = BASE_API_URL;

export const api = async (endpoint, data, type) => {
  let res;

  switch (type) {
    case "post":
      await axios({
        data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503 ||
            err.response.status === 500
          ) {
            window.location.href = "/login";

            if (err.response.status === 401 || err.response.status === 403) {
              toast.error(toastErrorMessage.sessionExpired);
            } else if (err.response.status === 500) {
              toast.error(toastErrorMessage.internalServerError);
            } else {
              toast.error(toastErrorMessage.serviceUnavailable);
            }
            return false;
          } else {
            res = err.response;
          }
        });
      break;

    case "get":
      await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503 ||
            err.response.status === 500
          ) {
            window.location.href = "/login";
            if (err.response.status === 401 || err.response.status === 403) {
              toast.error(toastErrorMessage.sessionExpired);
            } else if (err.response.status === 500) {
              toast.error(toastErrorMessage.internalServerError);
            } else {
              toast.error(toastErrorMessage.serviceUnavailable);
            }
            return false;
          } else {
            res = err.response;
          }
        });
      break;

    case "put":
      await axios({
        method: "put",
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503 ||
            err.response.status === 500
          ) {
            window.location.href = "/login";
            if (err.response.status === 401 || err.response.status === 403) {
              toast.error(toastErrorMessage.sessionExpired);
            } else if (err.response.status === 500) {
              toast.error(toastErrorMessage.internalServerError);
            } else {
              toast.error(toastErrorMessage.serviceUnavailable);
            }
            return false;
          } else {
            res = err.response;
          }
        });
      break;

    case "patch":
      await axios({
        method: "patch",
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503 ||
            err.response.status === 500
          ) {
            window.location.href = "/login";
            if (err.response.status === 401 || err.response.status === 403) {
              toast.error(toastErrorMessage.sessionExpired);
            } else if (err.response.status === 500) {
              toast.error(toastErrorMessage.internalServerError);
            } else {
              toast.error(toastErrorMessage.serviceUnavailable);
            }
            return false;
          } else {
            res = err.response;
          }
        });
      break;

    case "delete":
      await axios({
        data,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503 ||
            err.response.status === 500
          ) {
            window.location.href = "/login";
            if (err.response.status === 401 || err.response.status === 403) {
              toast.error(toastErrorMessage.sessionExpired);
            } else if (err.response.status === 500) {
              toast.error(toastErrorMessage.internalServerError);
            } else {
              toast.error(toastErrorMessage.serviceUnavailable);
            }
            return false;
          } else {
            res = err.response;
          }
        });
      break;

    default:
      return true;
  }
  return res;
};
