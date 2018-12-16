"use strict";

import myConstants from "./constants";

function getError(errorCode, errorMessage) {
  return {
    code: errorCode,
    message: errorMessage
  };
}

export default {
  wrong_password_or_username: getError(
    "wrong_password_or_username",
    "Sai tài khoản hoặc mật khẩu"
  ),
  wrong_param_value: getError("wrong_param_value", "wrong_param_value"),
  email_invalid: getError("email_invalid", "Email invalid"),
  min_length_password: getError(
    "min_length_password",
    `The min length password is ${myConstants.MIN_LENGTH_PASSWORD}`
  ),
  not_found_image: getError(
    "not_found_image",
    "Not found the image, please try again"
  ),
  not_found_user: getError(
    "not_found_user",
    "Not found the user, please try again"
  ),
  status_of_order_not_vaild: getError(
    "status_of_order_not_vaild",
    "Type of order not vaild, please try again"
  ),
  has_not_change_data: getError(
    "not_has_change_data",
    "Your data hasn't change vs database"
  ),
  required_login: getError("required_login", "Required login"),
  no_files: getError("no_files", "No files were uploaded."),
  url_not_vaild: getError("url_not_vaild", "URL not vaild")
};
