import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Category {
    id: number;
    name: string;
}

interface TaskEdit {
    id: number;
    title: string;
    description: string | null;
    frequency: 'daily' | 'weekly' | 'once';
    is_completed: boolean;
    category: Category;
}

interface FormNewTaskProps {
    categories: Category[];
    editTask?: TaskEdit | null;
    open: boolean;
    setOpen: (open: boolean) => void;
    clearEditTask: () => void;
}

const emptyForm = {
    name: '',
    description: '',
    category_id: '',
    frequency: '',
    attribute: '',
    difficulty: '',
    deadline: '',
};

export function FormNewTask({ categories, editTask, open, setOpen, clearEditTask }: FormNewTaskProps) {
    const [formData, setFormData] = useState({ ...emptyForm });

    useEffect(() => {
        if (editTask) {
            setFormData({
                name: editTask.title,
                description: editTask.description ?? '',
                category_id: editTask.category.id.toString(),
                frequency: editTask.frequency,
                attribute: '',
                difficulty: '',
                deadline: '',
            });
            setOpen(true);
            return;
        }

        if (!open) {
            setFormData({ ...emptyForm });
        }
    }, [editTask, open, setOpen]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const resetForm = () => {
        setFormData({ ...emptyForm });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: formData.name,
            description: formData.description,
            category_id: parseInt(formData.category_id, 10) || null,
            frequency: formData.frequency,
            is_completed: editTask ? editTask.is_completed : false,
        };

        if (editTask) {
            router.put(`/tasks/${editTask.id}`, payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    clearEditTask();
                    resetForm();
                    window.location.reload();
                },
            });
            return;
        }

        router.post('/tasks', payload, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                resetForm();
                window.location.reload();
            },
        });
    };

    const handleOpenNew = () => {
        clearEditTask();
        resetForm();
        setOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={(value) => {
            if (!value) {
                clearEditTask();
            }
            setOpen(value);
        }}>
            <DialogTrigger asChild>
                <Button type="button" onClick={handleOpenNew} className="bg-[#6366f1] hover:bg-[#a855f7] text-white">
                    + Nueva Misión
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <style>{`
                    :root {
                        --primary: #6366f1;
                        --secondary: #a855f7;
                        --dark: #1e1e2e;
                        --light: #f8fafc;
                        --danger: #ef4444;
                        --success: #22c55e;
                    }

                    .form-group {
                        margin-bottom: 15px;
                    }

                    .form-group label {
                        display: block;
                        margin-bottom: 5px;
                        font-weight: 500;
                        color: #334155;
                    }

                    .form-group input,
                    .form-group textarea {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        box-sizing: border-box;
                        font-size: 0.875rem;
                        background: white;
                        color: #0f172a;
                    }

                    .form-group textarea {
                        resize: vertical;
                        min-height: 80px;
                    }

                    [data-slot="select-trigger"] {
                        background: white;
                        color: #0f172a;
                        border-color: #cbd5e1;
                    }

                    [data-slot="select-content"] {
                        background: white;
                        color: #0f172a;
                        border-color: #e2e8f0;
                    }

                    [data-slot="select-item"] {
                        background: white;
                        color: #0f172a;
                    }

                    [data-slot="select-item"][data-highlighted] {
                        background: #000;
                        color: white;
                    }

                    .btn-submit {
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background 0.3s;
                    }

                    .btn-submit:hover {
                        background: var(--secondary);
                    }
                `}</style>
                <DialogHeader>
                    <DialogTitle className="text-[#1e1e2e]">Invocar Nueva Misión</DialogTitle>
                    <DialogDescription>
                        Crea una nueva tarea para potenciar tus atributos y ganar experiencia.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="form-group">
                            <Label htmlFor="name">Nombre de la Misión</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Ej: Estudiar React Hooks"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe la misión en detalle..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <Label htmlFor="category">Atributo a Potenciar</Label>
                                <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                                    <SelectTrigger className="bg-white text-black border border-slate-200">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-slate-200">
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="frequency">Frecuencia</Label>
                                <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
                                    <SelectTrigger className="bg-white text-black border border-slate-200">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-slate-200">
                                        <SelectItem value="daily">Diaria</SelectItem>
                                        <SelectItem value="weekly">Semanal</SelectItem>
                                        <SelectItem value="once">Única</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">


                            <div className="form-group">
                                <Label htmlFor="deadline" >Fecha Límite (Opcional)</Label>
                                <Input style={{ color: 'black' }}
                                    id="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="btn-submit">
                            Invocar Misión
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

