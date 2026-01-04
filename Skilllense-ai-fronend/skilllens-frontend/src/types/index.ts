export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    session: {
      access_token: string;
      refresh_token: string;
    };
    access_token?: string;
  };
}

export interface AnalysisResult {
  resume_skills: string[];
  job_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  match_percentage: number;
  similarity_score: number;
  recommendations: Recommendation[];
  analysis_summary: {
    total_job_skills: number;
    total_resume_skills: number;
    matched_count: number;
    missing_count: number;
  };
  analysis_id?: string;
}

export interface Recommendation {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  courses: Course[];
}

export interface Course {
  name: string;
  platform: string;
  url: string;
}

export interface AnalysisHistory {
  id: string;
  user_id: string;
  job_description: string;
  resume_skills: string[];
  job_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  match_percentage: number;
  similarity_score: number;
  recommendations: Recommendation[];
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}