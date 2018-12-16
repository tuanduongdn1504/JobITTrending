import { Company } from "../models";

export default class CompanyRepository {
  getAll = async () => {
    try {
      let companies = Company.find();
      let companyTotal = Company.find().countDocuments();
      const promises = [companies, companyTotal];
      const [_companies, _companyTotal] = await Promise.all(promises);

      return {
        companies: {
          data: _companies,
          total: _companyTotal
        }
      };
    } catch (error) {
      console.log("Error", error);
    }
  };
}
