import { BASE_ENDPOINT } from "../../endpoint";

export const retrieveAllUsersService = async (token: string, filter?: string) => {
    try {
        const url = `${BASE_ENDPOINT}/usermanagement/all/user${filter ? `?filter=${encodeURIComponent(filter.trim())}` : ''}`;
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
