"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/custom-ui/page-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";

export default function MyLoansPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">Your Loans</h1>
      </PageHeader>

      <Tabs defaultValue="taken" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-card">
          <TabsTrigger
            value="taken"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent"
          >
            Taken
          </TabsTrigger>
          <TabsTrigger
            value="offered"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent"
          >
            Offered
          </TabsTrigger>
        </TabsList>
        <TabsContent value="taken" className="space-y-4">
          Hello
        </TabsContent>
        <TabsContent value="offered" className="space-y-4">
          Hello
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
