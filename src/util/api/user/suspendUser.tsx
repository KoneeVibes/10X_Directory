import { BASE_ENDPOINT } from "../../endpoint";

export const suspendUserService = async (token: string, id: string) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/usermanagement/user/status/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
