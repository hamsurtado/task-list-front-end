import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  // Toggle complete feature
  const updateComplete = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        const updateTask = {...task};
        updateTask.isComplete = !task.isComplete;
        return updateTask;
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  };

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} updateComplete={updateComplete}/>}</div>
      </main>
    </div>
  );
};

export default App;
