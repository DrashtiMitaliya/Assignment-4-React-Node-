module.exports = async function isAdminPolicy(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const tokenParts = authorizationHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).send("Invalid token format");
    }
    const token = tokenParts[1];

    const decode = await sails.helpers.verifyToken(token);
    console.log(decode);

    if (decode.hasError) {
      return res.status(401).send("Token verification failed");
    }

    const user = await User.findOne({ email: decode.email });

    if (user && user.userType === "mainAdmin") {
      return next();
    } else {
      return res.status(403).send("Access forbidden");
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    return res.status(500).send("An error occurred while authorizing");
  }
};
