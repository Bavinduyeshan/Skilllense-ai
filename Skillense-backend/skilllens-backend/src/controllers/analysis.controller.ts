import { Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { supabase } from '../config/supabase.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

const PYTHON_AI_URL = process.env.PYTHON_AI_URL || 'http://127.0.0.1:8000';

interface AnalysisResult {
  resume_skills: string[];
  job_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  match_percentage: number;
  similarity_score: number;
  recommendations: any[];
  analysis_summary: {
    total_job_skills: number;
    total_resume_skills: number;
    matched_count: number;
    missing_count: number;
  };
}

export async function analyzeResume(req: AuthRequest, res: Response): Promise<void> {
  let filePath: string | undefined;

  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Resume file is required',
        error: 'NO_FILE_UPLOADED'
      });
      return;
    }

    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length === 0) {
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(400).json({
        success: false,
        message: 'Job description is required',
        error: 'NO_JOB_DESCRIPTION'
      });
      return;
    }

    filePath = req.file.path;

    console.log('📄 Analyzing resume:', req.file.originalname);
    console.log('🔗 Calling AI service at:', PYTHON_AI_URL);

    const formData = new FormData();
    formData.append('resume', fs.createReadStream(filePath), {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    formData.append('job_description', jobDescription);

    const aiResponse = await axios.post<{ success: boolean; data: AnalysisResult }>(
      `${PYTHON_AI_URL}/analyze`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      }
    );

    if (!aiResponse.data || !aiResponse.data.data) {
      throw new Error('Invalid response from AI service');
    }

    const analysisResult = aiResponse.data.data;

    console.log('✅ Analysis completed successfully');

    let savedAnalysisId: string | null = null;

    if (req.user) {
      try {
        const { data: savedData, error: dbError } = await supabase
          .from('analysis_results')
          .insert({
            user_id: req.user.id,
            job_description: jobDescription,
            resume_skills: analysisResult.resume_skills,
            job_skills: analysisResult.job_skills,
            matched_skills: analysisResult.matched_skills,
            missing_skills: analysisResult.missing_skills,
            match_percentage: analysisResult.match_percentage,
            similarity_score: analysisResult.similarity_score,
            recommendations: analysisResult.recommendations
          })
          .select('id')
          .single();

        if (dbError) {
          console.error('⚠️  Database save error:', dbError);
        } else if (savedData) {
          savedAnalysisId = savedData.id;
          console.log('💾 Analysis saved to database');
        }
      } catch (dbError) {
        console.error('⚠️  Database operation failed:', dbError);
      }
    }

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️  Temporary file cleaned up');
    }

    res.status(200).json({
      success: true,
      message: 'Analysis completed successfully',
      data: {
        ...analysisResult,
        analysis_id: savedAnalysisId
      }
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);

    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }

    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.detail || error.message;

      res.status(statusCode).json({
        success: false,
        message: 'AI service error',
        error: errorMessage,
        details: error.response?.data
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getAnalysisHistory(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'UNAUTHORIZED'
      });
      return;
    }

    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Database fetch error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch analysis history',
        error: error.message
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Analysis history retrieved successfully',
      data: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analysis history',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getAnalysisById(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Analysis ID is required'
      });
      return;
    }

    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      res.status(404).json({
        success: false,
        message: 'Analysis not found',
        error: error.message
      });
      return;
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analysis',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function deleteAnalysis(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    const { id } = req.params;

    const { error } = await supabase
      .from('analysis_results')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete analysis',
        error: error.message
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully'
    });

  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete analysis',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}