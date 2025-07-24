
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

interface UserPostItemProps {
  post: {
    id: number;
    username: string;
    userAvatar: string;
    image: string;
    caption: string;
    location?: string;
    likes: number;
    comments: { id: number; username: string; text: string; timeAgo: string; }[];
    timestamp: string;
    aiTags?: string[];
    aiScore?: number;
    isLiked?: boolean;
    isSaved?: boolean;
  };
}

const UserPostItem: React.FC<UserPostItemProps> = ({ post }) => {
  const { toggleLike, toggleSave, addComment } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    toggleLike(post.id);
    if (!post.isLiked) {
      toast.success(`Liked ${post.username}'s post!`);
    }
  };

  const handleSave = () => {
    toggleSave(post.id);
    toast.success(post.isSaved ? 'Removed from saved' : 'Saved to collection');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment.trim());
      setNewComment('');
      toast.success('Comment added!');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-sm">{post.username}</span>
          {post.aiScore && post.aiScore > 8 && (
            <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Recommended
            </div>
          )}
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img src={post.image} alt="Post" className="w-full aspect-square object-cover" />
        {post.aiTags && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {post.aiTags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`transition-colors hover:scale-110 transform duration-200 ${
                post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-6 w-6 ${post.isLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-gray-600 hover:text-gray-800 hover:scale-110 transform transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-800 hover:scale-110 transform transition-all duration-200"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className={`transition-colors hover:scale-110 transform duration-200 ${
              post.isSaved ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Bookmark className={`h-6 w-6 ${post.isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-medium text-sm">{post.likes.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-gray-500 text-sm mb-2 hover:text-gray-700 transition-colors"
          >
            {showComments ? 'Hide' : 'View all'} {post.comments.length} comments
          </button>
        )}

        {/* Comments List */}
        {showComments && (
          <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <span className="font-medium text-sm">{comment.username}</span>
                <span className="text-sm flex-1">{comment.text}</span>
                <span className="text-xs text-gray-400">{comment.timeAgo}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        {showComments && (
          <form onSubmit={handleAddComment} className="flex items-center space-x-3 border-t pt-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="text-blue-500 font-medium text-sm hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </button>
          </form>
        )}

        {/* Time */}
        <div className="text-gray-400 text-xs uppercase mt-2">
          {post.timestamp}
        </div>
      </div>
    </div>
  );
};

export default UserPostItem;
