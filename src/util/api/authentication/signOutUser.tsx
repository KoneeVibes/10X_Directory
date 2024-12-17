import { BASE_ENDPOINT } from "../../endpoint";

export const signOutUser = async (token: string) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/auth/signout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
