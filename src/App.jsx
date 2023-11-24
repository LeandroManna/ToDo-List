import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Cargar desde localStorage al montar la aplicación
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Guardar en localStorage cuando la lista de tareas cambie
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const newTaskObject = {
      id: tasks.length + 1,
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app border-2 border-slate-400 rounded-xl">
      <h1 className="text-2xl">ToDo List</h1>
      <h2 className="text-lg">Manna Leandro</h2>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onCompleteTask={completeTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
