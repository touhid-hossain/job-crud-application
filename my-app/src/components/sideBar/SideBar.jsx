import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterJobs } from "../../features/jobs/jobsSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const handleClick = (status) => {
    dispatch(filterJobs(status));
  };

  return (
    //SIDEBAR
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={() => handleClick("All Available Jobs")}
            >
              <i className="fa-solid fa-briefcase"></i>
              <span>All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  className="sub-menu"
                  id="lws-internship-menu"
                  onClick={() => handleClick("Internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </button>
              </li>
              <li>
                <button
                  className="sub-menu"
                  id="lws-fulltime-menu"
                  onClick={() => handleClick("Full Time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </button>
              </li>
              <li>
                <button
                  className="sub-menu"
                  id="lws-remote-menu"
                  onClick={() => handleClick("Remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"> </i>
                  Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/add" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
