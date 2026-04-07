import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FormNewTask } from '@/components/form-new-task';
import { misiones } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tarea } from '@/components/ui/tarea';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Misiones',
        href: misiones(),
    },
];

export default function Misiones() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Misiones">
                
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
                            <FormNewTask />
                        </div>
                    </header>

                    <section className="quest-section">
                        <h3>
                            <i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} />
                            Misiones Principales
                        </h3>
                        <Tarea frequency="once" />
                        <Tarea frequency="daily" />
                        <Tarea frequency="weekly" />
                        <Tarea frequency="weekly" />
                        <Tarea frequency="weekly" />
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
