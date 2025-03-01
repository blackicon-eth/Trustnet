import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { Slider } from "@/components/shadcn-ui/slider";
import { format } from "date-fns";
import { Calendar } from "@/components/shadcn-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn-ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Filters } from "@/lib/types";
import { useForm } from "react-hook-form";

interface FiltersButtonProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const FiltersButton = ({ filters, setFilters }: FiltersButtonProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [initialFilters, setInitialFilters] = useState(filters);

  const form = useForm({
    defaultValues: {
      minDeadline: new Date(filters.minDeadline * 1000),
      maxDeadline: new Date(filters.maxDeadline * 1000),
      minAmount: filters.minAmount,
      maxAmount: filters.maxAmount,
      minCollateral: filters.minCollateral,
      maxCollateral: filters.maxCollateral,
      minInterest: filters.minInterest,
      maxInterest: filters.maxInterest,
    },
  });

  const { reset } = form;

  const handleDrawerOpenChange = (open: boolean) => {
    if (open) {
      setInitialFilters(filters);
    } else {
      setFilters(initialFilters);
      reset({
        minDeadline: new Date(initialFilters.minDeadline * 1000),
        maxDeadline: new Date(initialFilters.maxDeadline * 1000),
        minAmount: initialFilters.minAmount,
        maxAmount: initialFilters.maxAmount,
        minCollateral: initialFilters.minCollateral,
        maxCollateral: initialFilters.maxCollateral,
        minInterest: initialFilters.minInterest,
        maxInterest: initialFilters.maxInterest,
      });
    }
    setIsDrawerOpen(open);
  };

  const applyFilters = (values: any) => {
    const newFilters = {
      minDeadline: Math.floor(values.minDeadline.getTime() / 1000),
      maxDeadline: Math.floor(values.maxDeadline.getTime() / 1000),
      minAmount: values.minAmount,
      maxAmount: values.maxAmount,
      minCollateral: values.minCollateral,
      maxCollateral: values.maxCollateral,
      minInterest: values.minInterest,
      maxInterest: values.maxInterest,
    };

    setFilters(newFilters);
    setIsDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
      <DrawerTrigger asChild>
        <Button className="bg-card hover:bg-card/80 border-card">
          <Filter className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        handleClassName="bg-card"
        className="h-[90%] bg-foreground border-card text-white"
      >
        <DrawerTitle className="hidden" />
        <DrawerDescription className="hidden" />
        <div className="px-4 pt-4 pb-5 size-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(applyFilters)}
              className="flex flex-col size-full justify-between"
            >
              <div className="flex flex-col gap-6 justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-medium">Deadline Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minDeadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxDeadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-medium">Amount Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="minCollateral"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Collateral: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxCollateral"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Collateral: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="minInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Interest: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={30}
                            step={0.5}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Interest: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={30}
                            step={0.5}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-[48%]">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button className="w-[48%]" type="submit">
                  Apply Filters
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
