'use client';

import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Grid, List } from 'lucide-react';
import LogDetailModal from '@/components/LogDetailModal';
import FilterAccordion from '@/components/FilterAccordion';
import LogList from '@/components/LogList';
import LogGrid from '@/components/LogGrid';

// Mock data for logs
const mockLogs = [
  { id: 1, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:15:00', info: 'Student entered', starred: false },
  { id: 2, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:20:00', info: 'Student entered', starred: true },
  { id: 3, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:25:00', info: 'Student entered', starred: false },
  { id: 4, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:30:00', info: 'Student entered', starred: true },
  { id: 5, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '11:30:00', info: 'Student entered', starred: true },
  { id: 6, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '12:30:00', info: 'Student entered', starred: true },
];

function LogsDashboard({ isShowStarred = false }) {
  const [logs, setLogs] = useState(mockLogs);
  const [view, setView] = useState('gallery');
  const [sortBy, setSortBy] = useState('date');
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    fetch('http://localhost:3000/images', {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('token')).token
      },
    }).then((res) => res.json())
      .then((data) => {
        const newLogs = data.map((log) => ({
          id: log._id,
          image: log.imageUrl,
          date: log.date.substring(0, 10),
          time: log.time,
          info: log.totalEntity + ' people detected',
          starred: log.starred,
        }));
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
  };

  const handleStar = (id) => {
    setLogs(logs.map(log =>
      log.id === id ? { ...log, starred: !log.starred } : log
    ));
    fetch(`http://localhost:3000/images/favorite/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('token')).token,
      },
      body: JSON.stringify({ starred: !logs.find(log => log.id === id).starred }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filteredLogs = logs.filter(log =>
    (log.info.toLowerCase().includes(search.toLowerCase()) ||
      log.date.includes(search) ||
      log.time.includes(search)) &&
    (!selectedDate.startDate || !selectedDate.endDate ||
      (new Date(log.date) >= new Date(selectedDate.startDate) &&
        new Date(log.date) <= new Date(selectedDate.endDate)))
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
        <FilterAccordion
          search={search}
          handleSearch={handleSearch}
          sortBy={sortBy}
          handleSort={handleSort}
          setSelectedDate={setSelectedDate}
        />
        {view === "list" ?
          <Button variant="outline" onClick={() => setView('gallery')}><Grid className="mr-2 h-4 w-4" />Gallery</Button> :
          <Button variant="outline" onClick={() => setView('list')}><List className="mr-2 h-4 w-4" />List</Button>
        }
      </div>
      {view === 'list' ? (
        <LogList logs={displayedLogs} handleStar={handleStar} setSelectedLog={setSelectedLog} />
      ) : (
        <LogGrid logs={displayedLogs} handleStar={handleStar} setSelectedLog={setSelectedLog} />
      )}
      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} handlePrev={handlePrev} handleNext={handleNext} />
      )}
    </div>
  );
}

export default LogsDashboard;