import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { bitacora } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tarea } from '@/components/ui/tarea';
import { useState } from 'react';
import { router } from '@inertiajs/react';

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
        linked_stat: string;
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
    const groupedTasks = tasks || {};

    const currentLevel = character?.level || 1;
    const currentXP = character?.experience || 0;
    const maxXP = 100 * Math.pow(2, currentLevel - 1);
    const progressPercent = Math.min((currentXP / maxXP) * 100, 100);

    const handleComplete = (id: number, isCompleted: boolean) => {
        router.delete(`/tasks/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            }
        });
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        frequency: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category_id: '',
            frequency: '',
        });
    };

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
                window.location.reload();
            },
        });
    };

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

                    .form-group {
                        margin-bottom: 15px;
                    }

                    label {
                        display: block;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }

                    input,
                    select,
                    textarea {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        box-sizing: border-box;
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

                    <div className="task-grid">
                        <section className="card">
                            <section className="quest-section">
                                <h3>
                                    <i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} />
                                    Misiones Principales
                                </h3>
                                {groupedTasks.once?.map((task) => (
                                    <Tarea
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        frequency={task.frequency}
                                        isCompleted={task.is_completed}
                                        category={task.category}
                                        onComplete={() => handleComplete(task.id, task.is_completed)}
                                        showOnlyComplete={true}
                                    />
                                ))}
                                {(!groupedTasks.once || groupedTasks.once.length === 0) && (
                                    <p className="text-gray-500 text-center py-8">
                                        No tienes misiones principales activas.
                                    </p>
                                )}
                            </section>

                            <section className="quest-section">
                                <h3>
                                    <i className="fa-solid fa-calendar-day" style={{ color: 'var(--primary)' }} />
                                    Misiones Diarias
                                </h3>
                                {groupedTasks.daily?.map((task) => (
                                    <Tarea
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        frequency={task.frequency}
                                        isCompleted={task.is_completed}
                                        category={task.category}
                                        onComplete={() => handleComplete(task.id, task.is_completed)}
                                        showOnlyComplete={true}
                                    />
                                ))}
                                {(!groupedTasks.daily || groupedTasks.daily.length === 0) && (
                                    <p className="text-gray-500 text-center py-8">
                                        No tienes misiones diarias activas.
                                    </p>
                                )}
                            </section>

                            <section className="quest-section">
                                <h3>
                                    <i className="fa-solid fa-calendar-week" style={{ color: '#10b981' }} />
                                    Misiones Semanales
                                </h3>
                                {groupedTasks.weekly?.map((task) => (
                                    <Tarea
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        frequency={task.frequency}
                                        isCompleted={task.is_completed}
                                        category={task.category}
                                        onComplete={() => handleComplete(task.id, task.is_completed)}
                                        showOnlyComplete={true}
                                    />
                                ))}
                                {(!groupedTasks.weekly || groupedTasks.weekly.length === 0) && (
                                    <p className="text-gray-500 text-center py-8">
                                        No tienes misiones semanales activas.
                                    </p>
                                )}
                            </section>
                        </section>

                        <section className="card">
                            <h3>Nueva Misión</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre de la tarea</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Limpiar habitación"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Descripción (opcional)</label>
                                    <textarea
                                        placeholder="Detalles de la tarea..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select
                                        value={formData.category_id}
                                        onChange={(e) => handleInputChange('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Frecuencia</label>
                                    <select
                                        value={formData.frequency}
                                        onChange={(e) => handleInputChange('frequency', e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar frecuencia</option>
                                        <option value="once">Única</option>
                                        <option value="daily">Diaria</option>
                                        <option value="weekly">Semanal</option>
                                    </select>
                                </div>

                                <button type="submit" className="primary">
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
