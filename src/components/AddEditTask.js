import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import {URL} from '../App'
import TaskDetail from './TaskDetail';
import loadingImg from '../assets/loading.jpg'

// import{ REACT_APP_SERVER_URL } from '../App' // working

const AddEditTask = () => {

const [newTask, setNewTask]= useState(
  {
      name:"",
      completed:false
  }
)

const [takingTask, setTakingTask]=useState([]) 
// storing/editing new task

const [isLoding, setIsLoading]=useState(false)

const[completedTasks, setCompletedTasks]=useState([])
//number of completed tasks

// Read  Get method

const getTask=async ()=>{
  setIsLoading(true)

  try{
  const {data}=await axios.get(`${URL}/get-tasks`)
  // console.log("dataing:",data)
setTakingTask(data)
// setTakingTask()
  setIsLoading(false)

  const TotalcompletedTasks= data.filter(SingleTask=>
    SingleTask.completed===true)
    setCompletedTasks(TotalcompletedTasks)

  }

  catch(error)
  {
    toast.error(error.message)
    console.log(error.message)
    setIsLoading(false)
  }
}

useEffect(()=>{
getTask()
  },[])

const Name=newTask.name
// http://localhost:3000/
// const [storeTasks, setStoreTasks]=useState([])

//----------------------------------------------------------------------
function onChangeHandler(event){
  const {name,value}=event.target

    setNewTask((prevTask)=>(
      {...prevTask,[name]:value}
    ))
}
//------------------------------------------------------

// CRUD => Create -- Read -- Update -- Delete

//------------------------------------------------------
// Create Post method
const createTask=async (event)=>{

  event.preventDefault();
  // console.log("name: ", name)
  if(Name==="")
  {
    return toast.error("Please enter task") 
  }
  // console.log("url:", URL)
try{
    // await axios.post(`${REACT_APP_SERVER_URL}/create-task`, newTask)
    await axios.post(`${URL}/create-task`, newTask)
    console.log("1", newTask)
    // await axios.post("http://localhost:5000/create-task", newTask)
    toast.success("Task has been added")
    setNewTask({...newTask,name:""})
    console.log("2", newTask)
    getTask()
}
     catch(error)
     {
      toast.error(error.message)
      console.log("error:",error)
     }
}

// ---------------------------------------------------------------

 const deleteHandler=async(id)=>{
     
  // const id=takingTask[index]._id
  try{
       await axios.delete(`http://localhost:5000/delete-task/${id}`)
       toast.success("Task Deleted successfully")
      getTask()
  }
  catch(error)
  {
    toast.error(error.message)
  }

}
// console.log("n", takingTask)
// --------------------------------------

// Update
 const [isEdit,  setIsEdit]=useState(false)
 const [Id, setId]= useState()

const editHandler=(task)=>{
  setNewTask({
        name:task.name,
        completed:false
  })
  setIsEdit(true)
setId(task._id)

  // console.log("edit", newTask) 
}


 const editTask= async(e)=>{
 e.preventDefault()
 if(Name==="")
 {
  toast.error("Please Add Task")
 }   
     try{
      await axios.put(`http://localhost:5000/update-task/${Id}`, newTask)
      setNewTask({...newTask, name:""})
      toast.success("Task Edited Successfully")
      setIsEdit(false)
      getTask()
     }
     catch(error)
     {
      toast.error(error.message)
     }
 }



 const completClickHandler=async(task)=>{
        task.completed=!task.completed
const completedTask={
  name:task.name,
  completed:task.completed
}
        try{
          await axios.put(`http://localhost:5000/update-task/${task._id}`,completedTask)
          if(task.completed)
         { toast.success("Task Completed!")}
          
           getTask()
          
         }
         catch(error)
         {
          toast.error(error.message)
         }
 }

  return (
    <div>
      {/* {storeTasks} */}


      <form className="form" onSubmit={!isEdit ? createTask: editTask}>
        <span className="form-span">

        <input 
        type="text" className='form-input' onChange={onChangeHandler}
         name="name"
         value={Name} 
          />

         <input type="submit" value={!isEdit ? "Add" : "Edit" } className="form-button"/>

        </span>
        
      </form>

      
{
       takingTask.length > 0 && (
         <div className='task-summary'>
            <span>
            <b>Total {takingTask.length>1 ?"Tasks":"Task"}:</b>
            &nbsp; {takingTask.length}
            </span>

            <span>
            <b>Completed {completedTasks.length> 1 ?"Tasks":"Task"}:</b>
            &nbsp; {completedTasks.length}

            </span>
         
            </div>
       )      
}

      {
        isLoding && (
          (
            <div>
              <img src={loadingImg} alt="loading.." className="imgStyle" />
            </div>
          )
        )
      }

      {
        !isLoding && (takingTask.length===0 ? <p className='no-task'>No task was found. Please add a task</p>
        : takingTask.map((task,index)=>{
          return(

       <TaskDetail
        key={task._id}
        task={task} 
        index={index}
         deleteHandler={deleteHandler} 
         editHandler={editHandler}
         completClickHandler={completClickHandler}
         completed={task.completed}
         /> 
                       
          )
        }
        )
        )
      }

      {/* -------------------------------------------------- */}
    </div>
  )
}

export default AddEditTask