"use strict";

import { jobRepository } from "../repositories";
import { responseSuccess, responseError } from "../config";

export default class JobController {
  findByJob = async (req, res) => {
    try {
      return res.json(responseSuccess(await jobRepository.findByJob(req.params.job)));
    } catch (error) {
      console.log("Error", error);
      return res.json(responseError(error));
    }
  };
  getAll = async (req, res) => {
    try {
      return res.json(responseSuccess(await jobRepository.getAll()));
    } catch (error) {
      console.log("Error", error);
      return res.json(responseError(error));
    }
  };
}
