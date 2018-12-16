import { mongoose } from "../config/database";
const CompanySchema = mongoose.Schema({
  company: {
    type: String,
    require: true,
    unique: true
  },
  job: {
    type: String,
    require: true,
    unique: true
  },
  salary: {
    type: Number,
    require: true,
    unique: true
  },

  location: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    require: true
  }
});

export default mongoose.model("Company", CompanySchema);
