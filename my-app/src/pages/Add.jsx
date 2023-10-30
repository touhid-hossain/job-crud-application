import React from "react";
import AddNewJob from "../components/addJob/AddNewJob";
import SideBar from "../components/sideBar/SideBar";

const Add = () => {
  return (
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <SideBar />
      <AddNewJob />
    </div>
  );
};

export default Add;
