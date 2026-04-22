/* @jsxRuntime automatic */
import { ThemeProvider } from "next-themes";

import { Toaster } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";

import type { Preview } from "@storybook/react";

import "../src/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Story />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
