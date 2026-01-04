import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UploadForm } from '../components/analysis/UploadForm';
import { ResultsDisplay } from '../components/analysis/ResultsDisplay';
import type{ AnalysisResult } from '../types/index';
import { Brain, ArrowLeft } from 'lucide-react';

export const Analysis: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-dark-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-800">
                  Resume Analysis
                </h1>
                <p className="text-dark-500">
                  Upload your resume and job description to get started
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {!analysisResult ? (
            <div className="card max-w-3xl mx-auto">
              <UploadForm onAnalysisComplete={setAnalysisResult} />
            </div>
          ) : (
            <div>
              <button
                onClick={handleNewAnalysis}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                New Analysis
              </button>
              <ResultsDisplay result={analysisResult} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};