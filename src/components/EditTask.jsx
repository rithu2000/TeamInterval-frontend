import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTask({ taskId }) {
  const [editedTask, setEditedTask] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    image: null,
    priority: 'medium',
  });

  useEffect(() => {
    // Fetch the task details from the server using taskId
    axios.get(`/api/tasks/${taskId}`)
      .then((response) => {
        const task = response.data;
        setEditedTask({
          heading: task.heading,
          description: task.description,
          date: task.date,
          time: task.time,
          image: task.image,
          priority: task.priority,
        });
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEditedTask({
      ...editedTask,
      image: imageFile,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the updated task data, including the image file.
    const formData = new FormData();
    formData.append('heading', editedTask.heading);
    formData.append('description', editedTask.description);
    formData.append('date', editedTask.date);
    formData.append('time', editedTask.time);
    formData.append('image', editedTask.image);
    formData.append('priority', editedTask.priority);

    axios.put(`/api/tasks/${taskId}`, formData)
      .then((response) => {
        console.log('Task updated successfully');
        // Redirect to the task details page or perform other actions.
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        // Handle errors and display a message to the user.
      });
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={editedTask.heading}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={editedTask.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={editedTask.time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTask;
