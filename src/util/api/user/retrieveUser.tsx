import { BASE_ENDPOINT } from "../../endpoint";

export const retrieveUserService = async (token: string) => {
    try {
        const url = `${BASE_ENDPOINT}/usermanagement/user`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res.data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};