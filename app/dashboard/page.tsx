"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardMain } from '@/components/dashboard/DashboardMain';
import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import { useSession } from '@/contexts/SessionContext';
import {
  Car,
  LogOut,
  Menu,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from 'react';
import { vehicleService } from '@/services/vehicleService';
import { activityService } from '@/services/activityService';
import { Vehicle, ActivityLog, VehicleActivity } from '@/types/auth';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user, logout, token } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchData(token);
    }
  }, [user, token]);

  const fetchData = async (authToken: string) => {
    setLoading(true);
    if (!authToken) {
      setLoading(false);
      return;
    }

    const { vehicles, error: vehiclesError } = await vehicleService.getVehicles(authToken);
    if (vehiclesError) {
      console.error(vehiclesError);
    } else if (vehicles) {
      setVehicles(vehicles);
    }

    const { activities, error: activitiesError } = await activityService.getActivities(authToken);
    if (activitiesError) {
      console.error(activitiesError);
    } else if (activities) {
      const transformedLogs: ActivityLog[] = activities.map((activity: VehicleActivity) => ({
        id: activity.id,
        vehiclePlate: activity.plate_number,
        vehicleName: 'Unknown Vehicle', // You might want to fetch vehicle details to get the name
        logTime: activity.timestamp,
        logType: activity.is_entry ? 'Entry' : 'Exit',
      }));
      setActivityLogs(transformedLogs);
    }
    setLoading(false);
  };

  const userVehicles = vehicles.filter((v) => v.user_id === user?.ID)
  const recentActivities = activityLogs.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex items-center mb-6">
                    <Car className="h-8 w-8 text-blue-600 mr-3" />
                    <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
                  </div>
                  <NavigationMenu />
                </SheetContent>
              </Sheet>
              <a href="/" className="flex items-center">
                <Car className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-semibold">Vehicle Monitor</h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {user?.role === "Security" ? (
                  <Shield className="h-3 w-3 mr-1" />
                ) : (
                  <Car className="h-3 w-3 mr-1" />
                )}
                {user?.role}
              </Badge>
              <span className="text-sm text-gray-600 hidden sm:block">{user?.name}</span>
              <Button variant="ghost" onClick={logout} className="hidden sm:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <NavigationMenu />
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <DashboardMain
                userRole={user?.role || "User"}
                userVehiclesCount={userVehicles.length}
                activeSessionsCount={activityLogs.filter(log => log.logType === 'Entry').length}
                totalVehiclesCount={vehicles.length}
                recentActivities={recentActivities}
                onNavigate={(page) => {
                  // Implement navigation logic here
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
