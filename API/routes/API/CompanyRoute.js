import { companyController } from "../../controllers";

const prefix = "/api";

module.exports = (app, router) => {
  router.route(`${prefix}/company`).get(companyController.getAll);
};
