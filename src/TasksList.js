import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import UpdateTask from './UpdateTask'
import { useDispatch, useSelector } from 'react-redux'
import {addTaskToSelectedTask, deleteTaskFromServer, getTaskFromServer} from './taskSlice'
const TasksList = () => {

    const[modalShow,setModalShow]=useState(false)
    const dispatch=useDispatch()
    const tasks=useSelector(store=>store.task.taskList)
    const updateTask=(task)=>{
      setModalShow(true)
      dispatch(addTaskToSelectedTask(task))
    }
    
    const deleteTask=(task)=>{
        dispatch(deleteTaskFromServer(task))
    }
    useEffect(()=>{
      dispatch(getTaskFromServer())
    },[dispatch])

    return (
    <div>
        <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {tasks && tasks.map((task,index)=>(
           <tr key={index}>
           <td>{index+1}</td>
           <td>{task.title}</td>
           <td>{task.description}</td>
           <td>
           <Button className='mx-4' variant="primary" onClick={()=>updateTask(task)}>
               <i className="bi bi-pencil-square"></i>
           </Button>
           <Button variant="danger" onClick={()=>deleteTask(task)} >
               <i className="bi bi-trash3"></i>
               </Button>
           </td>
       </tr>
        ))}
       
      </tbody>
    </Table>
    <UpdateTask
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default TasksList