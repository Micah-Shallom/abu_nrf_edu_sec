// components/dashboard/ProfileView.tsx
import { User, Shield, Phone, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileViewProps {
  currentUser: {
    name: string;
    email: string;
    role: "User" | "Security";
  };
  profileData: {
    full_name: string;
    email: string;
    phone: string;
  };
  onEdit: () => void;
  loading: boolean;
}

export const ProfileView = ({
  currentUser,
  profileData,
  onEdit,
  loading
}: ProfileViewProps) => {
  const isSecurity = currentUser.role === "Security";
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className={`h-24 w-24 rounded-full ${randomColor} opacity-30`} />
          <div className="h-6 w-48 bg-gray-200 rounded mt-4" />
          <div className="h-4 w-64 bg-gray-200 rounded mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className={`h-24 w-24 ${randomColor} text-white`}>
          <AvatarFallback className="text-2xl font-bold">
            {profileData.full_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{profileData.full_name}</h2>
        <p className="text-gray-600">{currentUser.role}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{profileData.email}</p>
          </div>
        </div>

        {profileData.phone && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{profileData.phone}</p>
            </div>
          </div>
        )}

        {isSecurity && (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">Security Personnel</p>
            </div>
          </div>
        )}
      </div>

      <Button onClick={onEdit} className="w-full">
        Edit Profile
      </Button>
    </div>
  );
};