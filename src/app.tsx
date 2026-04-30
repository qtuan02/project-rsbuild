import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "@/app-routes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createQueryClient } from "@/libs/query-client";
import { QueryDevtools } from "@/libs/query-devtools";

export const App = () => {
  const [queryClient] = useState(createQueryClient);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NuqsAdapter>
              <AppRoutes />
            </NuqsAdapter>
          </BrowserRouter>
          <Toaster />
          <QueryDevtools />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
