import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ActivityLog } from "@/types/auth"; // Assuming this type is appropriate
import { LogIn, LogOut } from "lucide-react";

interface VehicleActivityLogsProps {
  logs: ActivityLog[];
  vehiclePlate: string;
  vehicleName: string;
  loading: boolean;
}

export const VehicleActivityLogs = ({
  logs,
  vehiclePlate,
  vehicleName,
  loading,
}: VehicleActivityLogsProps) => {

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading activity logs...</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs for {vehicleName}</CardTitle>
        <CardDescription>Plate Number: {vehiclePlate}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant={log.logType === 'Entry' ? 'default' : 'secondary'}>
                      {log.logType === 'Entry' ? <LogIn className="h-3 w-3 mr-1" /> : <LogOut className="h-3 w-3 mr-1" />}
                      {log.logType}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateTime(log.logTime)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No activity logs found for this vehicle.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
