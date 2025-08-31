import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";

interface VehicleRegistrationProps {
  formData: {
    plateNumber: string;
    model: string;
    color: string;
    type: string;
  };
  onPlateNumberChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const VehicleRegistration = ({
  formData,
  onPlateNumberChange,
  onModelChange,
  onColorChange,
  onTypeChange,
  onSubmit,
  onCancel,
}: VehicleRegistrationProps) => {
  const vehicleTypes = [
  { value: 'bus', label: 'Bus' },
  { value: 'car', label: 'Car' },
  { value: 'bike', label: 'Bike' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity mr-6"
                onClick={onCancel}
              >
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-semibold text-gray-900">Vehicle Monitor</span>
              </button>
              <Car className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-lg font-medium">Register Vehicle</h1>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle>Register Vehicle</CardTitle>
                <CardDescription>Add a new vehicle to your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Plate Number */}
                <div className="space-y-2">
                  <Label htmlFor="plateNumber">License Plate Number</Label>
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber}
                    onChange={(e) => onPlateNumberChange(e.target.value)}
                    placeholder="e.g., ABC-123"
                    required
                    maxLength={15}
                  />
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <Label htmlFor="model">Vehicle Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => onModelChange(e.target.value)}
                    placeholder="e.g., Toyota Camry"
                    required
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => onColorChange(e.target.value)}
                    placeholder="e.g., White"
                    required
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={onTypeChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Register Vehicle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};