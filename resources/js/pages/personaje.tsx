import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { personaje } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface Character {
    id: number;
    name: string;
    job_class: string;
    level: number;
    experience: number;
    str: number;
    int: number;
    sta: number;
    def: number;
}

interface PersonajeProps {
    character: Character | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personaje',
        href: personaje(),
    },
];

export default function Personaje({ character }: PersonajeProps) {
    const currentLevel = character?.level || 1;
    const currentXP = character?.experience || 0;
    const maxXP = 100 * Math.pow(2, currentLevel - 1);
    const progressPercent = Math.min((currentXP / maxXP) * 100, 100);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Mi Personaje">
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
                        --accent: #f59e0b;
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
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2.5rem;
                        color: #94a3b8;
                        flex-shrink: 0;
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

                    .stats-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 20px;
                    }

                    .card {
                        background: white;
                        padding: 25px;
                        border-radius: 15px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    }

                    .stat-card {
                        background: #f1f5f9;
                        padding: 15px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        border: 1px solid #e2e8f0;
                        text-align: left;
                    }

                    .stat-icon {
                        font-size: 1.5rem;
                        color: var(--primary);
                        width: 30px;
                    }

                    .stat-info h4 {
                        margin: 0;
                        color: #64748b;
                        font-size: 0.8rem;
                        text-transform: uppercase;
                    }

                    .stat-info p {
                        margin: 0;
                        font-size: 1.3rem;
                        font-weight: bold;
                    }

                    .points-banner {
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        margin-top: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .btn-upgrade {
                        background: white;
                        color: var(--primary);
                        border: none;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    }
                `}</style>

                <main>
                    <section className="character-header">
                        <div className="avatar">
                            <i className="fa-solid fa-user-ninja" />
                        </div>
                        <div className="stat-bar">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Nivel {currentLevel} - {character?.job_class || 'Aventurero'}</strong>
                                <span>XP: {currentXP.toLocaleString()} / {maxXP.toLocaleString()}</span>
                            </div>
                            <div className="bar-bg">
                                <div className="bar-fill" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                        <div>
                            <strong>Atributos:</strong>
                            <br />
                            <small>STR: {character?.str || 10} | INT: {character?.int || 10} | VIT: {character?.sta || 10}</small>
                        </div>
                    </section>

                    <div className="card">
                        <h3 style={{ textAlign: 'left', marginTop: 0 }}>
                            <i className="fa-solid fa-user-shield" style={{ color: 'var(--accent)' }} /> Atributos del Héroe
                        </h3>

                        <div className="stats-container">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-dumbbell" />
                                </div>
                                <div className="stat-info">
                                    <h4>Fuerza (STR)</h4>
                                    <p>{character?.str || 10}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-brain" />
                                </div>
                                <div className="stat-info">
                                    <h4>Inteligencia (INT)</h4>
                                    <p>{character?.int || 10}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fa-solid fa-heart" />
                                </div>
                                <div className="stat-info">
                                    <h4>Vitalidad (VIT)</h4>
                                    <p>{character?.sta || 10}</p>
                                </div>
                            </div>
                        </div>

                        <div className="points-banner">
                            <div>
                                <strong>¡Has subido de nivel!</strong>
                                <br />
                                <small>Tienes 3 puntos de estadística para asignar.</small>
                            </div>
                            <button className="btn-upgrade" type="button">
                                Asignar Puntos
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'left', marginTop: 0 }}>
                            <i className="fa-solid fa-award" /> Logros Recientes
                        </h3>
                        <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <i className="fa-solid fa-check-circle" style={{ color: 'var(--success)' }} />{' '}
                                <strong>Madrugador:</strong> Completaste 5 tareas antes de las 9:00 AM.
                            </li>
                            <li style={{ padding: '10px 0' }}>
                                <i className="fa-solid fa-check-circle" style={{ color: 'var(--success)' }} />{' '}
                                <strong>Erudito:</strong> Subiste Inteligencia a nivel 20.
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}

