import { Button } from "@/components/ui/button";
import {
  Car,
  Shield,
  Plus,
  Activity,
  LogOut,
  User,
} from "lucide-react";

interface NavigationMenuProps {
  currentPage: string;
  currentUser: {
    id: string;
    role: "User" | "Security";
  } | null; // Add null possibility
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const NavigationMenu = ({
  currentPage,
  currentUser,
  onPageChange,
  onLogout,
}: NavigationMenuProps) => {
   // Return null or a loading state if currentUser is null
  if (!currentUser) {
    return null; // or return a loading spinner
  }
  return (
    <nav className="space-y-2">
      {currentUser.role === "User" && (
        <>
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("dashboard")}
          >
            <Car className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={currentPage === "vehicle-registration" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("vehicle-registration")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Register Vehicle
          </Button>
          <Button
            variant={currentPage === "registered-vehicles" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("registered-vehicles")}
            >
            <Car className="mr-2 h-4 w-4" />
            My Vehicles
          </Button>
          <Button
            variant={currentPage === "activity-logs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("activity-logs")}
          >
            <Activity className="mr-2 h-4 w-4" />
            Activity Logs
          </Button>
        </>
      )}
      {currentUser.role === "Security" && (
        <>
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("dashboard")}
          >
            <Shield className="mr-2 h-4 w-4" />
            Security Dashboard
          </Button>
          <Button
            variant={currentPage === "activity-logs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("activity-logs")}
          >
            <Activity className="mr-2 h-4 w-4" />
            Monitor Activity
          </Button>
        </>
      )}
      <Button
        variant={currentPage === "profile" ? "default" : "ghost"} // Changed from "profile-setup" to "profile"
        className="w-full justify-start"
        onClick={() => onPageChange("profile")} // Changed to "profile"
        >
        <User className="mr-2 h-4 w-4" />
        Profile
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
};