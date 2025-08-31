import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clock, LogIn, LogOut } from "lucide-react";

interface ActivityLog {
  id: string;
  vehiclePlate: string;
  vehicleName: string;
  logTime: string;
  logType: 'Entry' | 'Exit';
  rawActivity?: any; // Optional for API data
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

  const getLogTypeIcon = (logType: 'Entry' | 'Exit') => {
    return logType === 'Entry' ? <LogIn className="h-4 w-4 mr-1" /> : <LogOut className="h-4 w-4 mr-1" />;
  };

  const getLogTypeVariant = (logType: 'Entry' | 'Exit') => {
    return logType === 'Entry' ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            {userRole === "Security" ? "Activity Monitor" : "Your Activity Logs"}
          </h2>
        </div>
        {userRole === "Security" && (
          <Button 
            variant="outline"
            className="shadow-md hover:shadow-lg transition-all duration-300"
          >
            Export Records
          </Button>
        )}
      </div>

      <div className="rounded-xl border-0 shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Vehicle</TableHead>
              <TableHead>Plate Number</TableHead>
              <TableHead>Logs Time</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{log.vehicleName}</TableCell>
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
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      {formatDateTime(log.logTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getLogTypeVariant(log.logType)} 
                      className="flex items-center w-min"
                    >
                      {getLogTypeIcon(log.logType)}
                      {log.logType}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">No activity records found</p>
                  <p className="text-sm">Vehicle activities will appear here once you start using the system</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};