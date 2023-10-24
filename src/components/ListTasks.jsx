import React, { useState, useEffect } from 'react';
import { getTask } from '../axios/axios';

function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    // Fetch and list tasks based on the priority filter
    console.log(priorityFilter,'qwerty');
    const response = getTask(priorityFilter)
    console.log(response, 'qwe');
    if(response.status === 200) {
      console.log('Task added successfully');
      setTasks(response.data);
    }
    // axios.get(`/api/tasks?priority=${priorityFilter}`)
    //   .then((response) => {
    //     setTasks(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching tasks:', error);
    //   });
  }, [priorityFilter]);

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <label htmlFor="priorityFilter">Filter by Priority:</label>
        <select id="priorityFilter" value={priorityFilter} onChange={handlePriorityFilterChange}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.heading} ({task.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTasks;
