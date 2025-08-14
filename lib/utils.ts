import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Vehicle } from "@/types/auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformVehicle = (apiVehicle: any): Vehicle => {
  return {
    ...apiVehicle,
    // Ensure all required fields are present
    id: apiVehicle.id || '',
    plate_number: apiVehicle.plate_number || apiVehicle.plateNumber || '',
    model: apiVehicle.model || '',
    color: apiVehicle.color || '',
    type: apiVehicle.type || 'car',
    user_id: apiVehicle.user_id || apiVehicle.userId || '',
    
    // Add frontend aliases
    plateNumber: apiVehicle.plate_number || apiVehicle.plateNumber,
    userId: apiVehicle.user_id || apiVehicle.userId
  };
};