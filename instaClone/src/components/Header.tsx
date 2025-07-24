import React, { useState, useRef, useEffect } from 'react';
import { Camera, Heart, MessageCircle, PlusSquare, Search, Home, User, X, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Header = () => {
  const location = useLocation();
  const { searchUsers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchUsers(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, searchUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Camera className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            InstaClone
          </span>
        </Link>
        
        {/* Search Bar */}
        <div className="hidden md:flex relative" ref={searchRef}>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search users, posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="ml-2 text-gray-500 hover:text-gray-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
              {searchResults.map((user) => (
                <Link
                  key={user.id}
                  to={user.id === 1 ? '/profile' : `/profile/${user.username}`}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-gray-600 text-xs">{user.fullName}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {showResults && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
              <p className="text-gray-500 text-sm text-center">No users found</p>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`p-2 rounded-lg transition-all duration-200 ${
              isActive('/') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <Home className="h-6 w-6" />
          </Link>
          <Link 
            to="/create" 
            className={`p-2 rounded-lg transition-all duration-200 ${
              isActive('/create') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <PlusSquare className="h-6 w-6" />
          </Link>
          <Link 
            to="/activity" 
            className={`p-2 rounded-lg transition-all duration-200 relative ${
              isActive('/activity') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <Heart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </Link>
          <Link 
            to="/messages" 
            className={`p-2 rounded-lg transition-all duration-200 relative ${
              isActive('/messages') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </Link>
          <Link 
            to="/profile" 
            className={`p-2 rounded-lg transition-all duration-200 ${
              isActive('/profile') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <User className="h-6 w-6" />
          </Link>
          <Link 
            to="/settings" 
            className={`p-2 rounded-lg transition-all duration-200 ${
              isActive('/settings') 
                ? 'text-pink-600 scale-110' 
                : 'text-gray-600 hover:text-pink-600 hover:scale-105'
            }`}
          >
            <Settings className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
