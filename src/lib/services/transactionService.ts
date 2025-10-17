import axiosInstance from "@/lib/axios";

export const getUsageBars = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get('/api/usage-bar');
        return response.data;
    } catch (error) {
        console.error('Error fetching usage bars:', error);
        throw error;
    }
};
