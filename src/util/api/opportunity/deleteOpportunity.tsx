import { BASE_ENDPOINT } from "../../endpoint";

export const deleteOpportunityService = async (token: string, id: string) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/opportunitymanagement/opportunity/status/${id}`, {
            method: 'DELETE',
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
