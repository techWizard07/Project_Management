import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//GET
export const getTaskFromServer=createAsyncThunk("task/getTaskFromServer",
async(_,{rejectionWithValue})=>{
    const response=await fetch("http://localhost:8000/tasks")
    if(response.ok){
        const jsonData=await response.json()
        return jsonData
    }
    else{
        return rejectionWithValue({error:"No Task is Found!"})
    }
})

//POST
export const addTaskToServer=createAsyncThunk("task/addTaskToServer",
async(task,{rejectionWithValue})=>{
    const options={
        method:"POST",
        body:JSON.stringify(task),
        header:{
            "Content-type":"application/json; charecterset=UTF-8"
    }
    }
    const response=await fetch("http://localhost:8000/tasks",options)

    if(response.ok){
        const jsonData=await response.json()
        return jsonData
    }
    else{
        return rejectionWithValue({error:"Task isn't added"})
    }
})

//PATCH
export const updateTaskInServer=createAsyncThunk("task/updateTaskInServer",
async(task,{rejectionWithValue})=>{
    const options={
        method:"PATCH",
        body:JSON.stringify(task),
        header:{
            "Content-type":"application/json; charecterset=UTF-8"
    }
    }
    const response=await fetch(`http://localhost:8000/tasks/${task.id}`,options)

    if(response.ok){
        const jsonData=await response.json()
        return jsonData
    }
    else{
        return rejectionWithValue({error:"Task isn't updated"})
    }
})
//DELETE
export const deleteTaskFromServer=createAsyncThunk("task/deleteTaskFromServer",
async(task,{rejectionWithValue})=>{
    const options={
        method:"DELETE",
    }
    const response=await fetch(`http://localhost:8000/tasks/${task.id}`,options)

    if(response.ok){
        const jsonData=await response.json()
        return jsonData
    }
    else{
        return rejectionWithValue({error:"Task isn't deleted"})
    }
})

const taskSlice=createSlice({
    name:"taskSlice",
    initialState:{
        taskList:[],
        selectedTask:{},
        isLoading:false,
        error:''
    },
    reducers:{
        addTaskToList : (state,action)=>{
            let id=Math.random()
            const task={...action.payload,id}
            state.taskList.push(task)
            console.log("task Slice")
        },
        removeTaskFromList:(state,action)=>{
           state.taskList= state.taskList.filter(task=>task.id!==action.payload.id)
        },
        updateTaskOnList:(state,action)=>{
            state.taskList=state.taskList.map(task=>task.id!==action.payload.id ? task : action.payload)
        },
        addTaskToSelectedTask:(state,action)=>{
            state.selectedTask=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder 
            .addCase(getTaskFromServer.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getTaskFromServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList=action.payload
            })
            .addCase(getTaskFromServer.rejected,(state,action)=>{
                state.isLoading=false
                state.taskList=[]
                state.error=action.payload.error
            })
            .addCase(addTaskToServer.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(addTaskToServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload.error
            })
            .addCase(updateTaskInServer.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(updateTaskInServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList=state.taskList.map(task=>task.id!==action.payload.id ? task : action.payload)
            })
            .addCase(updateTaskInServer.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload.error
            })
            .addCase(deleteTaskFromServer.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(deleteTaskFromServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList= state.taskList.filter(task=>task.id!==action.payload.id)
            })
            .addCase(deleteTaskFromServer.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload.error
            })
    }
})

export const {addTaskToList,removeTaskFromList,updateTaskOnList,addTaskToSelectedTask} = taskSlice.actions

export default taskSlice.reducer