import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
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
