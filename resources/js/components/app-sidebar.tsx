import { Link } from '@inertiajs/react';
import { BookOpen, BookOpenCheck, FolderGit2, LayoutGrid, ListCheck, Settings, Shield, Store, Swords } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { bitacora, personaje, tienda, misiones, ajustes } from '@/routes';
import type { NavItem } from '@/types';
import { store } from '@/routes/login';

const mainNavItems: NavItem[] = [

    {
        title: 'Bitácora',
        href: bitacora(),
        icon: BookOpenCheck
    },
    {
        title: 'Personaje',
        href: personaje(),
        icon: Swords


    },
    {
        title: 'Tienda',
        href: tienda(),
        icon: Store


    },
    {
        title: 'Misiones',
        href: misiones(),
        icon: ListCheck


    },


];

const footerNavItems: NavItem[] = [
    {
        title: 'Ajustes',
        href: ajustes(),
        icon: Settings
        
    },
    
];

export function AppSidebar() {
    return (
        <>
            <style>{`
                :root {
                    --primary: #6366f1;
                    --secondary: #a855f7;
                    --dark: #1e1e2e;
                    --light: #f8fafc;
                    --sidebar-bg: #1e1e2e;
                    --sidebar-foreground: #f8fafc;
                    --sidebar-accent: #6366f1;
                    --sidebar-accent-foreground: #ffffff;
                    --sidebar-border: rgba(255,255,255,0.08);
                }

                [data-sidebar="sidebar"] {
                    background-color: var(--sidebar-bg) !important;
                    color: var(--sidebar-foreground) !important;
                }

                [data-sidebar="sidebar"] [data-slot="sidebar-content"] {
                    background-color: transparent !important;
                }

                [data-sidebar="sidebar"] [data-slot="sidebar-header"],
                [data-sidebar="sidebar"] [data-slot="sidebar-footer"] {
                    padding: 1rem;
                }

                [data-sidebar="sidebar"] [class*="peer/menu-button"],
                [data-sidebar="sidebar"] .text-sidebar-foreground {
                    color: var(--sidebar-foreground) !important;
                }

                [data-sidebar="sidebar"] [class*="peer/menu-button"]:hover,
                [data-sidebar="sidebar"] [class*="peer/menu-button"][data-active="true"] {
                    background-color: var(--sidebar-accent) !important;
                    color: var(--sidebar-accent-foreground) !important;
                }

                [data-sidebar="sidebar"] [class*="peer/menu-button"][data-active="true"] {
                    font-weight: 600;
                }

                [data-slot="sidebar-content"] {
                    background-color: transparent;
                }

                [data-slot="sidebar-inset"] {
                    background-color: var(--light);
                }
            `}</style>
            
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={bitacora()} prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                <SidebarFooter>
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}
