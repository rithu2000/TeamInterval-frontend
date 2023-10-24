import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const createTask = async (credentials) => {
    try {
        const { data } = await taskApi.post(`/`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function getTask(credentials) {
    try {
        console.log(credentials,'creeeeeeee');
        const { data } = await taskApi.get(`/`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};

export async function editTask(credentials) {
    try {
        const { data } = await taskApi.put(`/`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};

export async function deleteTask(credentials) {
    try {
        const { data } = await taskApi.delete(`/`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};

export async function showTask(credentials) {
    try {
        const { data } = await taskApi.post(`/`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Form creation api error' }
    }
};