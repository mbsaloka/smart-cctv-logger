import { Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DatePickerForm from '@/components/DatePickerForm';

function FilterAccordion({ search, handleSearch, sortBy, handleSort, setSelectedDate }) {
  return (
    <div className="flex">
      <Filter className="mx-1 mt-[18.5px]" size={18} />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base">
            <div className="mr-3 ml-2">Apply Filter</div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <DatePickerForm setSelectedDate={setSelectedDate} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FilterAccordion;