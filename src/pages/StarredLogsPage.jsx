import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Download, ChevronLeft } from 'lucide-react'
import LogDetailModal from '../components/LogDetailModal'

// Mock data for starred logs
const mockStarredLogs = [
  { id: 2, image: '/placeholder.svg?height=100&width=100', date: '2024-03-01', time: '09:20:00', info: 'Student entered', starred: true },
  { id: 4, image: '/placeholder.svg?height=100&width=100', date: '2024-03-01', time: '09:30:00', info: 'Student entered', starred: true },
]

export default function StarredLogsPage() {
  const [logs, setLogs] = useState(mockStarredLogs)

  const [search, setSearch] = useState('')
  const [selectedLog, setSelectedLog] = useState(null)

  const handleSearch = (value) => {
    setSearch(value)
    // Implement search logic here
  }

  const handleUnstar = (id) => {
    setLogs(logs.filter(log => log.id !== id))
  }

  const handleDownload = (id) => {
    // Implement download logic here
    console.log('Downloading log:', id)
  }

  const filteredLogs = logs.filter(log =>
    log.info.toLowerCase().includes(search.toLowerCase()) ||
    log.date.includes(search) ||
    log.time.includes(search)
  )

  return (
    <div className="space-y-6 w-full">
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/logs">
            <ChevronLeft size={100} />
          </Link>
        </Button>
      <h1 className="text-3xl font-bold">Starred Logs</h1>
      </div>
      <Input
        placeholder="Search starred logs..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full sm:w-64"
      />
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
            {filteredLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>
                  <img src={log.image} alt="CCTV capture" className="w-16 h-16 object-cover rounded cursor-pointer" onClick={() => setSelectedLog(log)} />
                </TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.info}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => handleUnstar(log.id)}>
                    <Star className="fill-yellow-400 h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDownload(log.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  )
}