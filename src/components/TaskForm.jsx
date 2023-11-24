import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Cargar las tareas desde localStorage al montar la aplicación
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guardar las tareas en localStorage cuando la lista de tareas cambie
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask.trim() === '') {
      toast.error('Por favor, ingresa un nombre válido');
      return;
    }

    // Agregar la nueva tarea al estado de tareas
    const newTaskObject = {
      id: tasks.length + 1,
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);

    // Llamar a la función proporcionada para agregar la tarea
    onAddTask(newTask);

    // Limpiar el campo de entrada y mostrar un mensaje de éxito
    setNewTask('');
    toast.success('Nueva tarea agregada');
  };

  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={handleInputChange}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
