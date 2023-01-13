import React from 'react'
// import {editHandler,deleteHandler} from './AddEditTask'
import {RiCheckDoubleFill} from 'react-icons/ri'
const TaskDetail = ({task,index,editHandler,deleteHandler,completed,completClickHandler}) => {

  

  return (
    
    <div>
            <div key={index}className='taskLoading'>
             <span className="taskName"><b>{index+1}.</b>&nbsp;{task.name}</span> 

              <span className="span-side">
                  
                 {/* <IoCheckmarkDoneOutline /> */}
                 {/* <BiCheckDouble/> */}
                 <RiCheckDoubleFill onClick={()=>completClickHandler(task)}  color={completed?"green":"red"}/>

                <button className='edit' onClick={()=>editHandler(task)}>Edit</button>

                <button className="delete" onClick={()=>deleteHandler(task._id)}>Delete</button>
                </span>

            </div>
    </div>
    
  )
}

export default TaskDetail