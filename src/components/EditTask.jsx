import React, { useState, useEffect } from 'react';
import { editTask, showTask } from '../axios/axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [image,setImage] = useState();


  const [editedTask, setEditedTask] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    image: null,
    priority: 'medium',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await showTask(taskId)
      if (response.status === 200) {
        console.log('Task fetch successful');
        const task = response.data;
        setEditedTask({
          heading: task.heading,
          description: task.description,
          date: task.date,
          time: task.time,
          image: task.image,
          priority: task.priority,
        });
        setImage(`http://localhost:8000/${task.image}`)
      }
    }
    fetchData();
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
    setImage(URL.createObjectURL(imageFile))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('heading', editedTask.heading);
    formData.append('description', editedTask.description);
    formData.append('date', editedTask.date);
    formData.append('time', editedTask.time);
    formData.append('image', editedTask.image);
    formData.append('priority', editedTask.priority);

    const response = await editTask(taskId, formData)
    if (response.status === 200) {
      console.log('Task updated successfully');
      navigate('/')
    }
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
          <label htmlFor="image">Change Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {editedTask.image && <img className='w-[200px]' src={image} alt="Task View" />}
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