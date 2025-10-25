// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface ProfileRow {
  id: string;
  user_id: string;
  full_name: string;
  orphanage_id: string;
  created_at: string;
  updated_at: string;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [fullName, setFullName] = useState('');
  const [orphanageId, setOrphanageId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) setError(error.message);
      if (data) {
        setProfile(data as ProfileRow);
        setFullName((data as ProfileRow).full_name || '');
        setOrphanageId((data as ProfileRow).orphanage_id || '');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, orphanage_id: orphanageId })
      .eq('user_id', user.id);
    if (error) setError(error.message);
    else setSuccess('Profile updated successfully!');
    setLoading(false);
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">No profile found</h2>
          <p className="text-gray-600">
            Your account doesn’t have a profile yet. Please complete your account setup.
          </p>
          <Link
            to="/create-account"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Complete Setup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Orphanage ID</label>
            <input
              type="text"
              value={orphanageId}
              onChange={e => setOrphanageId(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <button
          onClick={() => { signOut(); window.location.href = '/signin'; }}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
        >
          Sign Out
        </button>
        {/*
          Future integration: RAG-based health assistant chat UI goes here.
          Example: <AIChat userId={profile.id} />
        */}
      </div>
    </div>
  );
};

export default Profile;
