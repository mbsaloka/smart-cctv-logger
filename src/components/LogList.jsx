import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import DownloadButton from '@/components/DownloadButton';

function LogList({ logs, handleStar, setSelectedLog }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map(log => (
            <TableRow key={log.id}>
              <TableCell>
                <img src={log.image} alt="CCTV capture" className="w-16 h-16 object-cover rounded cursor-pointer" onClick={() => setSelectedLog(log)} />
              </TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.time}</TableCell>
              <TableCell>{log.info}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleStar(log.id)}>
                  <Star className={log.starred ? "fill-yellow-400 h-4 w-4" : "h-4 w-4"} />
                </Button>
                <DownloadButton log={log} variant="ghost" type="icon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LogList;