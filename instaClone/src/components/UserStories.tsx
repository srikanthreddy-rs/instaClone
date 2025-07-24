
import React, { useRef } from 'react';
import { Plus, Camera } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

const UserStories = () => {
  const { stories, addStory } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddStory = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate story upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        addStory(imageUrl);
        toast.success('Story added successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryClick = (story: any) => {
    if (story.isOwn && !story.hasStory) {
      handleAddStory();
    } else if (story.hasStory) {
      toast.info(`Viewing ${story.username}'s story`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 cursor-pointer group"
            onClick={() => handleStoryClick(story)}
          >
            <div className={`relative transition-transform group-hover:scale-105 ${
              story.isOwn ? '' : story.hasStory ? 'p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full' : 'p-0.5 bg-gray-300 rounded-full'
            }`}>
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-0.5">
                <img 
                  src={story.avatar} 
                  alt={story.username}
                  className="w-full h-full rounded-full object-cover"
                />
                {story.isOwn && !story.hasStory && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                )}
                {story.isOwn && story.hasStory && (
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                    <Camera className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-600 text-center truncate w-16">
              {story.username}
            </span>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default UserStories;
