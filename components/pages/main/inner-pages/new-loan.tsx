"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/custom-ui/page-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { Slider } from "@/components/shadcn-ui/slider";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/shadcn-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { Textarea } from "@/components/shadcn-ui/textarea";

export default function NewLoanPage() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      collateral: 90,
      interest: 10,
      deadline: new Date(),
      amount: 100,
      image: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (values: any) => {
    const loanData = {
      ...values,
      deadline: Math.floor(values.deadline.getTime() / 1000),
    };
    console.log("New Loan Data:", loanData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">New Loan</h1>
      </PageHeader>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5"
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="A short title for your loan" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the motivation for why you need the loan"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="collateral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collateral: {field.value}%</FormLabel>
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
            control={control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate: {field.value}%</FormLabel>
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
            control={control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
            control={control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://example.com/image.png"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 font-semibold">
            Create Loan
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
