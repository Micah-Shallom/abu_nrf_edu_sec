"use client"

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import { VehicleRegistration } from '@/components/dashboard/VehicleRegistration';
import { useSession } from '@/contexts/SessionContext';
import { vehicleService } from '@/services/vehicleService';
import { useToast } from "@/components/ui/use-toast"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterVehiclePage() {
  return (
    <ProtectedRoute>
      <RegisterVehicle />
    </ProtectedRoute>
  );
}

function RegisterVehicle() {
  const { token } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    color: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const { vehicle, error } = await vehicleService.registerVehicle(token, {
        plate_number: formData.plateNumber,
        model: formData.model,
        color: formData.color,
        type: formData.type.toLowerCase() as 'bus' | 'car' | 'bike',
      });

      if (error) {
        toast({
          title: "Failed to register vehicle",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Vehicle registered successfully",
        });
        router.push('/vehicles');
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
            <h1 className="text-2xl font-bold mb-4">Register Vehicle</h1>
            <VehicleRegistration
              formData={formData}
              onPlateNumberChange={(plateNumber) => setFormData({ ...formData, plateNumber })}
              onModelChange={(model) => setFormData({ ...formData, model })}
              onColorChange={(color) => setFormData({ ...formData, color })}
              onTypeChange={(type) => setFormData({ ...formData, type })}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/dashboard')}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
