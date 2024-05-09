import React from 'react'
import { useSelector } from 'react-redux'


function Navbar() {
  const {taskList,error}=useSelector(store=>store.task)
  return (
    <>
        <h1 className="text-center my-4 text-primary">Project Management</h1>
        <p className="text-center lead">{`Currently ${taskList.length} task(s) pending`}</p>
        <h5 className='text-center text-danger'>{error}</h5>
    </>
  )
}

export default Navbar