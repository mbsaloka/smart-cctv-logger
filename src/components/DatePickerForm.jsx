import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import CalendarFormItem from "@/components/CalendarFormItem";

const FormSchema = z.object({
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be later than or equal to start date",
  path: ["endDate"],
});

function DatePickerForm({ setSelectedDate }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { startDate: null, endDate: null },
  });

  function onSubmit(data) {
    data.endDate.setHours(23, 59, 59, 999);
    setSelectedDate({ startDate: data.startDate, endDate: data.endDate });
    toast({
      title: "Selected date range:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {`From ${format(data.startDate, 'yyyy-MM-dd')} to ${format(data.endDate, 'yyyy-MM-dd')}`}
          </code>
        </pre>
      ),
    });
  }

  function onReset() {
    form.reset({ startDate: null, endDate: null });
    setSelectedDate({ startDate: null, endDate: null });
    toast({
      title: "Date range reset",
      description: "The date range has been cleared.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-x-12">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <CalendarFormItem title="Start Date" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <CalendarFormItem title="End Date" field={field} />
            )}
          />
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Apply Filter</Button>
          <Button type="button" variant="secondary" onClick={onReset}>Reset Filter</Button>
        </div>
      </form>
    </Form>
  );
}

export default DatePickerForm;
