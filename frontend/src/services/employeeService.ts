import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/';
export const getAllEmployee = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/employees/all`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

