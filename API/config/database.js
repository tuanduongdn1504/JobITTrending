import mongoose from "mongoose";

mongoose.connect(
  "mongodb://admin:ABcd1234@ds237989.mlab.com:37989/job-trending-db",
  { useNewUrlParser: true, useCreateIndex: true }
);

module.exports = {
  mongoose
};
