import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityLog {
  id: string;
  vehiclePlate: string;
  vehicleName: string;
  entryTime: string;
  exitTime?: string;
}

interface ActivityLogsProps {
  logs: ActivityLog[];
  userRole: "User" | "Security";
  onNavigateToVehicle?: (plate: string) => void;
}

export const ActivityLogs = ({ logs, userRole, onNavigateToVehicle }: ActivityLogsProps) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">
            {userRole === "Security" ? "Activity Monitor" : "Your Activity Logs"}
          </h2>
        </div>
        {userRole === "Security" && (
          <Button variant="outline">
            Export Records
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              {userRole === "Security" && <TableHead>Driver</TableHead>}
              <TableHead>Plate Number</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Exit Time</TableHead>
              <TableHead>Status</TableHead>
              {onNavigateToVehicle && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.vehicleName}</TableCell>
                  {userRole === "Security" && (
                    <TableCell className="text-gray-500">-</TableCell>
                  )}
                  <TableCell>
                    {onNavigateToVehicle ? (
                      <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        onClick={() => onNavigateToVehicle(log.vehiclePlate)}
                      >
                        {log.vehiclePlate}
                      </Button>
                    ) : (
                      log.vehiclePlate
                    )}
                  </TableCell>
                  <TableCell>{formatDateTime(log.entryTime)}</TableCell>
                  <TableCell>
                    {log.exitTime ? formatDateTime(log.exitTime) : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.exitTime ? "secondary" : "default"}>
                      {log.exitTime ? "Completed" : "Active"}
                    </Badge>
                  </TableCell>
                  {onNavigateToVehicle && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={userRole === "Security" ? (onNavigateToVehicle ? 7 : 6) : (onNavigateToVehicle ? 6 : 5)} 
                  className="text-center py-8 text-gray-500"
                >
                  No activity records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};