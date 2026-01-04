import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Loading } from '../components/common/Loading';
import { analysisService } from '../services/analysis.service';
import type { AnalysisHistory } from '../types';
import { History as HistoryIcon, Calendar, TrendingUp, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export const History: React.FC = () => {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisHistory | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await analysisService.getHistory();
      if (response.success) {
        setHistory(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch history:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to view history');
        navigate('/login');
      } else {
        toast.error('Failed to load history');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this analysis?')) return;

    try {
      await analysisService.deleteAnalysis(id);
      toast.success('Analysis deleted successfully');
      setHistory(history.filter(item => item.id !== id));
      if (selectedAnalysis?.id === id) setSelectedAnalysis(null);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete analysis');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loading text="Loading history..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-dark-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <HistoryIcon className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-800">Analysis History</h1>
                <p className="text-dark-500">Review your previous resume analyses</p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="card text-center py-12">
              <HistoryIcon className="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-700 mb-2">No Analysis History</h3>
              <p className="text-dark-500 mb-6">Start analyzing resumes to build your history</p>
              <button onClick={() => navigate('/analysis')} className="btn-primary">
                Start New Analysis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* History List */}
              <div className="lg:col-span-1 space-y-4">
                {history.map(item => (
                  <div
                    key={item.id}
                    className={`card cursor-pointer transition-all ${
                      selectedAnalysis?.id === item.id
                        ? 'ring-2 ring-primary-500 bg-primary-500/5'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedAnalysis(item)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-dark-400" />
                          <span className="text-xs text-dark-500">{formatDate(item.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary-500" />
                          <span className="text-2xl font-bold text-dark-800">{item.match_percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-dark-600 line-clamp-2">{item.job_description.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>

              {/* Analysis Details */}
              <div className="lg:col-span-2">
                {selectedAnalysis ? (
                  <div className="card space-y-6">
                    {/* Match Score */}
                    <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary-100 text-sm mb-1">Match Score</p>
                          <h3 className="text-5xl font-bold">{selectedAnalysis.match_percentage.toFixed(1)}%</h3>
                          <p className="text-primary-200 text-sm mt-2">
                            Similarity: {(selectedAnalysis.similarity_score * 100).toFixed(1)}%
                          </p>
                        </div>
                        <TrendingUp className="w-16 h-16 text-primary-300 opacity-50" />
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-dark-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-dark-500 mb-1">Total Skills</p>
                        <p className="text-2xl font-bold text-dark-800">{selectedAnalysis.resume_skills.length}</p>
                      </div>
                      <div className="bg-dark-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-dark-500 mb-1">Required</p>
                        <p className="text-2xl font-bold text-dark-800">{selectedAnalysis.job_skills.length}</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg text-center">
                        <p className="text-sm text-green-600 mb-1">Matched</p>
                        <p className="text-2xl font-bold text-green-600">{selectedAnalysis.matched_skills.length}</p>
                      </div>
                      <div className="bg-red-500/10 p-4 rounded-lg text-center">
                        <p className="text-sm text-red-600 mb-1">Missing</p>
                        <p className="text-2xl font-bold text-red-600">{selectedAnalysis.missing_skills.length}</p>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-dark-800 mb-3">Job Description</h3>
                      <div className="bg-dark-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                        <p className="text-dark-600 whitespace-pre-wrap text-sm">{selectedAnalysis.job_description}</p>
                      </div>
                    </div>

                    {/* Matched Skills */}
                    {selectedAnalysis.matched_skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-dark-800 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Matched Skills ({selectedAnalysis.matched_skills.length})
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedAnalysis.matched_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Skills */}
                    {selectedAnalysis.missing_skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-dark-800 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Missing Skills ({selectedAnalysis.missing_skills.length})
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedAnalysis.missing_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-red-500/10 text-red-600 border border-red-500/20 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="card text-center py-16">
                    <Eye className="w-16 h-16 text-dark-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-dark-700 mb-2">Select an Analysis</h3>
                    <p className="text-dark-500">Click on any analysis from the list to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
