import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { misiones } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Misiones',
        href: misiones(),
    },
];

export default function Misiones() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Tablón de Misiones">
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
                        --accent: #f59e0b;
                    }

                    main {
                        overflow-y: auto;
                    }

                    .filter-bar {
                        background: white;
                        padding: 15px 25px;
                        border-radius: 12px;
                        margin-bottom: 25px;
                        margin-top: 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }

                    .quest-section {
                        margin-bottom: 40px;
                    }

                    .quest-section h3 {
                        color: #475569;
                        border-bottom: 2px solid #e2e8f0;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .quest-card {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        transition: transform 0.2s;
                        border-left: 5px solid #cbd5e1;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }

                    .quest-card:hover {
                        transform: translateX(5px);
                    }

                    .quest-main {
                        border-left-color: var(--accent);
                    }

                    .quest-daily {
                        border-left-color: var(--primary);
                    }

                    .quest-icon {
                        width: 50px;
                        height: 50px;
                        background: #f1f5f9;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        margin-right: 20px;
                    }

                    .quest-content {
                        flex: 1;
                    }

                    .quest-content h4 {
                        margin: 0 0 5px 0;
                        color: var(--dark);
                    }

                    .quest-content p {
                        margin: 0;
                        font-size: 0.9rem;
                        color: #64748b;
                    }

                    .quest-reward {
                        text-align: right;
                        min-width: 120px;
                    }

                    .reward-xp {
                        color: var(--primary);
                        font-weight: bold;
                        display: block;
                    }

                    .btn-actions {
                        display: flex;
                        gap: 10px;
                        margin-left: 20px;
                    }

                    .btn-icon {
                        background: #f1f5f9;
                        border: none;
                        padding: 10px;
                        border-radius: 8px;
                        cursor: pointer;
                        color: #64748b;
                    }

                    .btn-icon:hover {
                        background: #e2e8f0;
                        color: var(--danger);
                    }

                    .filter-bar input {
                        border: none;
                        outline: none;
                        width: 80%;
                        padding: 5px;
                    }

                    .filter-bar select {
                        padding: 5px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                    }

                    .btn-new-quest {
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 8px;
                        cursor: pointer;
                    }
                `}</style>

                <main style={{ padding: '0 30px 30px 30px' }}>
                    <header className="filter-bar">
                        <div style={{ flex: 1 }}>
                            <i className="fa-solid fa-magnifying-glass" />
                            <input type="text" placeholder="Buscar misiones..." />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <select>
                                <option>Todas las categorías</option>
                                <option>Trabajo</option>
                                <option>Salud</option>
                                <option>Estudios</option>
                            </select>
                            <button className="btn-new-quest" type="button">
                                + Nueva Misión
                            </button>
                        </div>
                    </header>

                    <section className="quest-section">
                        <h3>
                            <i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} />
                            Misiones Principales
                        </h3>

                        <div className="quest-card quest-main">
                            <div className="quest-icon">
                                <i className="fa-solid fa-code" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div className="quest-content">
                                <h4>Finalizar Proyecto DAW</h4>
                                <p>Entregar la documentación y el código fuente antes de la fecha límite.</p>
                            </div>
                            <div className="quest-reward">
                                <span className="reward-xp">+500 INT XP</span>
                                <small>Dificultad: Épica</small>
                            </div>
                            <div className="btn-actions">
                                <button className="btn-icon" type="button">
                                    <i className="fa-solid fa-pen-to-square" />
                                </button>
                                <button className="btn-icon" type="button">
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="quest-section">
                        <h3>
                            <i className="fa-solid fa-calendar-day" style={{ color: 'var(--primary)' }} />
                            Misiones Diarias
                        </h3>

                        <div className="quest-card quest-daily">
                            <div className="quest-icon">
                                <i className="fa-sharp fa-solid fa-person-running" style={{ color: 'var(--primary)' }} />
                            </div>
                            <div className="quest-content">
                                <h4>Caminar 30 minutos</h4>
                                <p>Mantén tu vitalidad alta para las batallas diarias.</p>
                            </div>
                            <div className="quest-reward">
                                <span className="reward-xp">+25 VIT XP</span>
                                <small>Frecuencia: Diaria</small>
                            </div>
                            <div className="btn-actions">
                                <button className="btn-icon" type="button">
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                        </div>

                        <div className="quest-card quest-daily">
                            <div className="quest-icon">
                                <i className="fa-solid fa-book" style={{ color: 'var(--primary)' }} />
                            </div>
                            <div className="quest-content">
                                <h4>Lectura Técnica</h4>
                                <p>Leer 10 páginas de documentación oficial de Laravel.</p>
                            </div>
                            <div className="quest-reward">
                                <span className="reward-xp">+15 INT XP</span>
                                <small>Frecuencia: Diaria</small>
                            </div>
                            <div className="btn-actions">
                                <button className="btn-icon" type="button">
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </AppLayout>
    );
}
