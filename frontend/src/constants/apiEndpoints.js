export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const endpoints = {
  // login endpoint
  LOGIN_API: "users/login",

  // Registration api
  REGISTRATION_API: "users/register",

  // PACKAGE MODULE API
  CREATE_PACKAGE_API : 'packages/create' ,
  DELETE_PACKAGE_API : 'packages/' ,
  GET_ALL_PACKAGE_API : 'packages' ,
  UPDATE_PACKAGE_API: "packages/",
//   TRIAL_PACKAGE_API : 'packages?packageName=trial' ,

  // USER MODULE API
  GET_ALL_USERS_API: "users",
  DELETE_USERS_API : 'users/' ,
  UPDATE_USERS_API : 'users/'

};
