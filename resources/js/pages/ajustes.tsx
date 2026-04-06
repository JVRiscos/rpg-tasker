import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ajustes } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes',
        href: ajustes(),
    },
];

export default function Ajustes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Ajustes">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    :root {
                        --primary: #6366f1;
                        --dark: #1e1e2e;
                        --light: #f8fafc;
                        --danger: #ef4444;
                        --border: #e2e8f0;
                    }

                    main {
                        overflow-y: auto;
                    }

                    .settings-container {
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    .settings-section {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                        margin-bottom: 25px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        border: 1px solid var(--border);
                    }

                    .settings-section h3 {
                        margin-top: 0;
                        color: var(--dark);
                        border-bottom: 1px solid var(--border);
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }

                    .setting-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px 0;
                        border-bottom: 1px solid #f1f5f9;
                    }

                    .setting-row:last-child {
                        border: none;
                    }

                    .setting-info h4 {
                        margin: 0;
                        font-size: 1rem;
                        color: #334155;
                    }

                    .setting-info p {
                        margin: 5px 0 0;
                        font-size: 0.85rem;
                        color: #64748b;
                    }

                    input[type="text"],
                    input[type="email"],
                    input[type="password"] {
                        padding: 8px 12px;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        width: 250px;
                    }

                    .switch {
                        position: relative;
                        display: inline-block;
                        width: 40px;
                        height: 20px;
                    }

                    .switch input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #cbd5e1;
                        transition: .4s;
                        border-radius: 20px;
                    }

                    input:checked + .slider {
                        background-color: var(--primary);
                    }

                    .slider:before {
                        position: absolute;
                        content: "";
                        height: 14px;
                        width: 14px;
                        left: 3px;
                        bottom: 3px;
                        background-color: white;
                        transition: .4s;
                        border-radius: 50%;
                    }

                    input:checked + .slider:before {
                        transform: translateX(20px);
                    }

                    .btn-save {
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        margin-top: 10px;
                    }

                    .btn-danger {
                        background: white;
                        color: var(--danger);
                        border: 1px solid var(--danger);
                        padding: 8px 15px;
                        border-radius: 6px;
                        cursor: pointer;
                    }

                    .btn-danger:hover {
                        background: var(--danger);
                        color: white;
                    }
                `}</style>

                <main>
                    <div className="settings-container">
                        

                        <section className="settings-section">
                            <h3>
                                <i className="fa-solid fa-user-gear" />
                                Cuenta y Perfil
                            </h3>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Correo Electrónico</h4>
                                    <p>Se utiliza para notificaciones y recuperación.</p>
                                </div>
                                <input type="email" defaultValue="usuario@ejemplo.com" />
                            </div>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Contraseña</h4>
                                    <p>Cambia tu clave de acceso periódicamente.</p>
                                </div>
                                <button className="btn-save" style={{ background: '#e2e8f0', color: '#475569' }} type="button">
                                    Cambiar
                                </button>
                            </div>
                            <button className="btn-save" type="button">
                                Guardar Cambios
                            </button>
                        </section>

                        <section className="settings-section">
                            <h3>
                                <i className="fa-solid fa-gamepad" />
                                Preferencias de Juego
                            </h3>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Modo Difícil</h4>
                                    <p>Duplica la pérdida de XP si una tarea vence.</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider" />
                                </label>
                            </div>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Notificaciones de Logros</h4>
                                    <p>Recibe una alerta visual al subir de nivel.</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider" />
                                </label>
                            </div>
                        </section>

                        <section className="settings-section" style={{ borderColor: '#fecaca' }}>
                            <h3 style={{ color: 'var(--danger)' }}>
                                <i className="fa-solid fa-triangle-exclamation" />
                                Zona de Peligro
                            </h3>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Reiniciar Personaje</h4>
                                    <p>Vuelve al Nivel 1 y borra todas tus estadísticas (Acción irreversible).</p>
                                </div>
                                <button className="btn-danger" type="button">
                                    Reiniciar
                                </button>
                            </div>
                            <div className="setting-row">
                                <div className="setting-info">
                                    <h4>Eliminar Cuenta</h4>
                                    <p>Borra permanentemente todos tus datos del sistema.</p>
                                </div>
                                <button className="btn-danger" style={{ background: 'var(--danger)', color: 'white' }} type="button">
                                    Eliminar
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
