import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Grid, List } from 'lucide-react';
import LogDetailModal from '@/components/LogDetailModal';
import DownloadButton from '@/components/DownloadButton';

// Mock data for logs
const mockLogs = [
  { id: 1, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:15:00', info: 'Student entered', starred: false },
  { id: 2, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:20:00', info: 'Student entered', starred: true },
  { id: 3, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:25:00', info: 'Student entered', starred: false },
  { id: 4, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:30:00', info: 'Student entered', starred: true },
  { id: 5, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '11:30:00', info: 'Student entered', starred: true },
  { id: 6, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '12:30:00', info: 'Student entered', starred: true },
];

function LogsDashboard({ isShowStarred }) {
  const [logs, setLogs] = useState(mockLogs);
  const [view, setView] = useState('gallery');
  const [sortBy, setSortBy] = useState('date');
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/images')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newLogs = data.map((log) => {
          return {
            id: log._id,
            image: log.imageUrl,
            date: log.date.substring(0, 10),
            time: log.time,
            info: "Student entered",
            starred: false,
          };
        });
        setLogs(newLogs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSort = (value) => {
    setSortBy(value);
    // Implement sorting logic here
  };

  const handleSearch = (value) => {
    setSearch(value);
    // Implement search logic here
  };

  const handleStar = (id) => {
    setLogs(logs.map(log =>
      log.id === id ? { ...log, starred: !log.starred } : log
    ));
  };

  const filteredLogs = logs.filter(log =>
    log.info.toLowerCase().includes(search.toLowerCase()) ||
    log.date.includes(search) ||
    log.time.includes(search)
  );

  const displayedLogs = isShowStarred ? filteredLogs.filter(log => log.starred) : filteredLogs;

  const handlePrev = () => {
    const currentIndex = displayedLogs.findIndex(log => log.id === selectedLog.id);
    if (currentIndex > 0) {
      setSelectedLog(displayedLogs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = displayedLogs.findIndex(log => log.id === selectedLog.id);
    if (currentIndex < displayedLogs.length - 1) {
      setSelectedLog(displayedLogs[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select onValueChange={handleSort} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {view === "list" ?
          <Button variant="outline" onClick={() => setView('gallery')}><Grid className="mr-2 h-4 w-4" />Gallery</Button> :
          <Button variant="outline" onClick={() => setView('list')}><List className="mr-2 h-4 w-4" />List</Button>
        }
      </div>
      {view === 'list' ? (
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
              {displayedLogs.map(log => (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedLogs.map(log => (
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
      )}
      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} handlePrev={handlePrev} handleNext={handleNext} />
      )}
    </div>
  );
}

export default LogsDashboard;
