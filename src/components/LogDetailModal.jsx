import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, Download } from 'lucide-react'

export default function LogDetailModal({ log, onClose }) {
  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected log.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <img src={log.image} alt="CCTV capture" className="w-full h-64 object-cover rounded" />
          <div className="space-y-2">
            <p><strong>Date:</strong> {log.date}</p>
            <p><strong>Time:</strong> {log.time}</p>
            <p><strong>Info:</strong> {log.info}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start space-x-2">
          <Button variant="outline" onClick={() => console.log('Star clicked')}>
            <Star className={log.starred ? "fill-yellow-400 mr-2 h-4 w-4" : "mr-2 h-4 w-4"} />
            {log.starred ? 'Unstar' : 'Star'}
          </Button>
          <Button variant="outline" onClick={() => console.log('Download clicked')}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}