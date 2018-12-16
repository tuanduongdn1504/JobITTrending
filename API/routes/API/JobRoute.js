import { jobController } from "../../controllers";

const prefix = "/api";

module.exports = (app, router) => {
  router.route(`${prefix}/job`).get(jobController.getAll);
  router.route(`${prefix}/:job?`).get(jobController.findByJob);
};
