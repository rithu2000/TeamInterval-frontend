import React, { useState, useEffect } from 'react';
import { showTask } from '../axios/axios';
import { useParams } from 'react-router-dom';

function TaskDetails() {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await showTask(id)
        if (response.status === 200) {
          setTask(response.data);
        }
      }
      fetchData();
    } catch (error) {
      console.error('Error on fetching data', error);
    }
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex justify-center items-center flex-col min-h-[100vh] gap-4'>
      <h2 className='text-3xl font-bold'>Task Details</h2>
      {task.image && <img className='w-[200px] rounded-md' src={`http://localhost:8000/${task.image}`} alt="Task View" />}
      <p className='flex min-w-[200px] justify-between'><strong>Heading:</strong> {task.heading}</p>
      <p className='flex min-w-[200px] justify-between'><strong>Description:</strong> {task.description}</p>
      <p className='flex min-w-[200px] justify-between'><strong>Date:</strong> {task.date}</p>
      <p className='flex min-w-[200px] justify-between'><strong>Time:</strong> {task.time}</p>
      <p className='flex min-w-[200px] justify-between'><strong>Priority:</strong> {task.priority}</p>
    </div>
  );
}

export default TaskDetails;