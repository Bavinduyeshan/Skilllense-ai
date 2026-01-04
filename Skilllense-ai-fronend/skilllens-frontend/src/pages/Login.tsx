import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginForm } from '../components/auth/LoginForm';
import { Brain } from 'lucide-react';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-dark-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-full mb-4">
              <Brain className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-dark-800 mb-2">
              Welcome Back to SkillLens
            </h1>
            <p className="text-dark-500">
              Continue your journey to career success
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};