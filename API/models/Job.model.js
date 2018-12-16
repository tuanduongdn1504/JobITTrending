import { mongoose } from "../config/database";
const JobSchema = mongoose.Schema({
  company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    require: true,
  },
  job: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  time:{
    type:String,
  }
});

export default mongoose.model("Job", JobSchema);
