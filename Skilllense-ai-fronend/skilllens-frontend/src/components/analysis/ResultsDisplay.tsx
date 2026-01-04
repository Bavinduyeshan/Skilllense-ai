import React from 'react';
import type { AnalysisResult } from '../../types/index';
import { CheckCircle, XCircle, TrendingUp, Award, BookOpen } from 'lucide-react';
import { SkillChart } from './SkillChart';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      default:
        return 'text-dark-500 bg-dark-100 border-dark-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Match Score Card */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm mb-1">Overall Match Score</p>
            <h2 className="text-5xl font-bold">{result.match_percentage.toFixed(1)}%</h2>
            <p className="text-primary-200 text-sm mt-2">
              Similarity Score: {(result.similarity_score * 100).toFixed(1)}%
            </p>
          </div>
          <Award className="w-24 h-24 text-primary-300 opacity-50" />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 mx-auto text-primary-500 mb-2" />
          <p className="text-2xl font-bold text-dark-800">
            {result.analysis_summary.total_job_skills}
          </p>
          <p className="text-sm text-dark-500">Required Skills</p>
        </div>

        <div className="card text-center">
          <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p className="text-2xl font-bold text-dark-800">
            {result.analysis_summary.matched_count}
          </p>
          <p className="text-sm text-dark-500">Matched Skills</p>
        </div>

        <div className="card text-center">
          <XCircle className="w-8 h-8 mx-auto text-red-500 mb-2" />
          <p className="text-2xl font-bold text-dark-800">
            {result.analysis_summary.missing_count}
          </p>
          <p className="text-sm text-dark-500">Missing Skills</p>
        </div>

        <div className="card text-center">
          <BookOpen className="w-8 h-8 mx-auto text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-dark-800">
            {result.analysis_summary.total_resume_skills}
          </p>
          <p className="text-sm text-dark-500">Your Skills</p>
        </div>
      </div>

      {/* Skills Chart */}
      <div className="card">
        <h3 className="text-xl font-bold text-dark-800 mb-4">Skills Overview</h3>
        <SkillChart result={result} />
      </div>

      {/* Matched Skills */}
      {result.matched_skills.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-dark-800">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matched_skills.map((skill, index) => (
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
      {result.missing_skills.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-dark-800">Skills to Develop</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.map((skill, index) => (
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

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-bold text-dark-800">Learning Recommendations</h3>
          </div>
          
          <div className="space-y-4">
            {result.recommendations.map((rec, recIndex) => (
              <div
                key={recIndex}
                className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{rec.skill}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-medium uppercase">
                    {rec.priority} Priority
                  </span>
                </div>

                {rec.courses && rec.courses.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-dark-600 mb-2">
                      Recommended Courses:
                    </p>
                   {rec.courses.map((course, courseIdx) => (
  <a
    key={courseIdx}
    href={course.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-3 bg-dark-50 hover:bg-dark-100 rounded-lg transition-colors group"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-dark-800 group-hover:text-primary-600 transition-colors">
          {course.name}
        </p>
        <p className="text-sm text-dark-500">{course.platform}</p>
      </div>
      <TrendingUp className="w-5 h-5 text-dark-400 group-hover:text-primary-500 transition-colors" />
    </div>
  </a>
))}

                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};