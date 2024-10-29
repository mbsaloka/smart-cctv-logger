import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft } from 'lucide-react';
import LogsDashboard from '@/components/LogsDashboard';

function LogsPage() {
  const [isShowStarred, setIsShowStarred] = useState(false);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex gap-2">
          {isShowStarred && (
            <Button variant="ghost" size="icon" asChild onClick={() => setIsShowStarred(false)}>
              <ChevronLeft />
            </Button>
          )}
          <h1 className="text-3xl font-bold">{isShowStarred ? "Starred Logs" : "Attendance Logs"}</h1>
        </div>
        {!isShowStarred && (
          <Button variant="outline" asChild onClick={() => setIsShowStarred(true)}>
            <div>
              <Star className="mr-2 h-4 w-4" />
              View Starred Logs
            </div>
          </Button>
        )}
      </div>
      <LogsDashboard isShowStarred={isShowStarred} />
    </div>
  );
}

export default LogsPage;
