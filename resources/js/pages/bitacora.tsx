import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { bitacora } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bitácora',
        href: bitacora(),
    },
];

export default function Bitacora() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Bitácora">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    :root {
                        --primary: #6366f1;
                        --secondary: #a855f7;
                        --dark: #1e1e2e;
                        --light: #f8fafc;
                        --success: #22c55e;
                    }

                    main {
                        overflow-y: auto;
                    }

                    .character-header {
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                        margin-bottom: 30px;
                    }

                    .avatar {
                        width: 80px;
                        height: 80px;
                        background: #ddd;
                        border-radius: 50%;
                        border: 3px solid var(--primary);
                    }

                    .stat-bar {
                        flex: 1;
                    }

                    .bar-bg {
                        background: #e2e8f0;
                        height: 12px;
                        border-radius: 6px;
                        overflow: hidden;
                        margin-top: 5px;
                    }

                    .bar-fill {
                        background: linear-gradient(90deg, var(--primary), var(--secondary));
                        height: 100%;
                        width: 65%;
                        transition: 0.5s;
                    }

                    .task-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 20px;
                    }

                    .card {
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }

                    .task-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 15px;
                        border-bottom: 1px solid #f1f5f9;
                    }

                    .task-item:last-child {
                        border: none;
                    }

                    .btn-complete {
                        background: var(--success);
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 6px;
                        cursor: pointer;
                    }

                    .form-group {
                        margin-bottom: 15px;
                    }

                    label {
                        display: block;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }

                    input,
                    select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        box-sizing: border-box;
                    }

                    button.primary {
                        width: 100%;
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background 0.3s;
                    }

                    button.primary:hover {
                        background: var(--secondary);
                    }
                `}</style>

                <main>
                    <section className="character-header">
                        <div className="avatar" />
                        <div className="stat-bar">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Nivel 12 - Guerrero</strong>
                                <span>XP: 1250 / 2000</span>
                            </div>
                            <div className="bar-bg">
                                <div className="bar-fill" />
                            </div>
                        </div>
                        <div>
                            <strong>Atributos:</strong>
                            <br />
                            <small>STR: 15 | INT: 10 | VIT: 12</small>
                        </div>
                    </section>

                    <div className="task-grid">
                        <section className="card">
                            <h3>Misiones Activas</h3>
                            <div className="task-list">
                                <div className="task-item">
                                    <div>
                                        <strong>Estudiar React Hooks</strong>
                                        <br />
                                        <small>
                                            <i className="fa-solid fa-brain" />
                                            +50 INT XP
                                        </small>
                                    </div>
                                    <button className="btn-complete" type="button">
                                        Completar
                                    </button>
                                </div>

                                <div className="task-item">
                                    <div>
                                        <strong>Entrenamiento de Fuerza</strong>
                                        <br />
                                        <small>
                                            <i className="fa-solid fa-dumbbell" />
                                            +100 STR XP
                                        </small>
                                    </div>
                                    <button className="btn-complete" type="button">
                                        Completar
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <h3>Nueva Misión</h3>
                            <form id="task-form">
                                <div className="form-group">
                                    <label>Nombre de la tarea</label>
                                    <input type="text" placeholder="Ej: Limpiar habitación" required />
                                </div>

                                <div className="form-group">
                                    <label>Atributo a potenciar</label>
                                    <select>
                                        <option value="STR">Fuerza (STR)</option>
                                        <option value="INT">Inteligencia (INT)</option>
                                        <option value="VIT">Vitalidad (VIT)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Dificultad (Recompensa)</label>
                                    <select>
                                        <option value="10">Fácil (10 XP)</option>
                                        <option value="50">Media (50 XP)</option>
                                        <option value="200">Épica (200 XP)</option>
                                    </select>
                                </div>

                                <button type="button" className="primary">
                                    Invocar Tarea
                                </button>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
