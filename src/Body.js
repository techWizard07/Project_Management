import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addTaskToServer } from './taskSlice';

function Body() {

    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const dispatch=useDispatch()

    const addTask=()=>{
      dispatch(addTaskToServer({title,description}))
      setTitle('')
      setDescription('')
    }

    
  return (
    <Form onSubmit={(e)=>e.preventDefault()} className='my-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Task title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Task Description" />
      </Form.Group>
      
      <div className="text-end">
      <Button  variant="primary" type="submit" onClick={()=>addTask()}>
        Add Tasks
      </Button>
      </div>
    </Form>
  );
}

export default Body;