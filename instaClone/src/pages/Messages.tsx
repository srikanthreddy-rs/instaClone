
import React, { useState } from 'react';
import { Send, Search, Phone, Video, Info, Smile, Image, Heart } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Header from '../components/Header';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      user: { username: 'sarah_wilson', fullName: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c' },
      lastMessage: 'Thanks for the amazing photos!',
      timestamp: '2m',
      unread: 2,
      online: true
    },
    {
      id: 2,
      user: { username: 'mike_photo', fullName: 'Mike Photography', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      lastMessage: 'Can you share the location?',
      timestamp: '1h',
      unread: 0,
      online: false
    },
    {
      id: 3,
      user: { username: 'emma_travels', fullName: 'Emma Travels', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
      lastMessage: 'Love your travel content! 🌍',
      timestamp: '3h',
      unread: 1,
      online: true
    },
    {
      id: 4,
      user: { username: 'alex_dev', fullName: 'Alex Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
      lastMessage: 'Great shot! What camera did you use?',
      timestamp: '1d',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: 'Hey! I saw your latest post, it\'s amazing! 📸',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      text: 'Thank you so much! I really appreciate it 😊',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      senderId: 1,
      text: 'Where was this taken? The lighting is perfect!',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'me',
      text: 'It was at Yosemite National Park during golden hour',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 5,
      senderId: 1,
      text: 'Thanks for the amazing photos!',
      timestamp: '10:36 AM',
      type: 'text'
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-140px)]">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.user.avatar}
                          alt={conversation.user.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{conversation.user.fullName}</p>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.user.avatar}
                          alt={selectedConversation.user.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.user.fullName}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.online ? 'Active now' : 'Last seen 2h ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === 'me'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Image className="h-5 w-5" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Message..."
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Send className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Messages</h3>
                    <p className="text-gray-600">Send private photos and messages to a friend or group.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
