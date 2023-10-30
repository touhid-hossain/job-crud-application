import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/SideBar";
import AllJobs from "../allJobs/AllJobs";
import { useDispatch, useSelector } from "react-redux";
import JobLoader from "../loaders/JobLoader";
import Error from "../loaders/Error";
import {
  fetchJobs,
  searchJobs,
  searchJobsBySalaryValue,
} from "../../features/jobs/jobsSlice";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [filterSalary, setFilterSalary] = useState("Default");

  const { status, search, filterJobsBySalary, jobs, isLoading, isError } =
    useSelector((state) => state.jobs);
  // console.log(status, search, filterJobsBySalary);

  // Sending searched value from users.
  dispatch(searchJobs(input));
  dispatch(searchJobsBySalaryValue(filterSalary));

  //Filter-Books - Engine
  const filterByStatus = (job) => {
    // console.log(job);
    switch (status) {
      case "All Available Jobs":
        return job.type;

      case "Internship":
        return job.type === "Internship";

      case "Full Time":
        return job.type === "Full Time";

      case "Remote":
        return job.type === "Remote";
      default:
        return job;
    }
  };

  // Search-Books - Engine
  const searchBooksByInputValue = (job) => {
    if (search === "") {
      return job;
    } else if (job.title.toLowerCase().includes(search?.toLowerCase())) {
      return job;
    }
  };

  // Search-Books By Salary - Engine
  const filterBooksBySalaryRange = (a, b) => {
    switch (filterJobsBySalary) {
      case "Default":
        return;
      case "Salary (Low to High)":
        return a.salary - b.salary;

      case "Salary (High to Low)":
        return b.salary - a.salary;
      default:
        return;
    }
  };

  //Fetch updated data from server
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  //Render Data Depends on condition
  let content = null;
  if (isLoading) content = <JobLoader />;
  if (!isLoading && isError) content = <Error message="There was an error" />;
  if (!isError && !isLoading && jobs?.length === 0) {
    content = <div className="col-span-12">No Blogs Found!!</div>;
  }
  if (!isError && !isLoading && jobs?.length > 0) {
    content = jobs
      .filter(filterByStatus)
      .filter(searchBooksByInputValue)
      .sort(filterBooksBySalaryRange)
      .map((job) => <AllJobs job={job} key={job.id} />);
  }

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <SideBar />
      {/* ALL JOBS */}
      <div className="lg:pl-[14rem]  mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
            <h1 className="lws-section-title">All Available Jobs</h1>
            <div className="flex gap-4">
              <div className="search-field group flex-1">
                <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                <input
                  type="text"
                  placeholder="Search Job"
                  className="search-input"
                  id="lws-searchJob"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <select
                id="lws-sort"
                name="sort"
                autocomplete="sort"
                className="flex-1"
                value={filterSalary}
                onChange={(e) => setFilterSalary(e.target.value)}
              >
                <option>Default</option>
                <option>Salary (Low to High)</option>
                <option>Salary (High to Low)</option>
              </select>
            </div>
          </div>

          {/* JOB LIST  */}
          <div className="jobs-list">{content}</div>
        </main>
      </div>
    </div>
  );
};

export default HomeContainer;
