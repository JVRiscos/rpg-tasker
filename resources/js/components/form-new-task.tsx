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

/**
 * Interfaces de TypeScript para garantizar el tipado estricto.
 * Esto evita errores en tiempo de desarrollo al manejar objetos de tarea y categoría.
 */
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
    editTask?: TaskEdit | null; // Si existe, el formulario entra en modo "Edición"
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

/**
 * FormNewTask: Componente modal para la creación y edición de misiones.
 * Utiliza un estado local para controlar los campos del formulario antes de enviarlos.
 */
export function FormNewTask({ categories, editTask, open, setOpen, clearEditTask }: FormNewTaskProps) {
    const [formData, setFormData] = useState({ ...emptyForm });

    /**
     * useEffect para el control de estados de edición.
     * Si 'editTask' tiene datos, pre-rellenamos el formulario.
     * Si el modal se cierra, reseteamos los campos.
     */
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

    /**
     * Función para enviar los datos al servidor.
     * Diferencia entre POST (crear) y PUT (actualizar) usando el router de Inertia.
     */
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
            // Modo Edición
            router.put(`/tasks/${editTask.id}`, payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    clearEditTask();
                    window.location.reload(); // Refresco para actualizar estados de gamificación
                },
            });
            return;
        }

        // Modo Creación
        router.post('/tasks', payload, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                window.location.reload();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(value) => {
            if (!value) clearEditTask();
            setOpen(value);
        }}>
            <DialogTrigger asChild>
                <Button type="button" className="bg-[#6366f1] hover:bg-[#a855f7] text-white">
                    + Nueva Misión
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-[#1e1e2e]">Invocar Nueva Misión</DialogTitle>
                    <DialogDescription>
                        Crea una nueva tarea para potenciar tus atributos y ganar experiencia.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Campos del formulario con vinculación bidireccional (Two-way binding) */}
                    <div className="form-group">
                        <Label htmlFor="name">Nombre de la Misión</Label>
                        <Input 
                            id="name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <Label>Atributo a Potenciar</Label>
                            <Select value={formData.category_id} onValueChange={(v) => setFormData({...formData, category_id: v})}>
                                <SelectTrigger className="bg-white text-black">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="form-group">
                            <Label>Frecuencia</Label>
                            <Select value={formData.frequency} onValueChange={(v) => setFormData({...formData, frequency: v})}>
                                <SelectTrigger className="bg-white text-black">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="daily">Diaria</SelectItem>
                                    <SelectItem value="weekly">Semanal</SelectItem>
                                    <SelectItem value="once">Única</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full bg-[#6366f1] hover:bg-[#a855f7] text-white font-bold">
                            {editTask ? 'Actualizar Misión' : 'Invocar Misión'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}