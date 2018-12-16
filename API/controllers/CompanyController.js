"use strict";

import { companyRepository } from "../repositories";
import { responseSuccess, responseError } from "../config";

export default class CompanyController {
  getAll = async (req, res) => {
    try {
      return res.json(responseSuccess(await companyRepository.getAll()));
    } catch (error) {
      console.log("Error", error);
      return res.json(responseError(error));
    }
  };
}
