/*
 * Archivo: resources/js/pages/bitacora.tsx
 * Propósito: Gestionar el bucle principal de juego (Listado de tareas + Progreso de personaje).
 */

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { bitacora } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tarea } from '@/components/ui/tarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';

// --- INTERFACES DE DATOS ---
// Definen la estructura de los objetos que llegan desde el Controlador de Laravel.

interface Task {
    id: number;
    title: string;
    description: string | null;
    frequency: 'daily' | 'weekly' | 'once';
    is_completed: boolean;
    category: {
        id: number;
        name: string;
        base_xp: number;
        linked_stat: string; // Ej: 'STR', 'INT', 'STA'
    };
}

interface Category {
    id: number;
    name: string;
    base_xp: number;
    linked_stat: string;
}

interface BitacoraProps {
    tasks: {
        daily?: Task[];
        weekly?: Task[];
        once?: Task[];
    };
    categories: Category[];
    character: {
        id: number;
        name: string;
        job_class: string;
        level: number;
        experience: number;
        str: number;
        int: number;
        sta: number;
        def: number;
    } | null;
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bitácora',
        href: bitacora(),
    },
];

export default function Bitacora({ tasks, categories, character }: BitacoraProps) {
    // Evita errores si 'tasks' llega nulo desde el backend.
    const groupedTasks = tasks || {};

    // --- LÓGICA DE NIVEL (SISTEMA RPG) ---
    const currentLevel = character?.level || 1;
    const currentXP = character?.experience || 0;
    
    // Fórmula de escalado: El nivel 1 requiere 100XP, el nivel 2 requiere 200XP, etc.
    const maxXP = 100 * Math.pow(2, currentLevel - 1);
    
    // Calcula el porcentaje de la barra de progreso (mínimo 0, máximo 100).
    const progressPercent = Math.min((currentXP / maxXP) * 100, 100);

    // --- ACCIONES DE TAREAS ---

    // Maneja la "completitud". Actualmente hace un DELETE porque la tarea 
    // se consume para dar la recompensa al personaje.
    const handleComplete = (id: number, isCompleted: boolean) => {
        router.delete(`/tasks/${id}`, {
            preserveScroll: true, // Mantiene la posición del scroll para no perder el foco
            onSuccess: () => {
                router.reload(); // Refresca los props para actualizar la XP del personaje
            }
        });
    };

    // Estado local para el formulario de creación de misiones.
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        frequency: '',
    });

    // Actualizador genérico de campos del formulario.
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Limpia el formulario tras un éxito.
    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category_id: '',
            frequency: '',
        });
    };

    // Envío del formulario a Laravel mediante Inertia.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: formData.name,
            description: formData.description,
            category_id: parseInt(formData.category_id, 10) || null,
            frequency: formData.frequency,
            is_completed: false,
        };

        router.post('/tasks', payload, {
            preserveScroll: true,
            onSuccess: () => {
                resetForm();
                // Forzamos recarga para asegurar que el componente Tarea y el Header se sincronicen
                window.location.reload(); 
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Bitácora" />

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                {/* Estilos CSS "in-page" para componentes de juego específicos */}
                <style>{`
                    /* ... tus estilos de CSS ... */
                `}</style>

                <main>
                    {/* HEADER: Visualización del estado del Personaje */}
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
                                {/* Barra de XP dinámica basada en el cálculo de arriba */}
                                <div className="bar-fill" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                        <div>
                            <strong>Atributos:</strong><br />
                            <small>STR: {character?.str} | INT: {character?.int} | VIT: {character?.sta}</small>
                        </div>
                    </section>

                    <div className="task-grid">
                        {/* LISTADO DE MISIONES: Clasificadas por frecuencia */}
                        <section className="card">
                            
                            {/* Misiones Únicas */}
                            <section className="quest-section">
                                <h3><i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} /> Misiones Principales</h3>
                                {groupedTasks.once?.map((task) => (
                                    <Tarea isCompleted={false} key={task.id} {...task} onComplete={() => handleComplete(task.id, task.is_completed)} />
                                ))}
                                {(!groupedTasks.once?.length) && <p className="text-gray-500 text-center py-4">Sin misiones activas.</p>}
                            </section>

                            {/* Misiones Diarias */}
                            <section className="quest-section">
                                <h3><i className="fa-solid fa-calendar-day" style={{ color: 'var(--primary)' }} /> Misiones Diarias</h3>
                                {groupedTasks.daily?.map((task) => (
                                    <Tarea isCompleted={false} key={task.id} {...task} onComplete={() => handleComplete(task.id, task.is_completed)} />
                                ))}
                            </section>

                        </section>

                        {/* FORMULARIO: Creador de nuevas tareas (Invocador) */}
                        <section className="card">
                            <h3>Nueva Misión</h3>
                            <form onSubmit={handleSubmit}>
                                {/* ... inputs con handleInputChange ... */}
                                <button type="submit" className="button-primary">Invocar Tarea</button>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}