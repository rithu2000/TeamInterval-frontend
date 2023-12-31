import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTasks from './components/ListTasks';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Toaster position='top-center' />
      <Routes>
        <Route exact path="/" element={<ListTasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
        <Route path='/single-task/:id' element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;