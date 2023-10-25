import React, { useState, useEffect } from 'react';
import { deleteTask, getTask } from '../axios/axios';
import { useNavigate } from 'react-router-dom';

function ListTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTask(priorityFilter)
      if (response.status === 200) {
        console.log('Task added successfully');
        setTasks(response.data);
      }
    }
    fetchData();
  }, [priorityFilter,]);

  const handleDelete = async (taskId) => {
    // Send a DELETE request to the server to delete the task.

    const response = await deleteTask(taskId);
    if (response.status === 200) {
      console.log('Task deleted successfully');
      // After successful deletion, you may want to update the task list
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleDetails = (taskId) => {
    navigate(`/single-task/${taskId}`)
  }

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`)
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-[100vh] gap-4'>
      <h2 className='text-3xl font-bold'>Task List</h2>
      <div className="flex min-w-[600px] justify-between">
        <div>
          <label htmlFor="priorityFilter">Filter by Priority: </label>
          <select className='border border-black rounded-md' id="priorityFilter" value={priorityFilter} onChange={handlePriorityFilterChange}>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button className='bg-black text-white px-6 py-2 rounded-md' onClick={()=>navigate('/add-task')}>Add a task</button>
      </div>
      <table className='border border-black rounded-lg'>
        <thead className='text-left'>
          <tr>
            <th className='px-4 py-2 border-b-2 border-black'>Heading</th>
            <th className='px-4 py-2 border-b-2 border-black'>Priority</th>
            <th className='px-4 py-2 border-b-2 border-black'>Description</th>
            <th colSpan={3} className='px-4 py-2 border-b-2 text-center border-black'>Action</th>
          </tr>
        </thead>
        <tbody>

          {tasks.map((task) => (
            <tr key={task.id}>
              <td className='px-4 py-2 border-b border-black'>{task.heading}</td>
              <td className='px-4 py-2 border-b border-black'>{task.priority}</td>
              <td className='px-4 py-2 border-b border-black'>{task.description}</td>
              <td className='px-4 py-2 border-b border-black' ><button className='bg-blue-500 px-4 py-1 rounded-md' onClick={() => handleDetails(task.id)}>Show</button></td>
              <td className='px-4 py-2 border-b border-black' ><button className='bg-green-500 px-4 py-1 rounded-md' onClick={() => handleEdit(task.id)}>Edit</button></td>
              <td className='px-4 py-2 border-b border-black' ><button className='bg-red-500 px-4 py-1 rounded-md' onClick={() => handleDelete(task.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTasks;