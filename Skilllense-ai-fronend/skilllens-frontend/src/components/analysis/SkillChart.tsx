import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AnalysisResult } from '../../types/index';

interface SkillChartProps {
  result: AnalysisResult;
}

export const SkillChart: React.FC<SkillChartProps> = ({ result }) => {
  const data = [
    {
      name: 'Skills Analysis',
      'Required Skills': result.analysis_summary.total_job_skills,
      'Your Skills': result.analysis_summary.total_resume_skills,
      'Matched': result.analysis_summary.matched_count,
      'Missing': result.analysis_summary.missing_count,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis dataKey="name" stroke="#a1a1aa" />
        <YAxis stroke="#a1a1aa" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#27272a',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            color: '#fafafa',
          }}
        />
        <Legend />
        <Bar dataKey="Required Skills" fill="#0ea5e9" />
        <Bar dataKey="Your Skills" fill="#8b5cf6" />
        <Bar dataKey="Matched" fill="#22c55e" />
        <Bar dataKey="Missing" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};