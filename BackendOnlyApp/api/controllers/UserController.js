/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcryptjs");
const moment = require("moment");

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password, userType } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username,
        email,
        password: hashedPassword,
        userType,
  
      };

      if (userType === "businessUser") {
        const trialPackage = await Package.findOne({ packageName: "trial" });
        console.log(trialPackage);
        if (trialPackage) {
          newUser.packageId = trialPackage.id;
          newUser.validity = moment().add(14, "days").toDate();
          newUser.status = "active";
        } else {
          return res.status(400).json({ error: "Trial package not found" });
        }
      }

      const createdUser = await User.create(newUser).fetch();

      const tokenExpiresIn = "24h";
      const token = await sails.helpers.generateToken(
        email,
        createdUser.id,
        tokenExpiresIn
      );

      await User.updateOne({ email: createdUser.email }).set({ token });

      return res.json({ user: createdUser, token });
    } catch (error) {
      console.log(error);
      return res.serverError(error);
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "oops ! user not exists" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (
        user.userType === "businessUser" &&
        user.packageId &&
        user.createdAt
      ) {
        const trialPackage = await Package.findOne({ id: user.packageId });

        if (trialPackage && user.createdAt) {
          const registrationDate = moment(user.createdAt);
          const validityExpiration = registrationDate.add(14, "days");

          const currentDate = moment();
          if (validityExpiration.isBefore(currentDate)) {
            return res.redirect("/upgrade-page");
          }
        }
      }

      const token = await sails.helpers.generateToken(email, user.id, "8h");
      //add token to database
      await User.updateOne({ email }, { token: token });

      // Verify token for further usage
      const verifiedToken = await sails.helpers.verifyToken(token);
      console.log(token, verifiedToken);

      return res.json({ user: user, token });
    } catch (error) {
      console.log(error);
      return res.serverError(error);
    }
  },

  async getAllUsers(req, res) {
    try {
      // Retrieve all users
      const allUsers = await User.find();
      return res.json(allUsers);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.notFound("User not found");
      }
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.destroyOne({ id: userId });
      if (!deletedUser) {
        return res.notFound("User not found");
      }
      return res.json(deletedUser);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params; 
      const { username, email, userType, packageId, validity, status } =
        req.body;

      const user = await User.findOne({ id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user fields based on the provided data
      user.username = username || user.username;
      user.email = email || user.email;
      user.userType = userType || user.userType;
      user.packageId = packageId || user.packageId;
      user.validity = validity || user.validity;
      user.status = status || user.status;

      // Save the updated user details
      const updatedUser = await User.updateOne({ id }).set(user);

      return res.json({ user: updatedUser });
    } catch (error) {
      console.log(error);
      return res.serverError(error);
    }
  },
};
