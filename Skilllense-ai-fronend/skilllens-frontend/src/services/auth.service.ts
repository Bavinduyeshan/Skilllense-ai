// import api from './api';
// import type { AuthResponse, User } from '../types/index';
// export const authService = {
//   async register(email: string, password: string, fullName: string) {
//     const response = await api.post<AuthResponse>('/auth/register', {
//       email,
//       password,
//       fullName,
//     });
    
//     if (response.data.success && response.data.data.access_token) {
//       localStorage.setItem('access_token', response.data.data.access_token);
//       localStorage.setItem('user', JSON.stringify(response.data.data.user));
//     }
    
//     return response.data;
//   },

//   async login(email: string, password: string) {
//     const response = await api.post<AuthResponse>('/auth/login', {
//       email,
//       password,
//     });
    
//     if (response.data.success && response.data.data.access_token) {
//       localStorage.setItem('access_token', response.data.data.access_token);
//       localStorage.setItem('user', JSON.stringify(response.data.data.user));
//     }
    
//     return response.data;
//   },

//   async logout() {
//     try {
//       await api.post('/auth/logout');
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('user');
//     }
//   },

//   async getCurrentUser() {
//     const response = await api.get<{ success: boolean; data: { user: User } }>('/auth/me');
//     return response.data.data.user;
//   },

//   getStoredUser(): User | null {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   },

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('access_token');
//   },
// };


import api from './api';
import type { AuthResponse, User } from '../types/index';

export const authService = {
  async register(email: string, password: string, fullName: string) {
    console.log('Register service called');
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });
    
    console.log('Register response:', response.data);
    
    if (response.data.success && response.data.data.access_token) {
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async login(email: string, password: string) {
    console.log('Login service called with:', { email });
    
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      
      console.log('Login response received:', response.data);
      
      if (response.data.success && response.data.data.access_token) {
        console.log('Storing token and user...');
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('Token stored successfully');
      } else {
        console.warn('No access token in response');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login service error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    const response = await api.get<{ success: boolean; data: { user: User } }>('/auth/me');
    return response.data.data.user;
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};