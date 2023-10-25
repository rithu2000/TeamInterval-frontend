import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const createTask = async (formData) => {
    try {
        console.log(formData, 'enthaaa dataaaa');
        const data = await taskApi.post(`/`, formData, { withCredentials: true })
        console.log(data, '1234');
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function getTask(priorityFilter) {
    try {
        const data = await taskApi.get(`/tasks?priority=${priorityFilter}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};

export async function editTask(taskId, formData) {
    try {
        const data = await taskApi.put(`/${taskId}`, formData, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Error fetching task details:' }
    }
};

export async function deleteTask(taskId) {
    try {
        const data = await taskApi.delete(`/${taskId}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};

export async function showTask(taskId) {
    try {
        const data = await taskApi.get(`/${taskId}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};