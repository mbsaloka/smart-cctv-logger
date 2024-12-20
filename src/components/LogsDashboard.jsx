'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Grid, List } from 'lucide-react';
import LogDetailModal from '@/components/LogDetailModal';
import FilterAccordion from '@/components/FilterAccordion';
import LogList from '@/components/LogList';
import LogGrid from '@/components/LogGrid';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Mock data for logs
const mockLogs = [
  { id: 1, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:15:00', info: 'Dummy Data', starred: false },
  { id: 2, image: '/placeholder.svg?height=100&width=100', date: '2024-10-27', time: '10:20:00', info: 'Dummy Data', starred: true },
  { id: 3, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:25:00', info: 'Dummy Data', starred: false },
  { id: 4, image: '/placeholder.svg?height=100&width=100', date: '2024-10-28', time: '10:30:00', info: 'Dummy Data', starred: true },
  { id: 5, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '11:30:00', info: 'Dummy Data', starred: true },
  { id: 6, image: '/placeholder.svg?height=100&width=100', date: '2024-10-29', time: '12:30:00', info: 'Dummy Data', starred: true },
];

function LogsDashboard({ isShowStarred = false }) {
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [logs, setLogs] = useState(mockLogs);
  const [view, setView] = useState('gallery');
  const [sortBy, setSortBy] = useState('date');
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ startDate: null, endDate: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(20);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch(BACKEND_API_URL + '/images', {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('token')).token
      },
    }).then((res) => res.json())
      .then((data) => {
        const newLogs = data.map((log) => ({
          id: log._id,
          image: BACKEND_API_URL + log.imageUrl,
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
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStar = (id) => {
    setLogs(logs.map(log =>
      log.id === id ? { ...log, starred: !log.starred } : log
    ));
    fetch(BACKEND_API_URL + `/images/favorite/${id}`, {
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

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = displayedLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(displayedLogs.length / logsPerPage);

  const getVisiblePageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (windowWidth < 640) {
      return [currentPage];
    } else if (windowWidth < 768) {
      start = Math.max(1, currentPage - 1);
      end = Math.min(totalPages, currentPage + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const LogsPagination = () => {
    const visiblePageNumbers = getVisiblePageNumbers();

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {currentPage > 3 && windowWidth >= 768 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
              {currentPage > 4 && <PaginationItem>...</PaginationItem>}
            </>
          )}
          {visiblePageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => setCurrentPage(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages - 2 && windowWidth >= 768 && (
            <>
              {currentPage < totalPages - 3 && <PaginationItem>...</PaginationItem>}
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

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
        <div className="flex items-center space-x-4">
          <select
            value={logsPerPage}
            onChange={(e) => {
              setLogsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-background border rounded p-2"
          >
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
          {view === "list" ?
            <Button variant="outline" onClick={() => setView('gallery')}><Grid className="mr-2 h-4 w-4" />Gallery</Button> :
            <Button variant="outline" onClick={() => setView('list')}><List className="mr-2 h-4 w-4" />List</Button>
          }
        </div>
      </div>
      <LogsPagination />
      {view === 'list' ? (
        <LogList logs={currentLogs} handleStar={handleStar} setSelectedLog={setSelectedLog} />
      ) : (
        <LogGrid logs={currentLogs} handleStar={handleStar} setSelectedLog={setSelectedLog} />
      )}
      <LogsPagination />
      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} handlePrev={handlePrev} handleNext={handleNext} />
      )}
    </div>
  );
}

export default LogsDashboard;
