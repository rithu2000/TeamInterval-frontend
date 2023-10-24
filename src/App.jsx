import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTasks from './components/ListTasks';
import AddTask from './components/AddTask';
// import EditTask from './components/EditTask';
// import DeleteTask from './components/DeleteTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListTasks />} />
        <Route path="/add-task" element={<AddTask />} />
        {/* <Route path="/edit-task/:id" component={EditTask} />
          <Route path="/delete-task/:id" component={DeleteTask} /> */}
      </Routes>
    </Router>
  );
}

export default App;