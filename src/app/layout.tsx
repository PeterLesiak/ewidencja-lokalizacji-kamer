import { Geist_Mono, Roboto } from 'next/font/google';
import type { CSSProperties, PropsWithChildren } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { NavigationBlockerProvider } from '@/components/blockable-link';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Authorization } from '@/components/authorization';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { composeWrappers } from '@/lib/compose-wrappers';
import { QueryClientProvider } from '@/lib/query-client-provider';
import { cn } from '@/lib/utils';
import './globals.css';

const notoSans = Roboto({ variable: '--font-sans' });
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: PropsWithChildren) {
  const StackedProvider = composeWrappers([
    props => <NavigationBlockerProvider {...props} />,
    props => <ThemeProvider {...props} />,
    props => <TooltipProvider {...props} />,
    props => <QueryClientProvider {...props} />,
    props => <Authorization {...props} />,
    props => (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as CSSProperties
        }
        {...props}
      />
    ),
  ]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', notoSans.variable)}
    >
      <body>
        <StackedProvider>
          <AppSidebar />

          <SidebarInset>
            <SiteHeader />

            {children}
          </SidebarInset>
        </StackedProvider>
      </body>
    </html>
  );
}
