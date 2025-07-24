import React, { useState } from 'react';
import { Grid, Bookmark, Tag, Settings, Sparkles } from 'lucide-react';

interface UserProfileProps {
  user: {
    username: string;
    fullName: string;
    avatar: string;
    bio?: string;
    posts: number;
    followers: number;
    following: number;
    isVerified?: boolean;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('posts');

  const posts = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0">
          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
            <h1 className="text-2xl font-light">{user.username}</h1>
            <div className="flex justify-center md:justify-start space-x-2 mt-2 md:mt-0">
              <button className="bg-blue-500 text-white px-6 py-1.5 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Follow
              </button>
              <button className="border border-gray-300 px-6 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Message
              </button>
              <button className="border border-gray-300 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <span><strong>{user.posts}</strong> posts</span>
            <span><strong>{user.followers.toLocaleString()}</strong> followers</span>
            <span><strong>{user.following}</strong> following</span>
          </div>
          
          <div>
            <h2 className="font-medium">{user.fullName}</h2>
            {user.bio && <p className="text-gray-600">{user.bio}</p>}
            <div className="flex items-center justify-center md:justify-start mt-2 text-purple-600">
              <Sparkles className="h-4 w-4 mr-1" />
              <span className="text-sm">AI suggests: Photography enthusiast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center space-x-16">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-1 py-3 border-t-2 ${activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
          >
            <Grid className="h-3 w-3" />
            <span className="text-xs font-medium uppercase">Posts</span>
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-1 py-3 border-t-2 ${activeTab === 'saved' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
          >
            <Bookmark className="h-3 w-3" />
            <span className="text-xs font-medium uppercase">Saved</span>
          </button>
          <button 
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center space-x-1 py-3 border-t-2 ${activeTab === 'tagged' ? 'border-black text-black' : 'border-transparent text-gray-500'}`}
          >
            <Tag className="h-3 w-3" />
            <span className="text-xs font-medium uppercase">Tagged</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {posts.map((post, index) => (
          <div key={index} className="aspect-square overflow-hidden">
            <img src={post} alt={`Post ${index + 1}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
