import BASE_URL from '../api/axios';

const NoteService = {

    async getNotes() {
        const response = await BASE_URL.get('/notes');
        return response.data;
    }
}

export default NoteService;