import { router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    base_xp: number;
    linked_stat: string;
}

interface TareaProps {
    id: number;
    title: string;
    description: string | null;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    isCompleted: boolean;
    category: Category;
    onEdit?: () => void;
    onComplete?: () => void;
    showOnlyComplete?: boolean;
}

export function Tarea({ id, title, description, frequency, isCompleted, category, onEdit, onComplete, showOnlyComplete }: TareaProps) {
    const color =
        frequency === 'once' ? 'var(--accent)' :
        frequency === 'daily' ? 'var(--primary)' :
        frequency === 'weekly' ? '#10b981' :
        frequency === 'monthly' ? '#228B22' :
        'var(--muted)';

    const frequencyText = {
        once: 'Única',
        daily: 'Diaria',
        weekly: 'Semanal',
        monthly: 'Mensual'
    };

    const statText = {
        str: 'FUE',
        int: 'INT',
        sta: 'VIT',
        def: 'DEF'
    };

    const handleToggleComplete = () => {
        if (onComplete) {
            onComplete();
            return;
        }
        router.patch(`/tasks/${id}`, {
            is_completed: !isCompleted
        }, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            }
        });
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit();
            return;
        }

        router.visit(`/tasks/${id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            router.delete(`/tasks/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                }
            });
        }
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
            <style>{`

                    .quest-card {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        transition: transform 0.2s;
                        border-left: 5px solid #cbd5e1;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        opacity: ${isCompleted ? '0.6' : '1'};
                    }

                    .quest-card.complete-only {
                        padding: 25px;
                        justify-content: space-between;
                    }

                    .quest-card:hover {
                        transform: translateX(5px);
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
                        text-decoration: ${isCompleted ? 'line-through' : 'none'};
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
                        transition: all 0.2s;
                    }

                    .btn-icon:hover {
                        background: #e2e8f0;
                        color: var(--danger);
                    }

                    .btn-complete {
                        background: ${isCompleted ? '#10b981' : '#f1f5f9'};
                        color: ${isCompleted ? 'white' : '#64748b'};
                    }

                    .btn-complete:hover {
                        background: ${isCompleted ? '#059669' : '#e2e8f0'};
                        color: ${isCompleted ? 'white' : 'var(--primary)'};
                    }

                    .btn-complete-large {
                        background: #22c55e;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 1rem;
                        transition: all 0.2s;
                    }

                    .btn-complete-large:hover {
                        background: #16a34a;
                        transform: scale(1.05);
                    }

                    .reward-xp {
                        color: var(--primary);
                        font-weight: bold;
                        display: block;
                    }

                    .category-badge {
                        display: inline-block;
                        background: #f1f5f9;
                        color: #64748b;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 0.75rem;
                        margin-top: 5px;
                    }
            `}</style>
            <div className={`quest-card ${showOnlyComplete ? 'complete-only' : ''}`} style={{ borderLeftColor: color }}>
                <div className="quest-icon">
                    <i className={`fa-solid ${
                        frequency === 'once' ? 'fa-scroll' :
                        frequency === 'daily' ? 'fa-calendar-day' :
                        frequency === 'weekly' ? 'fa-calendar-week' :
                        'fa-calendar-alt'
                    }`} style={{ color }} />
                </div>
                <div className="quest-content">
                    <h4>{title}</h4>
                    <p>{description || 'Sin descripción'}</p>
                    <span className="category-badge">
                        {category.name} • +{category.base_xp} {statText[category.linked_stat as keyof typeof statText] || category.linked_stat.toUpperCase()} XP
                    </span>
                </div>
                {showOnlyComplete ? (
                    <button
                        className="btn-complete-large"
                        type="button"
                        onClick={handleToggleComplete}
                    >
                        Completar
                    </button>
                ) : (
                    <>
                        <div className="quest-reward">
                            <span className="reward-xp">+{category.base_xp} XP</span>
                            <small>Frecuencia: {frequencyText[frequency]}</small>
                        </div>
                        <div className="btn-actions">
                            <button
                                className="btn-icon btn-complete"
                                type="button"
                                title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                                onClick={handleToggleComplete}
                            >
                                <i className={`fa-solid ${isCompleted ? 'fa-check-circle' : 'fa-circle'}`} />
                            </button>
                            <button
                                className="btn-icon"
                                type="button"
                                title="Editar"
                                onClick={handleEdit}
                            >
                                <i className="fa-solid fa-pen-to-square" />
                            </button>
                            <button
                                className="btn-icon"
                                type="button"
                                title="Eliminar"
                                onClick={handleDelete}
                            >
                                <i className="fa-solid fa-trash" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}