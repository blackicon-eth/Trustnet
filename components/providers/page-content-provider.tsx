"use client";

import { PageContent } from "@/lib/enums";
import { createContext, ReactNode, useContext, useState } from "react";

const PageContentContext = createContext<
  | {
      pageContent: PageContent;
      setPageContent: (content: PageContent) => void;
    }
  | undefined
>(undefined);

export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (!context) {
    throw new Error("usePageContent must be used within a PageContentProvider");
  }
  return context;
};

export const PageContentProvider = ({ children }: { children: ReactNode }) => {
  const [pageContent, setPageContent] = useState<PageContent>(PageContent.HOME);

  return (
    <PageContentContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContentContext.Provider>
  );
};
