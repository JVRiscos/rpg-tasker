import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ajustes } from '@/routes';
import type { BreadcrumbItem } from '@/types';

/**
 * Configuración del Breadcrumb para mejorar la navegación (SEO y UX).
 */
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes',
        href: ajustes(),
    },
];

/**
 * Componente Ajustes: Gestiona la configuración del perfil y las reglas de gamificación.
 * Utiliza una estética limpia basada en Cards para organizar la información.
 */
export default function Ajustes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Ajustes">
                {/* Importación de FontAwesome para iconografía enriquecida */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    /* Variables de color personalizadas para mantener la consistencia visual */
                    :root {
                        --primary: #6366f1;
                        --dark: #1e1e2e;
                        --danger: #ef4444;
                        --border: #e2e8f0;
                    }

                    .settings-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 2rem 1rem;
                    }

                    /* Diseño de secciones tipo 'Card' para una interfaz clara y moderna */
                    .settings-section {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                        margin-bottom: 25px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        border: 1px solid var(--border);
                    }

                    /* Estilización de los Switches (interruptores) de preferencias */
                    .switch {
                        position: relative;
                        display: inline-block;
                        width: 40px;
                        height: 20px;
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background-color: #cbd5e1;
                        transition: .4s;
                        border-radius: 20px;
                    }

                    input:checked + .slider {
                        background-color: var(--primary);
                    }
                `}</style>

                <main>
                    <div className="settings-container">
                        
                        {/* SECCIÓN 1: Gestión de Identidad */}
                        <section className="settings-section">
                            <h3>
                                <i className="fa-solid fa-user-gear mr-2" />
                                Cuenta y Perfil
                            </h3>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Correo Electrónico</h4>
                                    <p>Se utiliza para notificaciones y recuperación.</p>
                                </div>
                                <input type="email" defaultValue="usuario@ejemplo.com" className="focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <button className="btn-save mt-4" type="button">
                                Guardar Cambios
                            </button>
                        </section>

                        {/* SECCIÓN 2: Lógica de Gamificación. 
                            Aquí es donde el proyecto se diferencia de una To-Do list normal. */}
                        <section className="settings-section">
                            <h3>
                                <i className="fa-solid fa-gamepad mr-2" />
                                Preferencias de Juego
                            </h3>
                            <div className="setting-row flex justify-between items-center py-4 border-b border-slate-50">
                                <div className="setting-info">
                                    <h4>Modo Difícil</h4>
                                    <p>Duplica la pérdida de XP si una tarea vence.</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider" />
                                </label>
                            </div>
                        </section>

                        {/* SECCIÓN 3: Zona de Peligro. 
                            Acciones críticas resaltadas en rojo para prevenir errores del usuario. */}
                        <section className="settings-section border-red-200 bg-red-50/30">
                            <h3 className="text-red-600">
                                <i className="fa-solid fa-triangle-exclamation mr-2" />
                                Zona de Peligro
                            </h3>
                            <div className="setting-row flex justify-between items-center py-4">
                                <div className="setting-info">
                                    <h4>Reiniciar Personaje</h4>
                                    <p>Vuelve al Nivel 1 y borra todas tus estadísticas (Acción irreversible).</p>
                                </div>
                                <button className="btn-danger" type="button">
                                    Reiniciar
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}