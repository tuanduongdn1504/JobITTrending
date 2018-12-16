import CompanyRepository from "./CompanyRepository";
import JobRepository from "./JobRepository";
module.exports = {
  companyRepository: new CompanyRepository(),
  jobRepository: new JobRepository(),
};
