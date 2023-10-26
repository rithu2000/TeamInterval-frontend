import React, { useState, useEffect } from 'react';
import { editTask, showTask } from '../axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [error, setError] = useState('');
  const [image, setImage] = useState();
  const [editedTask, setEditedTask] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    image: null,
    priority: 'medium',
  });

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error('Error on fetching data', error);
    }
  }, [taskId]);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setEditedTask({
        ...editedTask,
        [name]: value,
      });
    } catch (error) {
      console.error('Error in handleChange:', error);
    }
  };
  const handleImageChange = (e) => {
    try {
      const imageFile = e.target.files[0];
      setEditedTask({
        ...editedTask,
        image: imageFile,
      });
      setImage(URL.createObjectURL(imageFile))
    } catch (error) {
      console.error('Error in handleImageChange:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editedTask.heading.length === 0 || editedTask.description.length === 0) {
        setError('Heading and Description is required')
        return
      }
      if (editedTask.date.length === 0 || editedTask.time.length === 0) {
        setError('Date and Time is required')
        return
      }
      if (editedTask.image.length === 0) {
        setError('Insert an Image')
        return
      }
      const formData = new FormData();
      formData.append('heading', editedTask.heading);
      formData.append('description', editedTask.description);
      formData.append('date', editedTask.date);
      formData.append('time', editedTask.time);
      formData.append('image', editedTask.image);
      formData.append('priority', editedTask.priority);

      const response = await editTask(taskId, formData)
      if (response.status === 200) {
        toast.success(response.data.message)
        navigate('/')
      } else {
        toast.error('Failed to update the task')
      }
    } catch (error) {
      console.error('An error occurred while updating the task.');
    }
  };
  return (
    <div className='flex justify-center items-center flex-col min-h-[100vh] gap-4'>
      {error && <p className='fixed top-10 right-10 px-6 py-2 rounded-md bg-red-700 text-white'>{error}</p>}
      <h2 className='text-3xl font-bold'>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="heading">Heading:</label>
          <input
            className='border-2 rounded-md px-4 py-2'
            type="text"
            id="heading"
            name="heading"
            value={editedTask.heading}
            onChange={handleChange}
          />
        </div>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="description">Description:</label>
          <textarea
            className='border-2 rounded-md px-4 py-2'
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </div>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="date">Date:</label>
          <input
            className='border-2 rounded-md px-2 py-1'
            type="date"
            id="date"
            name="date"
            value={editedTask.date}
            onChange={handleChange}
          />
        </div>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="time">Time:</label>
          <input
            className='border-2 rounded-md px-2 py-1'
            type="time"
            id="time"
            name="time"
            value={editedTask.time}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-end mt-2'>
          <div className="">
            {editedTask.image && <img className='w-[200px] rounded-md' src={image} alt="Task View" />}
          </div>
        </div>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="image">Change Image:</label>
          <input
            className='border-2 rounded-md max-w-[60%] px-2 py-1'
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className='flex min-w-[200px] justify-between mt-2'>
          <label htmlFor="priority">Priority:</label>
          <select
            className='border-2 rounded-md px-2 py-1'
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
        <div className='max-w-fit mx-auto'>
          <button className='px-4 py-2 bg-blue-600 rounded-md text-white' type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;