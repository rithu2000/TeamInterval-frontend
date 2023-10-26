import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const createTask = async (formData) => {
    try {
        const data = await taskApi.post(`/`, formData, { withCredentials: true })
        return data
    } catch (error) {
        console.error(error);
        return { error: 'Task creation API error' }
    }
};

export async function getTask(priorityFilter) {
    try {
        const data = await taskApi.get(`/tasks?priority=${priorityFilter}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Error fetching task details' }
    }
};

export async function editTask(taskId, formData) {
    try {
        const data = await taskApi.put(`/${taskId}`, formData, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Task updation error' }
    }
};

export async function deleteTask(taskId) {
    try {
        const data = await taskApi.delete(`/${taskId}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Task deletion error' }
    }
};

export async function showTask(taskId) {
    try {
        const data = await taskApi.get(`/${taskId}`, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Error fetching the data' }
    }
};