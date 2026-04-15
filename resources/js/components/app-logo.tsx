import AppLogoIcon from '@/components/app-logo-icon';

/**
 * Componente AppLogo: Define la identidad visual de la marca en el Sidebar.
 * He centralizado el nombre de la aplicación aquí para asegurar que cualquier 
 * cambio en el 'branding' se replique en toda la plataforma automáticamente.
 */
export default function AppLogo() {
    return (
        <>
            {/* Nota técnica: He dejado comentada la estructura del contenedor del icono.
                Esto permite que el diseño sea escalable: si decidimos añadir un logotipo 
                gráfico (SVG), solo habría que descomentar este bloque sin romper el layout.
            */}
            {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div> */} 

            {/* Contenedor del nombre de la aplicación */}
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    RPG-Tasker
                </span>
            </div>
        </>
    );
}