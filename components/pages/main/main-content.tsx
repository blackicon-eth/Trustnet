"use client";

import { usePageContent } from "@/components/providers/page-content-provider";
import { AnimatePresence } from "framer-motion";
import HomePage from "./inner-pages/home";
import { PageContent } from "@/lib/enums";

export default function MainContent() {
  const { pageContent } = usePageContent();

  return (
    <AnimatePresence mode="wait">
      {pageContent === PageContent.HOME && <HomePage key="home" />}
    </AnimatePresence>
  );
}
