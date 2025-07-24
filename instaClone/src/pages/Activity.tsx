
import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Camera, Clock } from 'lucide-react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';

const Activity = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'following' | 'you'>('you');

  const activities = [
    {
      id: 1,
      type: 'like',
      user: { username: 'sarah_wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c' },
      action: 'liked your photo',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      timestamp: '2h'
    },
    {
      id: 2,
      type: 'comment',
      user: { username: 'mike_photo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      action: 'commented: "Amazing shot! 📸"',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      timestamp: '4h'
    },
    {
      id: 3,
      type: 'follow',
      user: { username: 'emma_travels', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
      action: 'started following you',
      timestamp: '1d'
    },
    {
      id: 4,
      type: 'mention',
      user: { username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
      action: 'mentioned you in a comment',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      timestamp: '2d'
    },
    {
      id: 5,
      type: 'like',
      user: { username: 'photo_enthusiast', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
      action: 'liked your photo',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e',
      timestamp: '3d'
    }
  ];

  const followingActivities = [
    {
      id: 6,
      type: 'post',
      user: { username: 'sarah_wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c' },
      action: 'shared a new post',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      timestamp: '1h'
    },
    {
      id: 7,
      type: 'like',
      user: { username: 'mike_photo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      action: 'liked a photo by @nature_lover',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      timestamp: '3h'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="h-8 w-8 text-red-500 fill-current" />;
      case 'comment': return <MessageCircle className="h-8 w-8 text-blue-500" />;
      case 'follow': return <UserPlus className="h-8 w-8 text-green-500" />;
      case 'mention': return <AtSign className="h-8 w-8 text-purple-500" />;
      case 'post': return <Camera className="h-8 w-8 text-gray-600" />;
      default: return <Heart className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'following'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab('you')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'you'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              You
            </button>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {(activeTab === 'you' ? activities : followingActivities).map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  {getIcon(activity.type)}
                </div>

                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user.username}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>

                {/* Post Image */}
                {activity.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={activity.image}
                      alt="Post"
                      className="w-10 h-10 rounded object-cover"
                    />
                  </div>
                )}

                {/* Follow Button */}
                {activity.type === 'follow' && (
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(activeTab === 'you' ? activities : followingActivities).length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
            <p className="text-gray-600">When people interact with your posts, you'll see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
