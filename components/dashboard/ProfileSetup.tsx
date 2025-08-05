// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { User, Shield } from "lucide-react";
// import { LogOut } from "lucide-react";

// interface ProfileSetupProps {
//   currentUser: {
//     name: string;
//     email: string;
//     role: "User" | "Security";
//   };
//   formData: {
//     name: string;
//     email: string;
//     station?: string;
//     shift?: string;
//   };
//   onNameChange: (name: string) => void;
//   onEmailChange: (email: string) => void;
//   onStationChange?: (station: string) => void;
//   onShiftChange?: (shift: string) => void;
//   onSubmit: (e: React.FormEvent) => void;
//   onLogout: () => void;
// }

// export const ProfileSetup = ({
//   currentUser,
//   formData,
//   onNameChange,
//   onEmailChange,
//   onStationChange,
//   onShiftChange,
//   onSubmit,
//   onLogout,
// }: ProfileSetupProps) => {
//   const isSecurity = currentUser.role === "Security";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               {isSecurity ? (
//                 <Shield className="h-8 w-8 text-blue-600 mr-3" />
//               ) : (
//                 <User className="h-8 w-8 text-blue-600 mr-3" />
//               )}
//               <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
//             </div>
//             <Button variant="ghost" onClick={onLogout}>
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Setup</CardTitle>
//             <CardDescription>
//               {isSecurity
//                 ? "Complete your security personnel profile"
//                 : "Complete your user profile"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={onSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => onNameChange(e.target.value)}
//                   placeholder={currentUser.name}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => onEmailChange(e.target.value)}
//                   placeholder={currentUser.email}
//                 />
//               </div>

//               {isSecurity && (
//                 <>
//                   <div className="space-y-2">
//                     <Label htmlFor="station">Station/Post</Label>
//                     <Input
//                       id="station"
//                       value={formData.station || ""}
//                       onChange={(e) => onStationChange?.(e.target.value)}
//                       placeholder="e.g., Main Gate, Parking Lot A"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="shift">Shift Time</Label>
//                     <Input
//                       id="shift"
//                       value={formData.shift || ""}
//                       onChange={(e) => onShiftChange?.(e.target.value)}
//                       placeholder="e.g., 8:00 AM - 4:00 PM"
//                     />
//                   </div>
//                 </>
//               )}

//               <Button type="submit" className="w-full">
//                 Save Profile
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield, Upload, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileSetupProps {
  currentUser: {
    name: string;
    email: string;
    role: "User" | "Security";
  };
  formData: {
    name: string;
    email: string;
    phone?: string;
    station?: string;
    shift?: string;
    profileImage?: string;
  };
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange?: (phone: string) => void;
  onStationChange?: (station: string) => void;
  onShiftChange?: (shift: string) => void;
  onProfileImageChange?: (file: File) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
}

export const ProfileSetup = ({
  currentUser,
  formData,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onStationChange,
  onShiftChange,
  onProfileImageChange,
  onSubmit,
  onLogout,
}: ProfileSetupProps) => {
  const isSecurity = currentUser.role === "Security";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onProfileImageChange) {
      onProfileImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {isSecurity ? (
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
              ) : (
                <User className="h-8 w-8 text-blue-600 mr-3" />
              )}
              <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Setup</CardTitle>
            <CardDescription>
              {isSecurity
                ? "Complete your security personnel profile"
                : "Complete your user profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.profileImage} />
                  <AvatarFallback>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="relative">
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="profileImage">
                    <Button asChild variant="outline">
                      <div className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </div>
                    </Button>
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder={currentUser.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder={currentUser.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => onPhoneChange?.(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                {isSecurity && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="station">Station/Post</Label>
                      <Input
                        id="station"
                        value={formData.station || ""}
                        onChange={(e) => onStationChange?.(e.target.value)}
                        placeholder="e.g., Main Gate, Parking Lot A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shift">Shift Time</Label>
                      <Input
                        id="shift"
                        value={formData.shift || ""}
                        onChange={(e) => onShiftChange?.(e.target.value)}
                        placeholder="e.g., 8:00 AM - 4:00 PM"
                      />
                    </div>
                  </>
                )}
              </div>

              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};