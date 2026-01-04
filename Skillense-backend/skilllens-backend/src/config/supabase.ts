import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found in .env file');
  console.warn('⚠️  Database features will not work until configured');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Database schema types (will be generated from Supabase later)
export interface Database {
  public: {
    Tables: {
      analysis_results: {
        Row: {
          id: string;
          user_id: string;
          job_description: string;
          resume_skills: string[];
          job_skills: string[];
          matched_skills: string[];
          missing_skills: string[];
          match_percentage: number;
          similarity_score: number;
          recommendations: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          job_description: string;
          resume_skills: string[];
          job_skills: string[];
          matched_skills: string[];
          missing_skills: string[];
          match_percentage: number;
          similarity_score: number;
          recommendations: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          job_description?: string;
          resume_skills?: string[];
          job_skills?: string[];
          matched_skills?: string[];
          missing_skills?: string[];
          match_percentage?: number;
          similarity_score?: number;
          recommendations?: any;
          created_at?: string;
        };
      };
    };
  };
}