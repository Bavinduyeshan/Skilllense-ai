import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, User, History, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-dark-100 border-b border-dark-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-500 hover:text-primary-600 transition-colors">
            <Brain className="w-8 h-8" />
            <span>SkillLens</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-dark-600 hover:text-primary-500 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>

                <Link
                  to="/analysis"
                  className="flex items-center gap-2 text-dark-600 hover:text-primary-500 transition-colors"
                >
                  <Brain className="w-5 h-5" />
                  <span className="hidden sm:inline">Analyze</span>
                </Link>

                <Link
                  to="/history"
                  className="flex items-center gap-2 text-dark-600 hover:text-primary-500 transition-colors"
                >
                  <History className="w-5 h-5" />
                  <span className="hidden sm:inline">History</span>
                </Link>

                <div className="flex items-center gap-3 pl-6 border-l border-dark-300">
                  <div className="flex items-center gap-2 text-dark-600">
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline text-sm">{user?.email}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-dark-600 hover:text-primary-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};