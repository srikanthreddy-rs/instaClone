import Header from '../components/Header';
import UserStories from '../components/UserStories';
import UserPost from '../components/UserPost';
import UserSearchItem from '../components/UserSearchItem';
import { Sparkles, TrendingUp, Zap, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Home = () => {
  const { suggestedUsers, currentUser, posts } = useApp();

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const avgEngagement = ((totalLikes / posts.length) / 1000).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <UserStories />
            <UserPost />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* User Quick Info */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={currentUser.avatar} alt={currentUser.username} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{currentUser.username}</p>
                    <p className="text-gray-600 text-sm">{currentUser.fullName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <p className="font-bold text-lg">{currentUser.posts}</p>
                    <p className="text-gray-600 text-xs">Posts</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{currentUser.followers.toLocaleString()}</p>
                    <p className="text-gray-600 text-xs">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{currentUser.following}</p>
                    <p className="text-gray-600 text-xs">Following</p>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold text-lg">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Your engagement is up 23%</p>
                      <p className="text-xs text-gray-600">Post more landscape photos</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Best time to post: 7-9 PM</p>
                    <p className="text-xs text-gray-600">Your audience is most active</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Avg. engagement: {avgEngagement}K</p>
                    <p className="text-xs text-gray-600">Above average performance</p>
                  </div>
                </div>
              </div>

              {/* Suggested Users */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Suggested for you</h3>
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  {suggestedUsers.map((user) => (
                    <UserSearchItem key={user.id} user={user} />
                  ))}
                </div>
              </div>

              {/* AI Features */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-6 w-6" />
                  <h3 className="font-semibold">Try AI Features</h3>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Enhance your posts with AI-powered editing, auto-tagging, and smart captions.
                </p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition-all duration-200 hover:scale-105 transform">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
