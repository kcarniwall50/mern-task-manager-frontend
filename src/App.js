
// import {useState} from 'react'
import './App.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddEditTask from './components/AddEditTask';

// import TaskList from './components/TaskList';

export const URL=process.env.REACT_APP_SERVER_URL

// export const { REACT_APP_SERVER_URL } = process.env;

console.log("app url:", URL)
function App() {
// console.log("app")
// const [taskList, setTaskList]= useState([])


  return (
    <div className="App">
      <h2>Task Manager</h2>

      <AddEditTask />

      {/* <TaskDetail taskList={taskList}/> */}

      {/* <TaskList /> */}
<ToastContainer />
    </div>
  );
}

export default App;
