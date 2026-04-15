/**
 * Archivo: resources/js/pages/misiones.tsx
 * Propósito: Interfaz administrativa de tareas con búsqueda, filtrado y gestión de CRUD.
 */

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { FormNewTask } from '@/components/form-new-task'; // Formulario modal para crear/editar
import { misiones } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Tarea } from '@/components/ui/tarea';

// --- DEFINICIÓN DE TIPOS ---
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

// Configuración de navegación
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Misiones',
        href: misiones(),
    },
];

export default function Misiones({ tasks, categories }: MisionesProps) {
    // --- ESTADOS LOCALES ---
    const groupedTasks = tasks || {};
    
    // Estado para saber qué tarea estamos editando (si es null, estamos creando una nueva)
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    
    // Control del modal de creación/edición
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    
    // Estados para el motor de búsqueda y filtros
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

    // --- LÓGICA DE FILTRADO ---
    /**
     * Filtra una lista de tareas basada en el texto de búsqueda y la categoría seleccionada.
     */
    const filterTasks = (list?: Task[]) => {
        if (!list) return [];
        return list.filter((t) => {
            const matchesSearch = search === '' || t.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === null || t.category.id === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    };

    // Aplicamos los filtros a cada grupo de frecuencia
    const filteredOnce = filterTasks(groupedTasks.once);
    const filteredDaily = filterTasks(groupedTasks.daily);
    const filteredWeekly = filterTasks(groupedTasks.weekly);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Misiones" />

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    /* Variables de tema y estilos específicos de la barra de búsqueda */
                    :root {
                        --primary: #6366f1;
                        --accent: #f59e0b;
                    }
                    .filter-bar {
                        background: white;
                        padding: 15px 25px;
                        border-radius: 12px;
                        display: flex;
                        justify-content: space-between;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                `}</style>

                <main style={{ padding: '0 30px 30px 30px' }}>
                    
                    {/* BARRA DE FILTROS Y ACCIONES */}
                    <header className="filter-bar">
                        {/* Input de búsqueda por texto */}
                        <div style={{ flex: 1 }}>
                            <i className="fa-solid fa-magnifying-glass" />
                            <input 
                                type="text" 
                                placeholder="Buscar misiones..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </div>

                        {/* Selector de Categoría y Botón de Nueva Tarea */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <select 
                                value={categoryFilter ?? ''} 
                                onChange={(e) => setCategoryFilter(e.target.value ? Number(e.target.value) : null)}
                            >
                                <option value="">Todas las categorías</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Componente que maneja la lógica de creación/edición */}
                            <FormNewTask
                                categories={categories}
                                editTask={editingTask}
                                open={isTaskFormOpen}
                                setOpen={setIsTaskFormOpen}
                                clearEditTask={() => setEditingTask(null)} // Callback para resetear el estado de edición
                            />
                        </div>
                    </header>

                    {/* SECCIONES DE TAREAS FILTRADAS */}
                    
                    {/* Misiones Únicas */}
                    <section className="quest-section">
                        <h3><i className="fa-solid fa-scroll" style={{ color: 'var(--accent)' }} /> Misiones Principales</h3>
                        {filteredOnce.map((task) => (
                            <Tarea
                                isCompleted={false}
                                key={task.id}
                                {...task}
                                onEdit={() => {
                                    setEditingTask(task); // Prepara los datos para el formulario
                                    setIsTaskFormOpen(true); // Abre el modal
                                }}
                            />
                        ))}
                        {filteredOnce.length === 0 && <p className="text-gray-500 text-center">Sin resultados.</p>}
                    </section>

                    {/* Misiones Diarias */}
                    <section className="quest-section">
                        <h3><i className="fa-solid fa-calendar-day" style={{ color: 'var(--primary)' }} /> Misiones Diarias</h3>
                        {filteredDaily.map((task) => (
                            <Tarea
                                isCompleted={false} key={task.id}
                                {...task}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsTaskFormOpen(true);
                                }}
                            />
                        ))}
                    </section>

                    {/* Misiones Semanales */}
                    <section className="quest-section">
                        <h3><i className="fa-solid fa-calendar-week" style={{ color: '#10b981' }} /> Misiones Semanales</h3>
                        {filteredWeekly.map((task) => (
                            <Tarea
                                isCompleted={false} key={task.id}
                                {...task}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsTaskFormOpen(true);
                                } }                            />
                        ))}
                    </section>
                </main>
            </div>
        </AppLayout>
    );
}