// Helper untuk check apakah user sudah login dan sudah complete onboarding
export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    return !!token;
};

export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

// Check apakah user sudah complete onboarding
// Bisa disesuaikan dengan response dari API
export const hasCompletedOnboarding = (): boolean => {
    if (typeof window === 'undefined') return false;
    const completed = localStorage.getItem('onboarding_completed');
    return completed === 'true';
};

export const setOnboardingCompleted = (completed: boolean) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('onboarding_completed', completed.toString());
};

export const redirectBasedOnAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = '/login';
        return;
    }

    if (!hasCompletedOnboarding()) {
        window.location.href = '/get-started';
        return;
    }

    window.location.href = '/';
};
