"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import { ProfileContainer } from '@/components/dashboard/ProfileContainer';
import { useSession } from '@/contexts/SessionContext';
import { profileService } from '@/services/authService';
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}

function Profile() {
  const { user, token } = useSession();
  const { toast } = useToast();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      profileService.getProfile(token)
        .then(({ profile, error }) => {
          if (error) {
            toast({
              title: "Failed to load profile",
              description: error,
              variant: "destructive",
            });
          } else if (profile) {
            setProfile(profile as User);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, token, toast]);

  const handleSave = async (data: { full_name: string; phone: string }) => {
    if (!token || !user) return;
    setLoading(true);
    try {
      const { profile, error } = await profileService.updateProfile(token, user.ID, data);
      if (error) {
        toast({
          title: "Failed to update profile",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated successfully",
        });
        setProfile(profile as User);
      }
    } catch (err) {
      toast({
        title: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <NavigationMenu />
            </div>
          </aside>
          <main className="flex-1">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            {loading ? (
              <div>Loading...</div>
            ) : profile ? (
              <ProfileContainer
                currentUser={profile}
                initialData={{
                  full_name: profile.name,
                  phone: profile.phone || '',
                }}
                onSave={handleSave}
                loading={loading}
              />
            ) : (
              <div>Could not load profile.</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
