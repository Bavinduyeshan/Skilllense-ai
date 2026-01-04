import axios from 'axios';
import type { AnalysisResult, AnalysisHistory, ApiResponse } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const analysisService = {
  async analyzeResume(resumeFile: File, jobDescription: string) {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {
      'Content-Type': 'multipart/form-data',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post<ApiResponse<AnalysisResult>>(
      `${API_BASE_URL}/analysis/analyze`,
      formData,
      { headers }
    );

    return response.data;
  },

  async getHistory() {
    const token = localStorage.getItem('access_token');
    
    const response = await axios.get<ApiResponse<AnalysisHistory[]>>(
      `${API_BASE_URL}/analysis/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  async getAnalysisById(id: string) {
    const token = localStorage.getItem('access_token');
    
    const response = await axios.get<ApiResponse<AnalysisHistory>>(
      `${API_BASE_URL}/analysis/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  async deleteAnalysis(id: string) {
    const token = localStorage.getItem('access_token');
    
    const response = await axios.delete<ApiResponse<null>>(
      `${API_BASE_URL}/analysis/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};