import React, { useState } from 'react';
import { createTask } from '../axios/axios';

function AddTask() {
    const [taskData, setTaskData] = useState({
        heading: '',
        description: '',
        date: '',
        time: '',
        image: null,
        priority: 'medium',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setTaskData({
            ...taskData,
            image: imageFile,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the image file.
        const formData = new FormData();
        formData.append('heading', taskData.heading);
        formData.append('description', taskData.description);
        formData.append('date', taskData.date);
        formData.append('time', taskData.time);
        formData.append('image', taskData.image);
        formData.append('priority', taskData.priority);

        const response = await createTask(formData)
        if (response.status === 200) {
            console.log('Task added successfully');
        }
        // axios.post('/api/tasks', formData)
        //   .then((response) => {
        //     console.log('Task added successfully');
        //     // You can update the task list or perform other actions.
        //   })
        //   .catch((error) => {
        //     console.error('Error adding task:', error);
        //     // Handle errors and display a message to the user.
        //   });
    };

    return (
        <div>
            <h2>Add a New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="heading">Heading:</label>
                    <input
                        type="text"
                        id="heading"
                        name="heading"
                        value={taskData.heading}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={taskData.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={taskData.time}
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
                        value={taskData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;