import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personaje',
        href: dashboard(),
    },
];

export default function Personaje() {
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
                        --warning: #f59e0b;
                    }

                    main {
                        overflow-y: auto;
                    }

                    .profile-grid {
                        display: grid;
                        grid-template-columns: 350px 1fr;
                        gap: 30px;
                    }

                    .card {
                        background: white;
                        padding: 25px;
                        border-radius: 15px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                        text-align: center;
                    }

                    .avatar-large {
                        width: 180px;
                        height: 180px;
                        background: #e2e8f0;
                        border-radius: 20px;
                        margin: 0 auto 20px;
                        border: 4px solid var(--secondary);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 4rem;
                        color: #94a3b8;
                    }

                    .level-badge {
                        background: var(--secondary);
                        color: white;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-weight: bold;
                        font-size: 1.1rem;
                    }

                    .stats-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
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

                <div>
                    <main>
                        <div className="profile-grid">
                            <aside className="card">
                                <div className="avatar-large">
                                    <i className="fa-solid fa-user-ninja" />
                                </div>
                                <h2>Nombre de Usuario</h2>
                                <p>
                                    <span className="level-badge">NIVEL 12</span>
                                </p>
                                <p style={{ color: '#64748b' }}>Clase: Guerrero del Código</p>

                                <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '20px 0' }} />

                                <div style={{ textAlign: 'left' }}>
                                    <small>Experiencia Total: 12,450 XP</small>
                                    <div
                                        style={{
                                            background: '#e2e8f0',
                                            height: '8px',
                                            borderRadius: '4px',
                                            marginTop: '5px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: 'var(--primary)',
                                                width: '65%',
                                                height: '100%',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </aside>

                            <section>
                                <div className="card">
                                    <h3 style={{ textAlign: 'left', marginTop: 0 }}>
                                        <i className="fa-solid fa-chart-simple" /> Atributos del Héroe
                                    </h3>

                                    <div className="stats-container">
                                        <div className="stat-card">
                                            <div className="stat-icon">
                                                <i className="fa-solid fa-dumbbell" />
                                            </div>
                                            <div className="stat-info">
                                                <h4>Fuerza (STR)</h4>
                                                <p>15</p>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">
                                                <i className="fa-solid fa-brain" />
                                            </div>
                                            <div className="stat-info">
                                                <h4>Inteligencia (INT)</h4>
                                                <p>22</p>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">
                                                <i className="fa-solid fa-heart" />
                                            </div>
                                            <div className="stat-info">
                                                <h4>Vitalidad (VIT)</h4>
                                                <p>10</p>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">
                                                <i className="fa-solid fa-clover" />
                                            </div>
                                            <div className="stat-info">
                                                <h4>Suerte (LCK)</h4>
                                                <p>5</p>
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
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
