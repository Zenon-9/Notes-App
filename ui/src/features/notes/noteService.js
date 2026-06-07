import BASE_URL from '../../api/axios';

const NoteService = {

    async getNotes(isArchived = false) {
        const response = await BASE_URL.get(`/notes?isArchived=${isArchived}`);
        return response.data;
    },

    async getNoteById(id) {
        const response = await BASE_URL.get(`/notes/${id}`);
        return response.data;
    },

    async createNote(noteData) {
        const response = await BASE_URL.post('/notes', noteData);
        return response.data;
    },

    async updateNote(id, noteData) {
        const response = await BASE_URL.put(`/notes/${id}`, noteData);
        return response.data;
    },

    async deleteNote(id) {
        const response = await BASE_URL.delete(`/notes/${id}`);
        return response.data;
    },

    async archiveNote(id, data) {
        const response = await BASE_URL.post(`/notes/${id}`, data);
        return response.data;
    }
}

export default NoteService;
