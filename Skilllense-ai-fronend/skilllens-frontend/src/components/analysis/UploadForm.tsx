import React, { useState } from 'react';
import { Upload, FileText, Briefcase } from 'lucide-react';
import { Button } from '../common/Button';
import { analysisService } from '../../services/analysis.service';
import type { AnalysisResult } from '../../types/index';
import toast from 'react-hot-toast';

interface UploadFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onAnalysisComplete }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setLoading(true);

    try {
      const response = await analysisService.analyzeResume(resumeFile, jobDescription);
      
      if (response.success) {
        toast.success('Analysis completed successfully!');
        onAnalysisComplete(response.data);
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Upload Resume
        </label>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-500/5'
              : 'border-dark-300 hover:border-primary-400'
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {resumeFile ? (
            <div className="space-y-2">
              <FileText className="w-12 h-12 mx-auto text-primary-500" />
              <p className="text-dark-700 font-medium">{resumeFile.name}</p>
              <p className="text-sm text-dark-500">
                {(resumeFile.size / 1024).toFixed(2)} KB
              </p>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 mx-auto text-dark-400" />
              <p className="text-dark-600">
                Drag and drop your resume here, or{' '}
                <label htmlFor="resume-upload" className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                  browse
                </label>
              </p>
              <p className="text-sm text-dark-500">PDF or DOCX (Max 10MB)</p>
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="input-field min-h-[200px] resize-y"
          placeholder="Paste the job description here...

Example:
We are looking for a Senior Software Engineer with:
- 5+ years of experience in Python
- Strong knowledge of React and Node.js
- Experience with AWS and Docker
- Understanding of machine learning concepts"
          required
        />
        <p className="text-sm text-dark-500 mt-2">
          {jobDescription.length} characters
        </p>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </Button>
    </form>
  );
};