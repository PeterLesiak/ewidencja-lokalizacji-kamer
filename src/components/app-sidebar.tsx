'use client';

import type { ComponentProps } from 'react';
import {
  CctvIcon,
  ChartNoAxesCombinedIcon,
  ChevronRightIcon,
  CirclePlusIcon,
  CircleQuestionMarkIcon,
  CircleUserIcon,
  EllipsisIcon,
  HotelIcon,
  InfoIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  LogOutIcon,
  MessageCircleMoreIcon,
  ShieldUserIcon,
} from 'lucide-react';

import { Link } from '@/components/blockable-link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import logout from '@/actions/logout';
import { useUser } from '@/hooks/use-user';
import { useHasAdminRole } from '@/hooks/use-has-admin-role';

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, isMobile } = useSidebar();
  const { data: user } = useUser();
  const { data: hasAdminRole } = useHasAdminRole();

  const userAvatar = 'https://ui.shadcn.com/avatars/shadcn.jpg';

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <CirclePlusIcon />
              <span>Run Query</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" onClick={() => setOpenMobile(false)}>
              <SidebarMenuButton tooltip="Dashboard">
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/analytics" onClick={() => setOpenMobile(false)}>
              <SidebarMenuButton tooltip="Analytics">
                <ChartNoAxesCombinedIcon />
                <span>Analytics</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                defaultOpen
                className="group/collapsible"
                render={
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton tooltip="Infrastructures">
                          <HotelIcon />
                          <span>Infrastructures</span>
                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            render={
                              <Link
                                href="/infrastructures"
                                onClick={() => setOpenMobile(false)}
                              >
                                <span>Infrastructures</span>
                              </Link>
                            }
                          />
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            render={
                              <Link
                                href="/infrastructures/administrators"
                                onClick={() => setOpenMobile(false)}
                              >
                                <span>Administrators</span>
                              </Link>
                            }
                          />
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                }
              />
              <SidebarMenuItem>
                <Link href="/cameras" onClick={() => setOpenMobile(false)}>
                  <SidebarMenuButton>
                    <CctvIcon />
                    <span>Cameras</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {hasAdminRole ? (
          <SidebarGroup>
            <SidebarGroupLabel>
              <span>Admin Tools</span>
              <Badge className="ml-auto bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Requires admin
              </Badge>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/users" onClick={() => setOpenMobile(false)}>
                    <SidebarMenuButton>
                      <ShieldUserIcon />
                      <span>Manage Users</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/logs" onClick={() => setOpenMobile(false)}>
                    <SidebarMenuButton>
                      <LibraryBigIcon />
                      <span>Inspect Logs</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CircleQuestionMarkIcon />
                  <span>Get Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <InfoIcon />
                  <span>About</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userAvatar} alt={user?.firstName} />
                      <AvatarFallback className="rounded-lg">
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {user ? (
                        <>
                          <span className="truncate font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {user.login}
                          </span>
                        </>
                      ) : (
                        <Skeleton className="h-8" />
                      )}
                    </div>
                    <EllipsisIcon className="ml-auto size-4" />
                  </SidebarMenuButton>
                }
              />
              {user ? (
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={userAvatar} alt={user.firstName} />
                          <AvatarFallback className="rounded-lg">
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {user.login}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/account" onClick={() => setOpenMobile(false)}>
                      <DropdownMenuItem>
                        <CircleUserIcon />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <MessageCircleMoreIcon />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={logout}>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : null}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
