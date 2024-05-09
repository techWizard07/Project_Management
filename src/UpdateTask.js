import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  updateTaskInServer } from './taskSlice'

function UpdateTask(props) {

  const tasks=useSelector(store=>store.task.selectedTask)
    const dispatch=useDispatch()
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[id,setId]=useState('')

    const updateTask=()=>{
        props.onHide()
        dispatch(updateTaskInServer({id,title,description}))
        
    }

    useEffect(()=>{
      if(tasks){
        setTitle(tasks.title)
        setDescription(tasks.description)
        setId(tasks.id)
      }
    },[tasks])
  return (
    <div>
        <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Update Task
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={(e)=>e.preventDefault()} className='my-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Title</Form.Label>
        <Form.Control type="text"value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Task title"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Task Description" />
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <div className="text-end">
      <Button  onClick={()=>updateTask()}variant="primary" type="submit" >
        Update Tasks
      </Button>
      </div>
    </Modal.Footer>
  </Modal></div>
  )
}

export default UpdateTask