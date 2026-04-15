import { Link } from '@inertiajs/react';
// Importación de iconos temáticos para reforzar la identidad visual (RPG/Gamificación)
import { BookOpenCheck, ListCheck, Settings, Store, Swords } from 'lucide-react';
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

/**
 * mainNavItems: Definición de la navegación principal.
 * He seleccionado iconos de 'lucide-react' que evocan un RPG: 
 * 'Swords' para el Personaje y 'ListCheck' para las Misiones.
 */
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

/**
 * footerNavItems: Navegación secundaria ubicada en la base del sidebar.
 */
const footerNavItems: NavItem[] = [
    {
        title: 'Ajustes',
        href: ajustes(),
        icon: Settings
    },
];

/**
 * AppSidebar: Componente de barra lateral principal.
 * Implementa una arquitectura basada en slots (Header, Content, Footer) 
 * para mantener la organización y facilitar el mantenimiento.
 */
export function AppSidebar() {
    return (
        <>
            {/* Inyección de estilos CSS específicos para el Sidebar.
                He personalizado las variables de color (:root) para conseguir un 
                aspecto "Dark Mode" elegante que resalte la temática del proyecto.
            */}
            <style>{`
                :root {
                    --primary: #6366f1;
                    --sidebar-bg: #1e1e2e;
                    --sidebar-foreground: #f8fafc;
                    --sidebar-accent: #6366f1;
                    --sidebar-accent-foreground: #ffffff;
                }

                /* Estilización personalizada para el componente Sidebar de shadcn */
                [data-sidebar="sidebar"] {
                    background-color: var(--sidebar-bg) !important;
                    color: var(--sidebar-foreground) !important;
                }

                /* Efectos de Hover y Estados Activos para mejorar la interacción (UX) */
                [data-sidebar="sidebar"] [class*="peer/menu-button"]:hover,
                [data-sidebar="sidebar"] [class*="peer/menu-button"][data-active="true"] {
                    background-color: var(--sidebar-accent) !important;
                    color: var(--sidebar-accent-foreground) !important;
                    font-weight: 600;
                }
            `}</style>
            
            {/* Componente Sidebar principal con variante 'inset' para un diseño más aireado */}
            <Sidebar collapsible="icon" variant="inset">
                {/* Cabecera: Contiene el logo de la aplicación con enlace a la bitácora */}
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

                {/* Contenido: Renderiza los elementos de navegación principal */}
                <SidebarContent>
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                {/* Pie: Opciones de configuración y perfil de usuario autenticado */}
                <SidebarFooter>
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}