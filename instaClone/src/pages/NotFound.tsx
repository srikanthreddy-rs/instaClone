
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <Camera className="h-20 w-20 text-white mx-auto mb-4 opacity-50" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
          <p className="text-white/80 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          
          <div className="block">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-white border border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
