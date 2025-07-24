
import UserPostItem from './UserPostItem'
import { useApp } from '../contexts/AppContext'

const UserPost: React.FC = () => {
  const { posts } = useApp()

  return (
    <div className="max-w-lg mx-auto p-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        posts.map(post => <UserPostItem key={post.id} post={post} />)
      )}
    </div>
  )
}

export default UserPost
