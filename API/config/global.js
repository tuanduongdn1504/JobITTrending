import * as models from "../models/index";
import constants from "./constants";
import errors from "./errors";
import { responseSuccess, responseError } from "./index";

global.models = models;
global.constants = constants;
global.errors = errors;
global.responseError = responseError;
global.responseSuccess = responseSuccess;
