import api from '../api/axios';

const noteService = {
    createNote: async (noteData) => {
        const response = await api.post('/notes', noteData);
        return response.data;
    },
    getNotes: async (isArchived) => {
        const response = await api.get('/notes', {
            params: isArchived !== undefined ? { isArchived } : undefined
        });
        return response.data;
    },
    updateNote: async (id, noteData) => {
        const response = await api.put(`/notes/${id}`, noteData);
        return response.data;
    },
    deleteNote: async (id) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    },
};

export default noteService;