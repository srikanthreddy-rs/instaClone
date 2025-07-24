
import React from 'react';
import { CheckCircle, UserPlus, UserCheck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

interface UserSearchItemProps {
  user: {
    id: number;
    username: string;
    fullName: string;
    avatar: string;
    followers: number;
    isVerified?: boolean;
    isFollowing?: boolean;
  };
}

const UserSearchItem: React.FC<UserSearchItemProps> = ({ user }) => {
  const { toggleFollow } = useApp();

  const handleFollowToggle = () => {
    toggleFollow(user.id);
    toast.success(
      user.isFollowing 
        ? `Unfollowed ${user.username}` 
        : `Following ${user.username}`
    );
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-medium text-sm">{user.username}</span>
            {user.isVerified && (
              <CheckCircle className="h-4 w-4 text-blue-500" />
            )}
          </div>
          <p className="text-gray-600 text-sm">{user.fullName}</p>
          <p className="text-gray-500 text-xs">{user.followers.toLocaleString()} followers</p>
        </div>
      </div>
      <button
        onClick={handleFollowToggle}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
          user.isFollowing
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {user.isFollowing ? (
          <>
            <UserCheck className="h-4 w-4" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            <span>Follow</span>
          </>
        )}
      </button>
    </div>
  );
};

export default UserSearchItem;
