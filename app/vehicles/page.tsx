"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import { RegisteredVehicles } from '@/components/dashboard/RegisteredVehicles';
import { useSession } from '@/contexts/SessionContext';
import { vehicleService } from '@/services/vehicleService';
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from 'react';
import { Vehicle } from '@/types/auth';
import { useRouter } from 'next/navigation';

export default function VehiclesPage() {
  return (
    <ProtectedRoute>
      <Vehicles />
    </ProtectedRoute>
  );
}

function Vehicles() {
  const { user, token } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      vehicleService.getVehicles(token)
        .then(({ vehicles, error }) => {
          if (error) {
            toast({
              title: "Failed to load vehicles",
              description: error,
              variant: "destructive",
            });
          } else if (vehicles) {
            setVehicles(vehicles);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [token, toast]);

  const handleEdit = (vehicleId: string) => {
    router.push(`/vehicles/edit/${vehicleId}`);
  };

  const handleDelete = async (vehicleId: string) => {
    if (!token) return;
    setLoading(true);
    try {
      const { success, error } = await vehicleService.deleteVehicle(token, vehicleId);
      if (error) {
        toast({
          title: "Failed to delete vehicle",
          description: error,
          variant: "destructive",
        });
      } else if (success) {
        toast({
          title: "Vehicle deleted successfully",
        });
        setVehicles(vehicles.filter((v) => v.id !== vehicleId));
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
            <h1 className="text-2xl font-bold mb-4">My Vehicles</h1>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <RegisteredVehicles
                vehicles={vehicles.filter(v => v.user_id === user?.ID)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRegisterNew={() => router.push('/vehicles/register')}
                loading={loading}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
