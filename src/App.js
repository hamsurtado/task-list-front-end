import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';


// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

function App () {
  const [tasks, setTasks] = useState([]);
  const API = 'https://task-list-api-c17.onrender.com/tasks';

  const getAllTasks = () => {
    axios
    .get(API)
    .then((result) => {
      setTasks(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const postTask = (newTasks) => {
    axios
    .post(API, newTasks)
    .then((result) => {
      getAllTasks();
    })
    .catch((err) => {
      console.log(err);
    });

  };

  // Toggle complete feature
  const updateComplete = (id, isComplete) => {
    const completeStatus = isComplete ? 'mark_incomplete' : 'mark_complete';
    axios.patch(`${API}/${id}/${completeStatus}`)
    .then((result) => {
      console.log(result.data);
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          const updateTask = {...task};
          updateTask.is_complete = !task.is_complete;
          return updateTask;
        } else {
          return task;
        }
      });
      setTasks(newTasks);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  // Delete tasks
  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`)
    .then((result) => {
      console.log(result.data);
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} updateComplete={updateComplete} deleteTask={deleteTask}/>}</div>
        <NewTaskForm addTask={postTask} />
      </main>
    </div>
  );
}

export default App;
  