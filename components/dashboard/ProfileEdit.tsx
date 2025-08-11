// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { User, Shield, Upload, LogOut } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Loader2 } from "lucide-react";
// import { Profile } from "@/types/auth"; // Adjust the import path as necessary
// import { X } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ProfileSkeleton } from "../ui/ProfileSkeleton";
// import { AlertCircle } from "lucide-react";
// import { CheckCircle } from "lucide-react";

// interface ProfileSetupProps {
//   currentUser: {
//     id: string;
//     name: string;
//     email: string;
//     role: "User" | "Security";
//   };
//   profileData: Profile;
//   loading: boolean;
//   error?: string;
//   success?: boolean;
//   onNameChange: (name: string) => void;
//   onEmailChange: (email: string) => void;
//   onPhoneChange: (phone: string) => void;
//   onStationChange?: (station: string) => void;
//   onShiftChange?: (shift: string) => void;
//   onProfileImageChange?: (file: File) => void;
//   onSubmit: (e: React.FormEvent) => void;
//   onLogout: () => void;
//   onClose: () => void;
// }

// export const ProfileSetup = ({
//   currentUser,
//   profileData,
//   loading,
//   error,
//   success,
//   onNameChange,
//   onEmailChange,
//   onPhoneChange,
//   onStationChange,
//   onShiftChange,
//   onProfileImageChange,
//   onSubmit,
//   onLogout,
//   onClose,
// }: ProfileSetupProps) => {
//   const isSecurity = currentUser.role === "Security";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <header className="bg-white shadow-sm border-b">
//           {/* Header skeleton */}
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <Skeleton className="h-8 w-[200px]" />
//               <Skeleton className="h-10 w-10 rounded-full" />
//             </div>
//           </div>
//         </header>
//         <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//           <Card>
//             <CardHeader>
//               <Skeleton className="h-6 w-[200px]" />
//               <Skeleton className="h-4 w-[300px]" />
//             </CardHeader>
//             <CardContent>
//               <ProfileSkeleton />
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     );
//   }
  
//   // Generate a random color for the avatar background
//   const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0] && onProfileImageChange) {
//       onProfileImageChange(e.target.files[0]);
//     }
//   };

//    return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ... existing header code ... */}

//       <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
//               <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
//               <div>
//                 <p className="font-medium">Profile update failed</p>
//                 <p className="text-sm">{error}</p>
//               </div>
//             </div>
//         )}
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-start">
//             <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
//             <div>
//               <p className="font-medium">Profile updated successfully!</p>
//               <p className="text-sm">Your changes have been saved.</p>
//             </div>
//           </div>
//         )}
//         <Card>
//           <CardHeader>
//             <div className="flex items-right justify-between">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 onClick={onClose}
//                 className="rounded-full"
//               >
//                 <X className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" onClick={onLogout}>
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//             <CardTitle>Profile Setup</CardTitle>
//             <CardDescription>
//               {isSecurity
//                 ? "Complete your security personnel profile"
//                 : "Complete your user profile"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={onSubmit} className="space-y-6">
//               <div className="flex flex-col items-center space-y-4">
//                 <Avatar className={`h-24 w-24 ${randomColor} text-white`}>
//                   <AvatarFallback className="text-2xl font-bold">
//                     {profileData.Full_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     id="profileImage"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <Label htmlFor="profileImage">
//                     <Button asChild variant="outline" disabled>
//                       <div className="cursor-pointer">
//                         <Upload className="h-4 w-4 mr-2" />
//                         Upload Photo
//                       </div>
//                     </Button>
//                   </Label>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     value={profileData.Full_name || ''}
//                     onChange={(e) => onNameChange(e.target.value)}
//                     placeholder="Enter your full name"
//                     disabled={loading}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={profileData.Email || currentUser.email}
//                     onChange={(e) => onEmailChange(e.target.value)}
//                     placeholder={profileData.Email || currentUser.email}
//                     disabled
//                     className="text-gray-700"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     value={profileData.Phone || ''}
//                     onChange={(e) => onPhoneChange?.(e.target.value)}
//                     placeholder="Enter your phone number"
//                     disabled={loading}
//                   />
//                 </div>

//                 {/* ... rest of the form ... */}
//               </div>

//               <div className="flex gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="w-full"
//                   onClick={onClose}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };






// components/dashboard/ProfileEdit.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface ProfileEditProps {
  profileData: {
    full_name: string;
    phone: string;
  };
  loading: boolean;
  onSave: (data: { full_name: string; phone: string }) => void;
  onCancel: () => void;
}

export const ProfileEdit = ({
  profileData,
  loading,
  onSave,
  onCancel
}: ProfileEditProps) => {
  const [formData, setFormData] = useState(profileData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Edit Profile</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.full_name}
              onChange={(e) => 
                setFormData({...formData, full_name: e.target.value})
              }
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => 
                setFormData({...formData, phone: e.target.value})
              }
              disabled={loading}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};