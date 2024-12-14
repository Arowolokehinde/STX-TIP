import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">TipStack</h3>
            <p className="text-gray-400">
              Secure, instant tipping on the Stacks blockchain
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/tipstack" className="hover:text-violet-400 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="https://github.com/tipstack" className="hover:text-violet-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#send-tip" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Send Tips
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-violet-400 transition-colors">
                </a>
                </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-violet-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TipStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};