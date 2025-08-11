// components/dashboard/ProfileContainer.tsx
import { useState } from "react";
import { ProfileView } from "./ProfileView";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileSkeleton } from "../ui/ProfileSkeleton";

interface ProfileContainerProps {
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: "User" | "Security";
  };
  initialData: {
    full_name: string;
    email?: string;
    phone: string;
  };
  onSave: (data: { full_name: string; phone: string }) => Promise<void>;
  loading: boolean;
}

export const ProfileContainer = ({
    currentUser,
    initialData,
    onSave,
    loading
  }: ProfileContainerProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
      full_name: initialData.full_name,
      phone: initialData.phone,
      email: currentUser.email
    });

    const handleSave = async (data: { full_name: string; phone: string }) => {
      await onSave(data);
      setProfileData(prev => ({ ...prev, ...data }));
      setIsEditing(false);
    };

//   if (loading && !isEditing) {
//     return <ProfileSkeleton isSecurity={currentUser.role === "Security"} />;
//   }

  return isEditing ? (
    <ProfileEdit
      profileData={profileData}
      loading={loading}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <ProfileView
      currentUser={currentUser}
      profileData={profileData}
      onEdit={() => setIsEditing(true)}
      loading={loading}
    />
  );
};