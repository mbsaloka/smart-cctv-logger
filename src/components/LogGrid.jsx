import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import DownloadButton from '@/components/DownloadButton';

function LogGrid({ logs, handleStar, setSelectedLog }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {logs.map(log => (
        <Card key={log.id} className="flex flex-col">
          <CardContent className="p-4 flex-grow">
            <img src={log.image} alt="CCTV capture" className="w-full h-48 object-cover rounded mb-4 cursor-pointer" onClick={() => {
              setSelectedLog(log);
            }} />
            <p className="font-semibold">{log.date} {log.time}</p>
            <p className="mt-2">{log.info}</p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" onClick={() => handleStar(log.id)}>
              <Star className={log.starred ? "fill-yellow-400 h-4 w-4" : "h-4 w-4"} />
            </Button>
            <DownloadButton log={log} variant="ghost" type="icon" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default LogGrid;