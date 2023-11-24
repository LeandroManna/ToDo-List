import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, onCompleteTask, onEditTask, onDeleteTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.name);

  const handleCompleteTask = () => {
    onCompleteTask(task.id);
    toast.success('Tarea completada');
  };

  const handleEditTask = () => {
    setEditing(true);
  };

  const handleSaveTask = () => {
    if (editedTask.trim() === '') {
      toast.error('Por favor, ingresa un nombre válido');
      return;
    }

    onEditTask(task.id, editedTask);
    setEditing(false);
    toast.success('Tarea editada');
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    toast.error('Tarea eliminada');
  };

  return (
    <div className="task-item">
      <span className={`task-name ${task.completed ? 'completed' : ''}`}>
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        ) : (
          task.name
        )}
      </span>
      <div>
        {!isEditing && (
          <>
            <button onClick={handleCompleteTask} className='buttonItem'>Completar</button>
            <button onClick={handleEditTask} className='buttonItem'>Editar</button>
          </>
        )}
        <button onClick={handleDeleteTask} className='buttonItem buttonItem-danger'>Eliminar</button>
        {isEditing && (
          <button onClick={handleSaveTask} className='buttonItem'>Guardar</button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
