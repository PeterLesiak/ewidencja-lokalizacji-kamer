'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useMemo, type ComponentProps } from 'react';

import { Link } from '@/components/blockable-link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function SiteHeader({ className, ...props }: ComponentProps<'header'>) {
  const pathname = usePathname();

  const paths = useMemo(
    () => pathname.split('/').filter(path => path.length > 0),
    [pathname],
  );

  return (
    <header
      className={cn(
        'flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        {paths.length > 0 ? (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 my-auto data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => (
                  <Fragment key={path}>
                    {index > 0 ? <BreadcrumbSeparator /> : null}

                    {index === paths.length - 1 ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-base font-medium capitalize">
                          {path}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <BreadcrumbItem className="text-base font-medium capitalize">
                        <BreadcrumbLink
                          render={
                            <Link
                              href={`/${paths.reduce((acc, cur, idx) => (idx < index ? acc + cur : acc))}`}
                            >
                              {path}
                            </Link>
                          }
                        />
                      </BreadcrumbItem>
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        ) : null}
      </div>
    </header>
  );
}
