import { useState } from 'react';
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

export function FormNewTask() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        attribute: '',
        difficulty: '',
        deadline: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar la tarea al backend
        console.log('Nueva tarea:', formData);
        setOpen(false);
        // Reset form
        setFormData({
            name: '',
            description: '',
            category: '',
            attribute: '',
            difficulty: '',
            deadline: '',
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#6366f1] hover:bg-[#a855f7] text-white">
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
                                <Label htmlFor="category">Categoría</Label>
                                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                    <SelectTrigger className="bg-white text-black border border-slate-200">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-slate-200">
                                        <SelectItem value="trabajo">Trabajo</SelectItem>
                                        <SelectItem value="salud">Salud</SelectItem>
                                        <SelectItem value="estudios">Estudios</SelectItem>
                                        <SelectItem value="personal">Personal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="form-group">
                                <Label htmlFor="attribute">Atributo a Potenciar</Label>
                                <Select value={formData.attribute} onValueChange={(value) => handleInputChange('attribute', value)}>
                                    <SelectTrigger className="bg-white text-black border border-slate-200">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-slate-200">
                                        <SelectItem value="STR">Fuerza (STR)</SelectItem>
                                        <SelectItem value="INT">Inteligencia (INT)</SelectItem>
                                        <SelectItem value="VIT">Vitalidad (VIT)</SelectItem>
                                        <SelectItem value="LCK">Suerte (LCK)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <Label htmlFor="difficulty">Dificultad</Label>
                                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                                    <SelectTrigger className="bg-white text-black border border-slate-200">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-slate-200">
                                        <SelectItem value="facil">Fácil (10 XP)</SelectItem>
                                        <SelectItem value="media">Media (50 XP)</SelectItem>
                                        <SelectItem value="epica">Épica (200 XP)</SelectItem>
                                        <SelectItem value="legendaria">Legendaria (500 XP)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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

    