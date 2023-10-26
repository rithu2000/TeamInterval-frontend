import React, { useState } from 'react';
import { createTask } from '../axios/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [taskData, setTaskData] = useState({
        heading: '',
        description: '',
        date: '',
        time: '',
        image: null,
        priority: 'medium',
    });
    const handleChange = async (e) => {
        try {
            const { name, value } = e.target;
            setTaskData({
                ...taskData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };
    const handleImageChange = async (e) => {
        try {
            const imageFile = e.target.files[0];
            setTaskData({
                ...taskData,
                image: imageFile,
            });
        } catch (error) {
            console.error('Error in handleImageChange:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (taskData.heading.length === 0 || taskData.description.length === 0) {
                setError('Heading and Description is required')
                return
            }
            if (taskData.date.length === 0 || taskData.time.length === 0) {
                setError('Date and Time is required')
                return
            }
            if (taskData.image.length === 0) {
                setError('Insert an Image')
                return
            }
            const formData = new FormData();
            formData.append('heading', taskData.heading);
            formData.append('description', taskData.description);
            formData.append('date', taskData.date);
            formData.append('time', taskData.time);
            formData.append('image', taskData.image);
            formData.append('priority', taskData.priority);

            const response = await createTask(formData)
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error('Failed to create a task')
            }
        } catch (error) {
            console.error('An error occurred while creating the task.');
        }
    };
    return (
        <div className='flex justify-center items-center flex-col min-h-[100vh] gap-4'>
            {error && <p className='fixed top-10 right-10 px-6 py-2 rounded-md bg-red-700 text-white'>{error}</p>}
            <h2 className='text-3xl font-bold'>Add a New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="heading">Heading:</label>
                    <input
                        className='border-2 rounded-md px-4 py-2'
                        type="text"
                        id="heading"
                        name="heading"
                        value={taskData.heading}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className='border-2 rounded-md px-4 py-2'
                        id="description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="date">Date:</label>
                    <input
                        className='border-2 rounded-md px-3 py-1'
                        type="date"
                        id="date"
                        name="date"
                        value={taskData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="time">Time:</label>
                    <input
                        className='border-2 rounded-md px-3 py-1'
                        type="time"
                        id="time"
                        name="time"
                        value={taskData.time}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="image">Image:</label>
                    <input
                        className='max-w-[60%] border-2 rounded-md px-2 py-1'
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                <div className='flex min-w-[200px] justify-between mt-2'>
                    <label htmlFor="priority">Priority:</label>
                    <select
                        className='border-2 rounded-md px-3 py-1'
                        id="priority"
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className='max-w-fit mx-auto'>
                    <button className='px-4 py-2 bg-green-600 rounded-md text-white' type="submit">Add Task</button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;