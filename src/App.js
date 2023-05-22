import { useState } from "react";

import AddTaskForm from "./components/AddTaskForm";
import UpdateForm from "./components/UpdateForm";
import ToDo from "./components/ToDo";

import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css";

function App() {
  // Tasks (ToDo List) state  (main state holding the task)
  const [toDo, setToDo] = useState([ ]);
    // { id: 1, title: "Task 1", status: false },
    // { id: 2, title: "Task 2", status: false },
 

  //Set Update State (temporary state holding the updte)
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Funtion to Add Task
  const addTask = () => {
    //
    if (newTask) {
      let num = toDo.length + 1;
      let newEnry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEnry]);
      setNewTask("");
    }
  };

  // Function to Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Function to Mark Task as Done

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Funtion to Mark upDate

  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Function to change Task

  const changeTask = (e) => {
    let newEnry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEnry);
  };

  // Function to update task

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br></br>
      <h2>To Do List (React JS)</h2>
      <br />

      {/* {Form to Update task} */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* {Display ToDos} */}
      {toDo && toDo.length ? "" : "No Task..."}
     <ToDo 
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    
    />
    </div>
  );
}

export default App;
