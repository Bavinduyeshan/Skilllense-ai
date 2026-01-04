import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { Brain, History, TrendingUp, Award } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-dark-50 py-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-dark-800 mb-2">
              Welcome back, {user?.full_name || user?.email}!
            </h1>
            <p className="text-dark-500">
              Ready to analyze your resume and find your next opportunity?
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Analyze Resume Card */}
            <button
              onClick={() => navigate('/analysis')}
              className="card hover:shadow-xl transition-all text-left group"
            >
              <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Brain className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-2">
                New Analysis
              </h3>
              <p className="text-dark-500 mb-4">
                Upload your resume and get instant AI-powered insights
              </p>
              <span className="text-primary-600 font-medium group-hover:text-primary-700">
                Start Analyzing →
              </span>
            </button>

            {/* View History Card */}
            <button
              onClick={() => navigate('/history')}
              className="card hover:shadow-xl transition-all text-left group"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <History className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-2">
                Analysis History
              </h3>
              <p className="text-dark-500 mb-4">
                Review your previous resume analyses and track progress
              </p>
              <span className="text-blue-600 font-medium group-hover:text-blue-700">
                View History →
              </span>
            </button>

            {/* Stats Card */}
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Your Progress
              </h3>
              <p className="text-primary-100 mb-4">
                Keep analyzing to improve your job match score
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Track your growth</span>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="card">
            <h2 className="text-2xl font-bold text-dark-800 mb-6">
              What You Can Do
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-800 mb-1">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-sm text-dark-500">
                    Get detailed insights on skill matches and gaps using advanced AI
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-800 mb-1">
                    Learning Recommendations
                  </h3>
                  <p className="text-sm text-dark-500">
                    Receive personalized course suggestions to bridge skill gaps
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <History className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-800 mb-1">
                    Track Progress
                  </h3>
                  <p className="text-sm text-dark-500">
                    Save and review all your analyses to monitor improvement
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-800 mb-1">
                    Match Scoring
                  </h3>
                  <p className="text-sm text-dark-500">
                    See your compatibility percentage with any job posting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};