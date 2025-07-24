
import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Eye, 
  Shield, 
  Heart, 
  MessageCircle, 
  Download, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Smartphone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: currentUser.fullName,
    username: currentUser.username,
    email: 'john.doe@example.com',
    bio: currentUser.bio || '',
    website: '',
    phone: ''
  });

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: 'edit-profile', icon: User, label: 'Edit profile', description: 'Change your profile information' },
        { id: 'account-privacy', icon: Lock, label: 'Account privacy', description: 'Manage your account privacy' },
        { id: 'close-friends', icon: Heart, label: 'Close friends', description: 'Share with close friends only' }
      ]
    },
    {
      title: 'How others can interact with you',
      items: [
        { id: 'comments', icon: MessageCircle, label: 'Comments', description: 'Control who can comment' },
        { id: 'mentions', icon: Bell, label: 'Mentions and tags', description: 'Control mentions and tags' },
        { id: 'story-sharing', icon: Eye, label: 'Story sharing', description: 'Control story interactions' }
      ]
    },
    {
      title: 'What you see',
      items: [
        { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Push, SMS, and email notifications' },
        { id: 'theme', icon: Moon, label: 'Theme', description: 'Switch between light and dark mode' },
        { id: 'language', icon: Globe, label: 'Language', description: 'Change your language' }
      ]
    },
    {
      title: 'Your app and media',
      items: [
        { id: 'device-permissions', icon: Smartphone, label: 'Device permissions', description: 'Camera, photos, etc.' },
        { id: 'cellular-data', icon: Download, label: 'Cellular data use', description: 'Control data usage' },
        { id: 'original-photos', icon: Download, label: 'Original photos', description: 'Save original photos' }
      ]
    },
    {
      title: 'For professionals',
      items: [
        { id: 'account-type', icon: Shield, label: 'Account type and tools', description: 'Switch to professional account' }
      ]
    },
    {
      title: 'More info and support',
      items: [
        { id: 'help', icon: HelpCircle, label: 'Help', description: 'Get help and support' },
        { id: 'about', icon: Shield, label: 'About', description: 'App info and policies' }
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log('Saving profile:', formData);
    setActiveSection(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {activeSection === 'edit-profile' ? (
          // Edit Profile Form
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={() => setActiveSection(null)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                    Change photo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleSaveProfile} className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveSection(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Settings Menu
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            {settingsGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {group.title && (
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-medium text-gray-900">{group.title}</h3>
                  </div>
                )}
                
                <div className="divide-y divide-gray-100">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full p-4 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
