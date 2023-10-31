/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

// config/routes.js
module.exports.routes = {
  // Routes for User Management
  "GET /users/register": "UserController.register",
  "GET /users/login": "UserController.login",
  "POST /users/register": "UserController.register", 
  "POST /users/login": "UserController.login", 

  
  // CRUD operations for Users
  "GET /users": "UserController.getAllUsers", 
  "GET /users/:id": "UserController.getUser", 
  "PUT /users/:id": "UserController.updateUser", 
  "DELETE /users/:id": "UserController.deleteUser", 

  // CRUD operations for Packages
  "GET /packages": "PackageController.getAllPackages",
  "GET /packages/:id": "PackageController.getPackage",
  "POST /packages/create": "PackageController.createPackage",
  "PUT /packages/:id": "PackageController.updatePackage",
  "DELETE /packages/:id": "PackageController.deletePackage",

  // Define other routes for CRUD operations
};
