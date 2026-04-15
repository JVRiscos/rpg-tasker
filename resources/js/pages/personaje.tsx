/**
 * Archivo: resources/js/pages/personaje.tsx
 * Propósito: Visualización detallada del perfil del jugador, estadísticas (RPG) y logros.
 */

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { personaje } from '@/routes';
import type { BreadcrumbItem } from '@/types';

// --- INTERFAZ DEL PERSONAJE ---
interface Character {
    id: number;
    name: string;
    job_class: string; // Ej: 'Guerrero', 'Mago', 'Aventurero'
    level: number;
    experience: number;
    str: number; // Fuerza
    int: number; // Inteligencia
    sta: number; // Vitalidad/Stamina
    def: number; // Defensa
}

interface PersonajeProps {
    character: Character | null;
}

// Configuración de las migas de pan (Breadcrumbs)
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personaje',
        href: personaje(),
    },
];

export default function Personaje({ character }: PersonajeProps) {
    // --- CÁLCULOS DE PROGRESO ---
    const currentLevel = character?.level || 1;
    const currentXP = character?.experience || 0;
    
    /** * Lógica de Curva de Nivel:
     * El máximo de XP necesario dobla cada nivel: Niv 1 (100), Niv 2 (200), Niv 3 (400)...
     */
    const maxXP = 100 * Math.pow(2, currentLevel - 1);
    
    // Calcula el porcentaje para la barra de nivel (CSS width)
    const progressPercent = Math.min((currentXP / maxXP) * 100, 100);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Mi Personaje">
                {/* Cargamos FontAwesome para los iconos de estadísticas */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    /* Variables de color específicas para la identidad visual del personaje */
                    :root {
                        --primary: #6366f1;
                        --secondary: #a855f7;
                        --success: #22c55e;
                        --accent: #f59e0b;
                    }

                    /* ... estilos de layout ... */

                    .bar-fill {
                        background: linear-gradient(90deg, var(--primary), var(--secondary));
                        height: 100%;
                        transition: width 0.5s ease-in-out; /* Transición suave al ganar XP */
                    }

                    .stats-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                    }
                `}</style>

                <main>
                    {/* SECCIÓN 1: Header de Identidad y Barra de XP */}
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
                        {/* Resumen rápido de atributos */}
                        <div>
                            <strong>Atributos:</strong>
                            <br />
                            <small>STR: {character?.str || 10} | INT: {character?.int || 10} | VIT: {character?.sta || 10}</small>
                        </div>
                    </section>

                    {/* SECCIÓN 2: Desglose de Atributos */}
                    <div className="card">
                        <h3 style={{ textAlign: 'left', marginTop: 0 }}>
                            <i className="fa-solid fa-user-shield" style={{ color: 'var(--accent)' }} /> Atributos del Héroe
                        </h3>

                        <div className="stats-container">
                            {/* Card: Fuerza */}
                            <div className="stat-card">
                                <div className="stat-icon"><i className="fa-solid fa-dumbbell" /></div>
                                <div className="stat-info">
                                    <h4>Fuerza (STR)</h4>
                                    <p>{character?.str || 10}</p>
                                </div>
                            </div>
                            
                            {/* Card: Inteligencia */}
                            <div className="stat-card">
                                <div className="stat-icon"><i className="fa-solid fa-brain" /></div>
                                <div className="stat-info">
                                    <h4>Inteligencia (INT)</h4>
                                    <p>{character?.int || 10}</p>
                                </div>
                            </div>

                            {/* Card: Vitalidad */}
                            <div className="stat-card">
                                <div className="stat-icon"><i className="fa-solid fa-heart" /></div>
                                <div className="stat-info">
                                    <h4>Vitalidad (VIT)</h4>
                                    <p>{character?.sta || 10}</p>
                                </div>
                            </div>
                        </div>

                        {/* Banner de Level Up (Solo visible si hay puntos pendientes) */}
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

                    {/* SECCIÓN 3: Logros (Hardcoded por ahora) */}
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