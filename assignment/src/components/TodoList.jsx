import React, { useState, useEffect } from "react";
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };

      fetch("https://jsonplaceholder.typicode.com/users/1/todos", {
        method: "POST",
        body: JSON.stringify(newTaskObject),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks([...tasks, data]);
          setNewTask("");
        })
        .catch((error) => console.log(error));
    }
  };
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const editTask = (taskId) => {
    const updatedTaskTitle = prompt("Enter the updated task:");
    if (updatedTaskTitle !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTaskTitle } : task
      );
      setTasks(updatedTasks);
    }
  };
  const deleteTask = (taskId) => {
    fetch(`https://jsonplaceholder.typicode.com/users/1/todos/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
        <h1>Todo list Application</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{margin:"20px",marginLeft:"10px"}}
      />
      <button className="box btn btn-primary" onClick={addTask}>Add</button>

      <div className="">
        <button className=" m-2 btn btn-success" onClick={() => setShowCompleted(false)}>All Tasks</button>
        <button className=" btn btn-warning" onClick={() => setShowCompleted(true)}>Completed Tasks</button>
      </div>

      <ol className="boxline">
        {tasks
          .filter((task) => (showCompleted ? task.completed : true))
          .map((task) => (
            <li className="m-3 text-start"
              key={task.id}
              style={{
                textDecoration: task.completed ? "underline" : "none"
              }}
              onClick={() => completeTask(task.id)}
            >
              {task.title}
              <button className="m-2 btn btn-warning " onClick={() => editTask(task.id)}>Edit</button>  

              <button  className=" btn btn-danger " onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
      </ol>
      
    </div>
  );
};
export default TodoList;