/**
 * PackageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async getAllPackages(req, res) {
    try {
      const allPackages = await Package.find();
      return res.json(allPackages);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async getPackage(req, res) {
    try {
      const packageId = req.params.id;
      const package = await Package.findOne({ id: packageId });
      if (!package) {
        return res.notFound("Package not found");
      }
      return res.json(package);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async createPackage(req, res) {
    try {
      const { packageName, price, status } = req.body;
      const newPackage = await Package.create({
        packageName,
        price,
        status,
      }).fetch();
      return res.status(201).json(newPackage);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async updatePackage(req, res) {
    try {
      const packageId = req.params.id;
      const { name, price, status } = req.body;
      const updatedPackage = await Package.updateOne({ id: packageId }).set({
        name,
        price,
        status,
      });
      if (!updatedPackage) {
        return res.notFound("Package not found");
      }
      return res.json(updatedPackage);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async deletePackage(req, res) {
    try {
      const packageId = req.params.id;
      const deletedPackage = await Package.destroyOne({ id: packageId });
      if (!deletedPackage) {
        return res.notFound("Package not found");
      }
      return res.json(deletedPackage);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
