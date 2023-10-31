/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const moment = require("moment");

module.exports.bootstrap = async function (done) {
  const totalPackages = await Package.count();
  const currentDate = moment();
  const validityExpiration = currentDate.add(14, "days");

  if (totalPackages === 0) {
    const defaultPackage = {
      packageName: "trial",
      price: 0,
      status: "active",
      validity: validityExpiration.toDate() ,
    };

    try {
      await Package.create(defaultPackage);
      console.log("Default package created successfully.");
    } catch (error) {
      console.error("Error creating default package:", error);
    }
  }

  return done();
};
