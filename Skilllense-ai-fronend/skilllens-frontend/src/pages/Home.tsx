import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Target, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Resume Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bridge Your Skill Gap with
              <span className="block text-primary-200">AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Upload your resume, paste a job description, and get instant AI-powered insights on skill matches, 
              gaps, and personalized learning recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/analysis"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">
              Why Choose SkillLens?
            </h2>
            <p className="text-dark-500 text-lg max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive resume analysis to help you land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">
                AI-Powered Analysis
              </h3>
              <p className="text-dark-500">
                Advanced natural language processing to accurately match your skills with job requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">
                Skill Gap Detection
              </h3>
              <p className="text-dark-500">
                Identify exactly which skills you need to develop to become the perfect candidate.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">
                Learning Recommendations
              </h3>
              <p className="text-dark-500">
                Get personalized course recommendations from top platforms to upskill efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">
              How It Works
            </h2>
            <p className="text-dark-500 text-lg">
              Get insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-2">
                Upload Resume
              </h3>
              <p className="text-dark-500">
                Upload your resume in PDF or DOCX format
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-2">
                Add Job Description
              </h3>
              <p className="text-dark-500">
                Paste the job description you're interested in
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-2">
                Get Insights
              </h3>
              <p className="text-dark-500">
                Receive detailed analysis and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-dark-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-dark-800 mb-12 text-center">
              What You'll Get
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">
                    Detailed Skill Match Analysis
                  </h3>
                  <p className="text-dark-500">
                    See exactly which of your skills align with the job requirements and your overall match percentage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">
                    Priority-Based Skill Gaps
                  </h3>
                  <p className="text-dark-500">
                    Identify missing skills categorized by priority so you know what to focus on first.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">
                    Curated Learning Resources
                  </h3>
                  <p className="text-dark-500">
                    Get personalized course recommendations from platforms like Coursera, Udemy, and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">
                    Analysis History
                  </h3>
                  <p className="text-dark-500">
                    Track your progress over time and revisit previous analyses anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes with SkillLens
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl"
          >
            Start Free Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};