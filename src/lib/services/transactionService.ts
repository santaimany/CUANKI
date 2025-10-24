import axiosInstance from "@/lib/axios";
import { UsageBarsResponse } from "@/types/api";


export const getUsageBars = async (): Promise<UsageBarsResponse> => {
    try {
        const response = await axiosInstance.get('/api/usage-bar');
        return response.data;
    } catch (error) {
   
        throw error;
    }
};
