import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react"; 
import { ConfirmationDialog } from "../ui/ConfirmationDialog";


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
  loading?: boolean;
}

export const RegisteredVehicles = ({
  vehicles,
  onEdit,
  onDelete,
  onRegisterNew,
  loading
}: RegisteredVehiclesProps) => {
      const [deletingId, setDeletingId] = useState<string | null>(null);
      const [showConfirmDialog, setShowConfirmDialog] = useState(false)
      const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null)

      const handleDeleteClick = (vehicleId: string) => {
        setVehicleToDelete(vehicleId)
        setShowConfirmDialog(true)
      }

      const handleConfirmDelete = async () => {
        if (!vehicleToDelete) return
        
        setShowConfirmDialog(false)
        setDeletingId(vehicleToDelete)
        try {
          await onDelete(vehicleToDelete)
        } finally {
          setDeletingId(null)
          setVehicleToDelete(null)
        }
      }

       const handleCancelDelete = () => {
        setShowConfirmDialog(false)
        setVehicleToDelete(null)
      }
        
  return (
    <div className="space-y-6">
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete Vehicle"
        isLoading={deletingId === vehicleToDelete}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Car className="h-6 w-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">My Registered Vehicles</h2>
        </div>
        <Button 
          onClick={onRegisterNew}
          className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Car className="h-4 w-4 mr-2" />
          Register New Vehicle
        </Button>
      </div>

      <div className="rounded-xl border-0 shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
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
                <TableRow key={vehicle.id} className="hover:bg-gray-50 transition-colors">
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
                      variant="outline" 
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-200"
                      onClick={() => onEdit(vehicle.id)}
                      disabled={deletingId === vehicle.id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-red-50 hover:border-red-200"
                    onClick={() => handleDeleteClick(vehicle.id)}
                    disabled={deletingId === vehicle.id}
                    >
                    {deletingId === vehicle.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-600" />
                    )}
                  </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <Car className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">No vehicles registered yet</p>
                  <p className="text-sm">Register your first vehicle to get started</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};