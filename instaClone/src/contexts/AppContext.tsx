import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  posts: number;
  followers: number;
  following: number;
  isVerified?: boolean;
  isFollowing?: boolean;
}

interface Post {
  id: number;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  location?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
  aiTags?: string[];
  aiScore?: number;
}

interface Comment {
  id: number;
  username: string;
  text: string;
  timeAgo: string;
}

interface Story {
  id: number;
  username: string;
  avatar: string;
  isOwn?: boolean;
  hasStory?: boolean;
}

interface AppContextType {
  currentUser: User;
  posts: Post[];
  stories: Story[];
  suggestedUsers: User[];
  updateCurrentUser: (user: Partial<User>) => void;
  toggleLike: (postId: number) => void;
  toggleSave: (postId: number) => void;
  addComment: (postId: number, text: string) => void;
  toggleFollow: (userId: number) => void;
  addStory: (image: string) => void;
  searchUsers: (query: string) => User[];
  addPost: (post: Post) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    username: 'srikanth',
    fullName: 'T.Srikanth Reddy',
    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw1cbgg1MnkvRJYa8KGCcgLX&ust=1753252984782000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLj23rzuz44DFQAAAAAdAAAAABAL',
    bio: 'Photography enthusiast 📸 | Travel lover ✈️ | Coffee addict ☕️',
    posts: 127,
    followers: 2543,
    following: 892,
    isVerified: false
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'nature_explorer',
      userAvatar: '/placeholder.svg',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      caption: 'Beautiful mountain lake at sunset 🌅 #nature #photography',
      likes: 1543,
      comments: [
        { id: 1, username: 'photo_lover', text: 'Amazing shot! 📸', timeAgo: '2h' },
        { id: 2, username: 'wanderlust_soul', text: 'Where is this place?', timeAgo: '1h' }
      ],
      timestamp: '2 hours ago',
      aiTags: ['nature', 'landscape', 'sunset'],
      aiScore: 9.2,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      username: 'coffee_lover',
      userAvatar: '/placeholder.svg',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      caption: 'Perfect latte art to start the day ☕️ #coffee #morning',
      likes: 892,
      comments: [
        { id: 1, username: 'barista_pro', text: 'Beautiful rosetta! ☕', timeAgo: '3h' }
      ],
      timestamp: '4 hours ago',
      aiTags: ['coffee', 'food', 'morning'],
      aiScore: 7.8,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      username: 'tech_enthusiast',
      userAvatar: '/placeholder.svg',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      caption: 'New workspace setup complete! 💻 #workspace #tech #productivity',
      likes: 2156,
      comments: [],
      timestamp: '6 hours ago',
      aiTags: ['technology', 'workspace', 'productivity'],
      aiScore: 8.5,
      isLiked: false,
      isSaved: false
    }
  ]);

  const [stories, setStories] = useState<Story[]>([
    { id: 1, username: 'Your Story', avatar: '/placeholder.svg', isOwn: true, hasStory: false },
    { id: 2, username: 'alice_wonder', avatar: '/placeholder.svg', hasStory: true },
    { id: 3, username: 'bob_creator', avatar: '/placeholder.svg', hasStory: true },
    { id: 4, username: 'emma_art', avatar: '/placeholder.svg', hasStory: true },
    { id: 5, username: 'david_photo', avatar: '/placeholder.svg', hasStory: true },
    { id: 6, username: 'sarah_travel', avatar: '/placeholder.svg', hasStory: true }
  ]);

  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([
    {
      id: 2,
      username: 'ai_artist',
      fullName: 'AI Creative Studio',
      avatar: '/placeholder.svg',
      followers: 45000,
      following: 1200,
      posts: 340,
      isFollowing: false
    },
    {
      id: 3,
      username: 'photo_wizard',
      fullName: 'Photography Master',
      avatar: '/placeholder.svg',
      followers: 23000,
      following: 890,
      posts: 156,
      isVerified: true,
      isFollowing: false
    }
  ]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('instagram_posts');
    const savedUser = localStorage.getItem('instagram_user');
    const savedUsers = localStorage.getItem('instagram_users');

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedUsers) {
      setSuggestedUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('instagram_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('instagram_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('instagram_users', JSON.stringify(suggestedUsers));
  }, [suggestedUsers]);

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const toggleLike = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const toggleSave = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  const addComment = (postId: number, text: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          username: currentUser.username,
          text,
          timeAgo: 'now'
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const toggleFollow = (userId: number) => {
    setSuggestedUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const newIsFollowing = !user.isFollowing;
        return {
          ...user,
          isFollowing: newIsFollowing,
          followers: newIsFollowing ? user.followers + 1 : user.followers - 1
        };
      }
      return user;
    }));
  };

  const addStory = (image: string) => {
    setStories(prev => prev.map(story => 
      story.isOwn ? { ...story, hasStory: true } : story
    ));
  };

  const searchUsers = (query: string): User[] => {
    if (!query.trim()) return [];
    
    const allUsers = [currentUser, ...suggestedUsers];
    return allUsers.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.fullName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
    setCurrentUser(prev => ({ ...prev, posts: prev.posts + 1 }));
  };

  const logout = () => {
    localStorage.removeItem('instagram_posts');
    localStorage.removeItem('instagram_user');
    localStorage.removeItem('instagram_users');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      posts,
      stories,
      suggestedUsers,
      updateCurrentUser,
      toggleLike,
      toggleSave,
      addComment,
      toggleFollow,
      addStory,
      searchUsers,
      addPost,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
