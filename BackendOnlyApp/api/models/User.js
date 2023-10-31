/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "default",
  tableName: "users",
  attributes: {
    username: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    userType: {
      type: "string",
      isIn: ["mainAdmin", "businessUser"],
      required: true,
    },
    
  },
};
