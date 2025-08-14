import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


interface Vehicle {
  id: string;
  plateNumber: string;  // Frontend preferred
  plate_number?: string; // API response field
  model: string;
  color: string;
  type: string;
  status: "Active" | "Inactive";
}

interface RegisteredVehiclesProps {
  vehicles: Vehicle[];
  onEdit: (vehicleId: string) => void;
  onDelete: (vehicleId: string) => void;
  onRegisterNew: () => void;
}

export const RegisteredVehicles = ({
  vehicles,
  onEdit,
  onDelete,
  onRegisterNew,
}: RegisteredVehiclesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Car className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">My Registered Vehicles</h2>
        </div>
        <Button onClick={onRegisterNew}>
          <Car className="h-4 w-4 mr-2" />
          Register New Vehicle
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plate Number</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {vehicle.plate_number || vehicle.plateNumber}
                  </TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>
                    <Badge variant={vehicle.status === "Active" ? "default" : "secondary"}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit(vehicle.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDelete(vehicle.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No vehicles registered yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};