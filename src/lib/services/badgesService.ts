import apiClient from '../axios';

// Types for Badges API
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  earned: boolean;
  earned_at: string | null;
  progress: {
    current: number | string;
    required: number;
    percentage: number;
  };
}

export interface BadgesData {
  badges: Badge[];
  total_badges: number;
  earned_badges: number;
  completion_percentage: number;
}

export interface BadgesResponse {
  status: string;
  message: string;
  data: BadgesData;
}

// Get user badges
export const getBadges = async (): Promise<BadgesResponse> => {
  const response = await apiClient.get('/api/badges');
  return response.data;
};