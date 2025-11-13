import axios from 'axios';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';


let lastUnauthorizedToast = 0;
let lastNetworkToast = 0;
const TOAST_THROTTLE_DURATION = 5000;
const NETWORK_TOAST_THROTTLE_DURATION = 5000;

const resolveWindow = (): Window | undefined => {
    if (typeof globalThis === 'undefined') {
        return undefined;
    }

    const maybeWindow = (globalThis as typeof globalThis & { window?: Window }).window;
    return maybeWindow;
};

const sanitizeBaseUrl = (raw: string): string => {
    const trimmed = raw.trim();
    const hasLeadingQuote = trimmed.startsWith('"') || trimmed.startsWith('\'');
    const withoutLeadingQuote = hasLeadingQuote ? trimmed.slice(1) : trimmed;
    const hasTrailingQuote = withoutLeadingQuote.endsWith('"') || withoutLeadingQuote.endsWith('\'');
    return hasTrailingQuote ? withoutLeadingQuote.slice(0, -1) : withoutLeadingQuote;
};

const getBaseURL = () => {
    const win = resolveWindow();
    if (win && win.location.hostname !== 'localhost') {
        return '/api/proxy';
    }

    const url = process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127';
    return sanitizeBaseUrl(url);
};

const baseURL = getBaseURL();

const showNetworkToast = (message: string) => {
    const now = Date.now();
    if (now - lastNetworkToast > NETWORK_TOAST_THROTTLE_DURATION) {
        lastNetworkToast = now;
        toast.error(message, { duration: 3000 });
    }
};

const clearAuthStorage = () => {
    if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
        return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('onboarding_completed');
};

const handleSessionExpired = () => {
    const now = Date.now();

    if (now - lastUnauthorizedToast > TOAST_THROTTLE_DURATION) {
        lastUnauthorizedToast = now;
        toast.error('Sesi Anda telah berakhir. Silakan login kembali.', {
            duration: 3000,
        });
    }

    clearAuthStorage();

    const win = resolveWindow();
    if (!win) {
        return;
    }

    const authPaths = ['/login', '/register', '/auth/google/callback'];
    if (!authPaths.some((path) => win.location.pathname.startsWith(path))) {
        console.log('🔄 Redirecting to login page...');
        setTimeout(() => {
            win.location.href = '/login';
        }, 1500);
    }
};

const handleUnauthorizedError = (error: AxiosError): never => {
    const requestUrl = error.config?.url ?? '';
    const isLoginRequest = requestUrl.includes('/login') || requestUrl.includes('/api/login');

    if (isLoginRequest) {
        throw error;
    }

    handleSessionExpired();
    throw error;
};

const mapNetworkError = (error: AxiosError): Error | null => {
    const message = error.message ?? '';

    if (error.code === 'ECONNABORTED' || message.includes('timeout')) {
        console.warn('⏰ Request taking longer than expected');
        showNetworkToast('Permintaan lambat, coba ulangi sebentar lagi.');

        const timeoutError = new Error('Permintaan membutuhkan waktu lebih lama dari biasanya. Silakan coba lagi.');
        timeoutError.name = 'TimeoutError';
        return timeoutError;
    }

    if (message.includes('Network Error')) {
        console.warn('🌐 Network error detected');
        showNetworkToast('Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.');

        const networkError = new Error('Tidak dapat terhubung ke server. Silakan coba lagi.');
        networkError.name = 'NetworkError';
        return networkError;
    }

    return null;
};

if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Base URL:', baseURL);
} else {
    console.log('🌐 Using API Proxy for production');
}

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (resolveWindow()) {
            const token = localStorage.getItem('token');

            if (token) {
                config.headers = config.headers ?? {};
                (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        throw error;
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 401) {
                handleUnauthorizedError(axiosError);
            }

            throw axiosError;
        }

        if (axiosError.request) {
            const mappedError = mapNetworkError(axiosError);
            if (mappedError) {
                throw mappedError;
            }
        }

        throw axiosError;
    }
);

export { axiosInstance };
export default axiosInstance;
