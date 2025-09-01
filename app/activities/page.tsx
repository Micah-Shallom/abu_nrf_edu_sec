"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import { ActivityLogs } from '@/components/dashboard/ActivityLogs';
import { useSession } from '@/contexts/SessionContext';
import { activityService } from '@/services/activityService';
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from 'react';
import { ActivityLog } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function ActivitiesPage() {
  return (
    <ProtectedRoute>
      <Activities />
    </ProtectedRoute>
  );
}

function Activities() {
  const { user, token } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      activityService.getActivities(token)
        .then(({ activities, error }) => {
          if (error) {
            toast({
              title: "Failed to load activities",
              description: error,
              variant: "destructive",
            });
          } else if (activities) {
            setActivities(activities);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [token, toast]);

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
            <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ActivityLogs
                logs={activities}
                userRole={user?.role || "User"}
                onNavigateToVehicle={(plate) => {
                  // This could navigate to a vehicle details page
                  // For now, we'll just log it
                  console.log('Navigate to vehicle with plate:', plate);
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
