import React from 'react';
import axios from 'axios';

function DeleteTask({ taskId, onDelete }) {
  const handleDelete = () => {
    // Send a DELETE request to the server to delete the task.
    axios.delete(`/api/tasks/${taskId}`)
      .then((response) => {
        console.log('Task deleted successfully');
        // Call the onDelete function to update the UI or perform other actions.
        onDelete(taskId);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        // Handle errors and display a message to the user.
      });
  };

  return (
    <button onClick={handleDelete}>Delete Task</button>
  );
}

export default DeleteTask;
