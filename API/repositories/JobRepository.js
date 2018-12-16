import { Job } from "../models";
var moment = require("moment");

export default class JobRepository {
  findByJob = async data => {
    try {
      let jobs = Job.find({ job: data }).populate("company_id");
      const [_jobs] = await Promise.all([jobs]);
      return {
        companies: {
          data: _jobs
        }
      };
    } catch (error) {
      console.log("Error", error);
    }
  };
  getAll = async () => {
    try {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      let jobs = Job.find().limit(50);
      const promises = [jobs];
      const [_jobs] = await Promise.all(promises);
      console.log(_jobs);
      let dateArray = [];
      let highestSalary = 0;
      let sumSalary = 0;
      let averageSalary = 0;
      let Angular = 0;
      let Frontend = 0;
      let FullStack = 0;
      let Node = 0;
      let Java = 0;
      let Mobile = 0;
      let PHP = 0;
      let Python = 0;
      let Android = 0;
      let iOS = 0;
      let React = 0;
      let Tester = 0;
      let MachineLearning = 0;
      let DevOps = 0;
      let Net = 0;
      let Game = 0;
      let trending = [];
      for (let a of _jobs) {
        dateArray.push(a.time);
        switch (a.job) {
          case "Angular":
            Angular += 1;
            break;
          case "Frontend":
            Frontend += 1;
            break;
          case "Fullstack":
            FullStack += 1;
            break;
          case "Node":
            Node += 1;
            break;
          case "Java":
            Java += 1;
            break;
          case "Mobile":
            Mobile += 1;
            break;
          case "PHP":
            PHP += 1;
            break;
          case "Python":
            Python += 1;
            break;
          case "Android":
            Android += 1;
            break;
          case "iOS":
            iOS += 1;
            break;
          case "React":
            React += 1;
            break;
          case "Tester":
            Tester += 1;
            break;
          case "Machine Learning":
            MachineLearning += 1;
            break;
          case "DevOps":
            DevOps += 1;
            break;
          case "Net":
            Net += 1;
            break;
          case "C#":
            Net += 1;
            break;
          case "Game":
            Game += 1;
            break;
          default:
        }
        sumSalary += a.salary;
        if (a.salary > highestSalary) highestSalary = a.salary;
      }
      dateArray = dateArray.filter(onlyUnique);
      for (let date of dateArray) {
        let jobs = Job.find({ time: date }).limit(50);
        const promises = [jobs];
        const [_jobs] = await Promise.all(promises);
        let Angular = 0;
        let Frontend = 0;
        let FullStack = 0;
        let Node = 0;
        let Java = 0;
        let Mobile = 0;
        let PHP = 0;
        let Python = 0;
        let Android = 0;
        let iOS = 0;
        let React = 0;
        let Tester = 0;
        let MachineLearning = 0;
        let DevOps = 0;
        let Net = 0;
        let Game = 0;
        for (let a of _jobs) {
          switch (a.job) {
            case "Angular":
              Angular += 1;
              break;
            case "Frontend":
              Frontend += 1;
              break;
            case "Fullstack":
              FullStack += 1;
              break;
            case "Node":
              Node += 1;
              break;
            case "Java":
              Java += 1;
              break;
            case "Mobile":
              Mobile += 1;
              break;
            case "PHP":
              PHP += 1;
              break;
            case "Python":
              Python += 1;
              break;
            case "Android":
              Android += 1;
              break;
            case "iOS":
              iOS += 1;
              break;
            case "React":
              React += 1;
              break;
            case "Tester":
              Tester += 1;
              break;
            case "Machine Learning":
              MachineLearning += 1;
              break;
            case "DevOps":
              DevOps += 1;
              break;
            case "Net":
              Net += 1;
              break;
            case "C#":
              Net += 1;
              break;
            case "Game":
              Game += 1;
              break;
            default:
          }
        }
        trending.push([
          {
            postedDate: date,
            data: {
              Angular: Angular,
              Frontend: Frontend,
              FullStack: FullStack,
              Node: Node,
              Java: Java,
              Mobile: Mobile + Android + iOS,
              PHP: PHP,
              Python: Python,
              React: React,
              Tester: Tester,
              MachineLearning: MachineLearning,
              DevOps: DevOps,
              Net: Net,
              Game: Game
            }
          }
        ]);
        console.log(trending);
      }
      averageSalary = sumSalary / _jobs.length;
      return {
        highestSalary: highestSalary,
        averageSalary: averageSalary,
        hotJobs: [
          {
            Angular: Angular,
            Frontend: Frontend,
            FullStack: FullStack,
            Node: Node,
            Java: Java,
            Mobile: Mobile + Android + iOS,
            PHP: PHP,
            Python: Python,
            React: React,
            Tester: Tester,
            MachineLearning: MachineLearning,
            DevOps: DevOps,
            Net: Net,
            Game: Game
          }
        ],
        trending: trending
      };
    } catch (error) {
      console.log("Error", error);
    }
  };
}
