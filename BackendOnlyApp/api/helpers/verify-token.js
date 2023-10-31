const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Verify token",

  description: "",

  inputs: {
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Token verify",
    },
    error: {
      description: "Invalid token.",
    },
  },

  fn: async function (inputs) {
    
    try {
      const { token } = inputs;
      
      const decode = await jwt.verify(token, process.env.JWT_KEY);

      const user = await User.findOne({ email: decode.email });

     
      if (token === user.token) {
        return decode;
      } else {
        return { hasError: true };
      }
    } catch (error) {
      return { hasError: true };
    }
  },
};
