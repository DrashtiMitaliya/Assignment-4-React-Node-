/**
 * Package.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// module.exports = {
//   datastore: "default",
//   tableName: "packeges",
//   attributes: {
//     packageName: { type: "string", required: true },
//     price: { type: "number", required: true },
//     status: {
//       type: "string",
//       isIn: ["active", "inactive"],
//       defaultsTo: "active",
//     },
//   },
// };

// packages.js

module.exports = {
  datastore: "default",
  tableName: "packages",

  attributes: {
    packageName: { type: "string", required: true },
    price: { type: "number", required: true },
    status: {
      type: "string",
      isIn: ["active", "inactive", "expired"],
    },
  },

  // async checkValidity(packageId) {
  //   const packageDetails = await Packages.findOne({ id: packageId });

  //   if (packageDetails) {
  //     if (packageDetails.status === "active") {
  //       const validityExpires = moment(packageDetails.createdAt)
  //         .add(packageDetails.validity, "days")
  //         .unix();

  //       if (validityExpires < moment().unix()) {
  //         // Update package status to expired if validity is over
  //         await Packages.updateOne({ id: packageId }).set({
  //           status: "expired",
  //         });
  //       }
  //     }
  //   }
  // },
};
