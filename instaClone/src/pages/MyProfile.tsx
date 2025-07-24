
import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import { useApp } from '../contexts/AppContext';

const MyProfile = () => {
  const { currentUser } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-6">
        <UserProfile user={currentUser} />
      </div>
    </div>
  );
};

export default MyProfile;
