import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskDetails({ taskId }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch the task details from the server using the task ID
    axios.get(`/api/tasks/${taskId}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Heading:</strong> {task.heading}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Date:</strong> {task.date}</p>
      <p><strong>Time:</strong> {task.time}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      {task.image && <img src={task.image} alt="Task View" />}
    </div>
  );
}

export default TaskDetails;