import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import DownloadButton from "@/components/DownloadButton";

function LogDetailModal({ log, onClose, handlePrev, handleNext }) {
  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vh] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected log.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <img src={log.image} alt="CCTV capture" className="w-full h-auto object-cover rounded" />
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
          <DownloadButton log={log} variant="outline" />
        </DialogFooter>
        <Separator />
        <div className="flex justify-between w-full gap-4">
          <Button variant="outline" className="w-full" onClick={handlePrev}>Prev</Button>
          <Button variant="secondary" className="w-full" onClick={handleNext}>Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogDetailModal;