
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, Video, Smile, MapPin, Tag, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';

const Create = () => {
  const navigate = useNavigate();
  const { addPost } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedImage || !caption.trim()) return;
    
    setIsLoading(true);
    
    // Simulate post creation
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        username: 'john_doe',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        image: selectedImage,
        caption: caption,
        location: location || undefined,
        likes: 0,
        comments: [],
        timestamp: 'now',
        isLiked: false,
        isSaved: false,
        aiTags: ['#photography', '#beautiful'],
        aiScore: 0.92
      };
      
      addPost(newPost);
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Create new post</h1>
            <Button 
              onClick={handlePost} 
              disabled={!selectedImage || !caption.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? 'Posting...' : 'Share'}
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!selectedImage ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Select photos and videos</h3>
                  <p className="text-gray-600">Drag photos and videos here</p>
                </div>
                
                <Label htmlFor="image-upload">
                  <Button variant="default" className="cursor-pointer bg-blue-500 hover:bg-blue-600">
                    <Image className="h-4 w-4 mr-2" />
                    Select from computer
                  </Button>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-gray-700">
                        <Smile className="h-4 w-4" />
                        <span>Emoji</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-gray-700">
                        <Tag className="h-4 w-4" />
                        <span>Tag people</span>
                      </button>
                    </div>
                    <span>{caption.length}/2,200</span>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Add location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location..."
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">AI Suggestions</span>
                  </div>
                  <p className="text-sm text-purple-600">
                    Consider adding hashtags: #photography #nature #beautiful
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
