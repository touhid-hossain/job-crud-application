import React from 'react'
import EditJob from '../components/editJob/EditJob'
import SideBar from '../components/sideBar/SideBar'

const Edit = () => {
  return (
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <SideBar/>
      <EditJob/>
    </div>
  )
}

export default Edit