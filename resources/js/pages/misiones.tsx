import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FormNewTask } from '@/components/form-new-task';
import { misiones } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tarea } from '@/components/ui/tarea';

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

interface MisionesProps {
    tasks: {
        daily?: Task[];
        weekly?: Task[];
        once?: Task[];
    };
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Misiones',
        href: misiones(),
    },
];

export default function Misiones({ tasks, categories }: MisionesProps) {
    // Agrupar tareas por frecuencia si no vienen agrupadas
    const groupedTasks = tasks || {};
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

    const filterTasks = (list?: Task[]) => {
        if (!list) return [];
        return list.filter((t) => {
            const matchesSearch = search === '' || t.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === null || t.category.id === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    };

    const filteredOnce = filterTasks(groupedTasks.once);
    const filteredDaily = filterTasks(groupedTasks.daily);
    const filteredWeekly = filterTasks(groupedTasks.weekly);

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
                            <input type="text" placeholder="Buscar misiones..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <select value={categoryFilter ?? ''} onChange={(e) => setCategoryFilter(e.target.value ? Number(e.target.value) : null)}>
                                <option value="">Todas las categorías</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <FormNewTask
                                categories={categories}
                                editTask={editingTask}
                                open={isTaskFormOpen}
                                setOpen={setIsTaskFormOpen}
                                clearEditTask={() => setEditingTask(null)}
                            />
                        </div>
                    </header>

                    <section className="quest-section">
                        <h3>
                            <i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} />
                            Misiones Principales
                        </h3>
                        {filteredOnce.map((task) => (
                            <Tarea
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                frequency={task.frequency}
                                isCompleted={task.is_completed}
                                category={task.category}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsTaskFormOpen(true);
                                }}
                            />
                        ))}
                        {filteredOnce.length === 0 && (
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
                        {filteredDaily.map((task) => (
                            <Tarea
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                frequency={task.frequency}
                                isCompleted={task.is_completed}
                                category={task.category}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsTaskFormOpen(true);
                                }}
                            />
                        ))}
                        {filteredDaily.length === 0 && (
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
                        {filteredWeekly.map((task) => (
                            <Tarea
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                frequency={task.frequency}
                                isCompleted={task.is_completed}
                                category={task.category}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsTaskFormOpen(true);
                                }}
                            />
                        ))}
                        {filteredWeekly.length === 0 && (
                            <p className="text-gray-500 text-center py-8">
                                No tienes misiones semanales activas.
                            </p>
                        )}
                    </section>
                </main>
            </div>
        </AppLayout>
    );
}
