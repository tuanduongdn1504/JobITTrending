function responseError(error) {
  return { success: false, error };
}

function responseSuccess(data = null) {
  return data ? { success: true, result: data } : { success: true };
}

module.exports = {
  responseError,
  responseSuccess
};
