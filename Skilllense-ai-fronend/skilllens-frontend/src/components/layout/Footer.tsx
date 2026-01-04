import React from 'react';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-100 border-t border-dark-200 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-primary-500 mb-4">
              <Brain className="w-8 h-8" />
              <span>SkillLens</span>
            </div>
            <p className="text-dark-500 text-sm">
              AI-powered resume analyzer helping you bridge skill gaps and advance your career.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-dark-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-dark-500 hover:text-primary-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/analysis" className="text-dark-500 hover:text-primary-500 transition-colors">
                  Analyze Resume
                </a>
              </li>
              <li>
                <a href="/history" className="text-dark-500 hover:text-primary-500 transition-colors">
                  History
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-dark-700 mb-4">Connect</h3>
            <div className="flex gap-4">
  <a
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-dark-500 hover:text-primary-500 transition-colors"
  >
    <Github className="w-6 h-6" />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-dark-500 hover:text-primary-500 transition-colors"
  >
    <Linkedin className="w-6 h-6" />
  </a>

  <a
    href="mailto:support@skilllens.com"
    className="text-dark-500 hover:text-primary-500 transition-colors"
  >
    <Mail className="w-6 h-6" />
  </a>
</div>

          </div>
        </div>

        <div className="border-t border-dark-200 mt-8 pt-6 text-center text-sm text-dark-500">
          <p>&copy; {new Date().getFullYear()} SkillLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};